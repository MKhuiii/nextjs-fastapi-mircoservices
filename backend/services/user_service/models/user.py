from sqlmodel import Field, SQLModel
from pydantic import EmailStr
import uuid
class User(SQLModel, table=True):
    user_id: uuid = Field(default=None, index=True, primary_key=True),
    username: str = Field(default = None, nullable=False, index=True),
    email: EmailStr = Field(default=None, nullable=False, unique=True),
    password: str = Field(default=None, nullable=False)