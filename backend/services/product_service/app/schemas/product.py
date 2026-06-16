from pydantic import BaseModel, EmailStr
from uuid import UUID

class ProductItem(BaseModel):
    name: str 
    quantity: int 
    price: int 
    product_img: bytes | None

class ProductCreate(BaseModel):
    name: str
    description: str | None
    quantity: int
    price: int
    product_img: bytes | None = None

class ProductUpdate(BaseModel):
    id: int
    name: str | None = None
    description: str | None = None
    quantity: int | None = None
    price: int | None = None
    product_img: bytes | None = None
