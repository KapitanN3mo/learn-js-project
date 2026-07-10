from sqlalchemy.orm import Session
from . import models, schemas
from passlib.context import CryptContext
from typing import Optional, List

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_user_by_username(db: Session, username: str) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.username == username).first()


def get_user_by_email(db: Session, email: str) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.email == email).first()


def create_user(db: Session, user: schemas.UserCreate) -> models.User:
    hashed = get_password_hash(user.password)
    db_user = models.User(username=user.username, email=user.email, hashed_password=hashed)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def authenticate_user(db: Session, username: str, password: str) -> Optional[models.User]:
    user = get_user_by_username(db, username)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


def create_post(db: Session, owner_id: int, post: schemas.PostCreate, image_path: Optional[str] = None) -> models.Post:
    db_post = models.Post(title=post.title, content=post.content, owner_id=owner_id, image_path=image_path)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post


def get_posts(db: Session) -> List[models.Post]:
    return db.query(models.Post).order_by(models.Post.created_at.desc()).all()


def get_post(db: Session, post_id: int) -> Optional[models.Post]:
    return db.query(models.Post).filter(models.Post.id == post_id).first()


def create_comment(db: Session, author_id: int, post_id: int, content: str) -> models.Comment:
    db_comment = models.Comment(content=content, post_id=post_id, author_id=author_id)
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment
