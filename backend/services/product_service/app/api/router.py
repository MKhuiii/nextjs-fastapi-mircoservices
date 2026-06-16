from fastapi import APIRouter
from app.api.routers import product

router = APIRouter()
router.include_router(product.router)