from flask import request
from pprint import pprint
from functools import wraps
import time

def time_taken(func):

    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        func_result = func(*args, **kwargs)
        end = time.time()
        print(f'⏰ Time taken: {end - start}')
        return func_result

    return wrapper

