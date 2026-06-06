from sqlmodel import Field, SQLModel

class Product(SQLModel, table=True):
    id: int = Field(primary_key=True, index=True),
    name: str = Field(unique=True, index=True, nullable=False)
    description: str = Field(nullable=False)
    