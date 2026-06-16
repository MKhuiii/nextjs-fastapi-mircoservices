from fastapi import APIRouter, HTTPException, status, Query, Depends
from sqlmodel import select, col
from typing import List
from app.api.deps import SessionDep, get_current_user_id
from app.crud.product import crud_product
from app.core.config import settings
from app.schemas.product import ProductCreate, ProductUpdate, ProductItem
from app.models.product import Product

router = APIRouter()

@router.post("/add_product")
def add_product(
    session: SessionDep,
    new_product: ProductCreate
):
    existing_product_name = crud_product.get_by_name(session, new_product.name)
    if existing_product_name:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product existed"
        )
    db_product = crud_product.create(session, new_product)

    return {
        "product_name": new_product.name,
        "message": "Adding product successfull!"
    }
@router.get("/search_product", response_model=List[ProductItem])
def search_product(
    session: SessionDep,
    q: str = Query(default="", description="Searching for product") 
):
    search_query = q.strip()
    if not search_query:
        statement = select(Product)
        result = session.exec(statement).all()
        return result
    
    statement = select(Product).where(col(Product.name).contains(search_query))
    result = session.exec(statement).all()
    return result

@router.delete("/delete_product")
def delete_product(
    session: SessionDep,
    product_id: int
):
    existing_product_id = crud_product.get_by_id(session, id=product_id)
    if not existing_product_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product is not exist"
        )
    crud_product.delete(session, product_id)
    return{
        "message": "Deleted product has id: " + str(product_id)
    }

@router.post("/product_list", response_model=List[ProductItem])
def get_product_list(
    session: SessionDep,
    current_user_id: str = Depends(get_current_user_id) 
):
    
    result = crud_product.get_multi(session, skip=0, limit=20)
    return result

@router.patch("/update_product")
def update_product(
    session: SessionDep,
    updated: ProductUpdate
):
    db_product = crud_product.get(session, id=updated.id)
    
    if not db_product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with ID {updated.product_id} does not exist"
        )

    crud_product.update(session, db_obj=db_product, obj_in=updated)
    
    return {
        "message": f"Product '{db_product.name}' has been updated successfully",
        "id": db_product.id
    }