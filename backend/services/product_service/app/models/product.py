from sqlmodel import Field, SQLModel
from typing import Optional

class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True, index=True)
    name: str = Field(unique=True, index=True, nullable=False)
    description: Optional[str] = Field(default=None, nullable=True)
    quantity: int = Field(default=0, nullable=False)
    price: int = Field(default=0, nullable=False)
    product_img: bytes | None = Field(default=None, nullable=True)
