from fastapi import APIRouter

from app.api.routers import login

router = APIRouter()
router.include_router(login.router)