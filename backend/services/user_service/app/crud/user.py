from sqlmodel import Session, select
from app.crud.base import CRUDBase
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate

class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    def get_by_email(self, db: Session, email: str) -> User | None:
        statement = select(self.model).where(self.model.email == email)
        return db.exec(statement).first()
    def get_by_username(self, db: Session, username: str) -> User | None:
        statement = select(self.model).where(self.model.username == username)
        return db.exec(statement).first()
crud_user = CRUDUser(User)