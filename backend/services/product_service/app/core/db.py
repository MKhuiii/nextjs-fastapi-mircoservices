from sqlalchemy import create_engine
from app.core.config import settings
from sqlmodel import SQLModel

engine = create_engine(settings.PRODUCTS_DB_URL)

def init_db() -> None:
    import app.models.product
    SQLModel.metadata.create_all(engine)

