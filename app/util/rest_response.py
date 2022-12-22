from fastapi.responses import JSONResponse
from fastapi.logger import logger


def success_response(data, message, http_status=200):
    respose_dict = {
        "data": data,
        "message": message,
    }
    return JSONResponse(status_code=http_status, content=respose_dict)


def error_response(message, http_status=500):
    respose_dict = {"message": message}
    return JSONResponse(status_code=http_status, content=respose_dict)


def response_handler(success, message, statuscode, data=dict()):
    if success:
        return success_response(data, message, statuscode)
    logger.info(message)
    return error_response(message, statuscode)
