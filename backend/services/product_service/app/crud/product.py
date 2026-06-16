from sqlmodel import Session, select
from app.crud.base import CRUDBase
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate

class CRUDProduct(CRUDBase[Product, ProductCreate, ProductUpdate]):
    def get_by_name(self, db: Session, name: str) -> Product | None:
        statement = select(self.model).where(self.model.name == name)
        return db.exec(statement).first()
crud_product = CRUDProduct(Product)