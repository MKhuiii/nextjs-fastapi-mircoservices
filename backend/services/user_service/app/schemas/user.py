from pydantic import BaseModel, EmailStr
from uuid import UUID
from pydantic import EmailStr

class UserCreate(BaseModel):
    username: str 
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    username: str | None = None
    email: EmailStr | None = None
    password: str | None = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserInfo(BaseModel):
    user_id: UUID
    username: str
    email: EmailStr