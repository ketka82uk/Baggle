from app import app
from flask import Flask, jsonify
from marshmallow.exceptions import ValidationError

@app.errorhandler(ValidationError)
def validation_error(e):
    return { "errors": e.messages, "messages": "something went wrong" }, 401

@app.errorhandler(Exception)
def general_error(e):
    return { "errors": str(e), "messages": "something went wrong error handler line 11" }, 401