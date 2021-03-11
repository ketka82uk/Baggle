from app import app, db
# from data.person_data import list_persons, person_parents, person_children
# from data.comment_data import list_comments
from data.user_data import list_users
import json

def login(client):
    # ! Login
    login_data = {"password": "james", "email": "james@james.com"}
    login_response = client.post(
        "/api/login", data=json.dumps(login_data), content_type="application/json"
    )
    assert len(login_response.json["token"]) != 0
    return login_response.json["token"]

def setup_db():
    with app.app_context():
        try:
            db.drop_all()
            db.create_all()

            db.session.add_all(list_users)
            db.session.commit()

            print('Everything seeded')

        except Exception as e:
            print('There was an error with seeding')
            print(e)