from sqlmodel import Field, SQLModel

class Product(SQLModel, table=True):
    id: int = Field(primary_key=True, index=True),
    name: str = Field(unique=True, index=True, nullable=False)
    description: str = Field(nullable=False)
    quantity: int = Field(default=0, nullable=False)
    price: int = Field(default=0, nullable=False)
    product_img: bytes
