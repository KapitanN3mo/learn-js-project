from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    created_at: datetime

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class PostCreate(BaseModel):
    title: str
    content: Optional[str] = None


class PostOut(BaseModel):
    id: int
    title: str
    content: Optional[str]
    image_path: Optional[str]
    owner_id: int
    created_at: datetime

    class Config:
        orm_mode = True


class CommentCreate(BaseModel):
    content: str


class CommentOut(BaseModel):
    id: int
    content: str
    post_id: int
    author_id: int
    created_at: datetime

    class Config:
        orm_mode = True
