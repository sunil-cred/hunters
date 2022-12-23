from fastapi.responses import JSONResponse


def response_handler(success, message, statuscode, data=dict(),errors=None):
    respose_dict = {
        "success": success,
        "data": data,
        "message": message,
        "errors": errors
    }
    return JSONResponse(status_code=statuscode, content=respose_dict)
