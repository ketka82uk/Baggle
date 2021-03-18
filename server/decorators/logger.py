from flask import request
from functools import wraps
from pprint import pprint

def logger(route_func):

    @wraps(route_func)
    def wrapper(*args, **kwargs):
        print('logging')
        print (f'JSON body: {request.json}')
        print(f'Headers:')
        pprint(dict(request.headers))
        print('Thanks!')
        return route_func(*args, **kwargs)

    return wrapper