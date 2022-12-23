from fastapi import Depends, APIRouter, File,UploadFile,Form
from app.util.rest_response import response_handler
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import DocumentDetails
import os


router = APIRouter()

@router.post("/documents/upload")
def upload(file: UploadFile = File(...), document_type:str = Form(...),user_id:str = Form(...), db: Session = Depends(get_db)):
    try:
        contents = file.file.read()
        directory = f"downloads/{document_type}/{user_id}"
        if not os.path.exists(directory):
            os.makedirs(directory)
        doc_link = f"{directory}/{file.filename}"
        with open(doc_link, 'wb') as f:
            f.write(contents)
        db.add(DocumentDetails(user_id=user_id,document_type=document_type,document_link=doc_link,
                              verification_status=False ))
        db.commit()
    except Exception as e:
        print(e)
        return response_handler(False,"There was an error uploading the file",500,None)
    finally:
        file.file.close()
    return response_handler(False,f"Successfully uploaded {file.filename}",201,None)