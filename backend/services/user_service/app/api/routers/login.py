from fastapi import APIRouter, Depends, HTTPException, status
from app.api.deps import SessionDep
from app.crud.user import crud_user
from app.schemas.user import UserCreate

router = APIRouter()

@router.post("/register")
def create_user(
        session: SessionDep,
        new_user: UserCreate
):
    existing_user = crud_user.get_by_email(session, email=new_user.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email existed"
        )
    db_user = crud_user.create(session, new_user)

    return db_user