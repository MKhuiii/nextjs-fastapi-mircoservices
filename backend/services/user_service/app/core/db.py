from sqlalchemy import create_engine
from app.core.config import settings
from sqlmodel import SQLModel

engine = create_engine(settings.USERS_DB_URL)

def init_db() -> None:
    import app.models.user
    SQLModel.metadata.create_all(engine)

