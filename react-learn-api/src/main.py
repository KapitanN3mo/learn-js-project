from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File, Form
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
import shutil
import os
from uuid import uuid4
from datetime import timedelta

from app import models, schemas, crud, auth, database, config

app = FastAPI(title="Simple Social API")

app.mount("/uploads", StaticFiles(directory=config.UPLOAD_DIR), name="uploads")


@app.on_event("startup")
def on_startup():
    os.makedirs(config.UPLOAD_DIR, exist_ok=True)
    models.Base.metadata.create_all(bind=database.engine)


@app.post("/users/", response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    if crud.get_user_by_username(db, user.username):
        raise HTTPException(status_code=400, detail="Username already registered")
    if crud.get_user_by_email(db, user.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    db_user = crud.create_user(db, user)
    return db_user


@app.post("/token", response_model=schemas.Token)
def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(database.get_db),
):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token_expires = timedelta(minutes=config.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/users/me", response_model=schemas.UserOut)
def read_users_me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user


@app.get("/posts", response_model=list[schemas.PostOut])
def list_posts(db: Session = Depends(database.get_db)):
    return crud.get_posts(db)


@app.post("/posts", response_model=schemas.PostOut)
def create_post(
    title: str = Form(...),
    content: str = Form(None),
    file: UploadFile | None = File(None),
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(database.get_db),
):
    image_path = None
    if file:
        ext = os.path.splitext(file.filename)[1]
        filename = f"{uuid4().hex}{ext}"
        dest = os.path.join(config.UPLOAD_DIR, filename)
        with open(dest, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        image_path = f"/uploads/{filename}"
    post_in = schemas.PostCreate(title=title, content=content)
    post = crud.create_post(
        db, owner_id=current_user.id, post=post_in, image_path=image_path
    )
    return post


@app.get("/posts/{post_id}", response_model=schemas.PostOut)
def get_post(post_id: int, db: Session = Depends(database.get_db)):
    post = crud.get_post(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


@app.post("/posts/{post_id}/comments", response_model=schemas.CommentOut)
def add_comment(
    post_id: int,
    comment_in: schemas.CommentCreate,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(database.get_db),
):
    post = crud.get_post(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    comment = crud.create_comment(
        db, author_id=current_user.id, post_id=post_id, content=comment_in.content
    )
    return comment
