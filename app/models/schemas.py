from pydantic import BaseModel

class UserLogin(BaseModel):
    mobile: int
