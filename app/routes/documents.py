from fastapi import Depends, APIRouter, File,UploadFile,Form
from app.util.rest_response import response_handler
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import DocumentDetails
import os


router = APIRouter()

@router.post("/documents/upload")
def upload(pan: UploadFile = File(...),
           aadhaar: UploadFile = File(...),
           salary: UploadFile = File(...),
           cheque: UploadFile = File(...),
           user_id:str = Form(...), db: Session = Depends(get_db)):
    docs = {"pancard":pan,"aadhaar":aadhaar,"salary":salary,"cheque":cheque}
    try:
        for doc in docs.keys():
            directory = f"downloads/{doc}/{user_id}"
            if not os.path.exists(directory):
                os.makedirs(directory)
            doc_link = f"""{directory}/{docs[doc].filename.replace(" ","_")}"""
            with open(doc_link, 'wb') as f:
                f.write(docs[doc].file.read())
            db.add(DocumentDetails(user_id=user_id,document_type=doc,document_link=doc_link,
                              verification_status=False ))
        db.commit()
    except Exception as e:
        print(e)
        return response_handler(False,"There was an error uploading the file",500,None)
    finally:
        for doc in docs.values():
            doc.file.close()
    return response_handler(True,f"Successfully uploaded documents",201,None)