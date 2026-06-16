from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent.parent
ENV_FILE_PATH = ROOT_DIR / ".env"
class Settings(BaseSettings):
    FRONTEND_HOST: str
    BACKEND_PRODUCT_URL: str
    PRODUCTS_DB_URL: str

    model_config = SettingsConfigDict(
        env_file=str(ENV_FILE_PATH), 
        env_file_encoding="utf-8"
    )
settings = Settings()