import json
from ..util.rest_response import response_handler
from fastapi.logger import logger
import traceback


async def get_service_permissions(file_path="app/permission.json"):

    try:
        permissions_file = open(file_path, "r")
        permissions_file = json.load(permissions_file)
        return response_handler(
            True, "Permissions successfully retrieved.", 200, permissions_file
        )
    except FileNotFoundError:
        logger.error("permission not found")
        return response_handler(False, "Permissions resource not found.", 404, {})
    except Exception as err:
        logger.error(err, "".join(traceback.format_tb(err.__traceback__)))
        return response_handler(False, "Something went wrong!", 500, {})
