from app import app, db
import json
from tests.lib import login

# def test_get_users():
#     client = app.test_client()
#     response = client.get("/api/users")
#     assert len(response.json) > 0
#     assert response.status_code == 200

# def test_get_single_user1():
#     client = app.test_client()
#     response = client.get("/api/users/1")
#     assert response.json['name'] == 'Cathy'
#     assert response.status_code == 200

# def test_get_single_user2():
#     client = app.test_client()
#     response = client.get("/api/users/2")
#     assert response.json['name'] == 'Abdi'
#     assert response.status_code == 200

# def test_register():
#     client = app.test_client()
#     signup_data = { "username": "simon", "email": "simon@simon.com", "name": "simon", "password": "simon"}
#     signup_response = client.post(
#         "/api/signup",
#         data=json.dumps(signup_data), content_type="application/json"
#     )
#     assert signup_response.json['name'] == 'simon'
#     assert signup_response.json['username'] == 'simon'
#     assert not 'email' in signup_response.json
#     assert not 'password' in signup_response.json

#     def login(client):
#         # ! Login
#         login_data = {"password": "simon", "email": "simon@simon.com"}
#         login_response = client.post(
#             "/api/login", data=json.dumps(login_data), content_type="application/json"
#         )
#         assert len(login_response.json["token"]) != 0
#         return login_response.json["token"]


# def login(client):
#     # ! Login
#     login_data = {"password": "james", "email": "james@james.com"}
#     login_response = client.post(
#         "/api/login", data=json.dumps(login_data), content_type="application/json"
#     )
#     assert len(login_response.json["token"]) != 0
#     return login_response.json["token"]



