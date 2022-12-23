from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from app.models import schemas
from app.database import get_db
from app.services.service import fetch_account_details

router = APIRouter()

@router.post("/accounts/details")
async def get_accounts_details(user: schemas.AccountDetails, db: Session = Depends(get_db)):
    success, message, status_code, data = await fetch_account_details(user.mobile, db)
    return {
        "success": success,
        "message": message,
        "status_code": status_code,
        "data": data
    }