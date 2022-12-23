import uuid


def is_valid_uuid(uuid_string):
    """
    Check if uuid is valid
    """
    try:
        uuid.UUID(uuid_string)
    except ValueError:
        return False
    return True


def clean_nones(value):
    if isinstance(value, list):
        return [clean_nones(x) for x in value if x is not None]
    elif isinstance(value, dict):
        return {key: clean_nones(val) for key, val in value.items() if val is not None}
    else:
        return value
