from app import app, db
from data.item_data import list_items
from data.image_data import list_images
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
            print(f'🙋‍♀️ {len(list_users)} users created')

            db.session.add_all(list_items)
            print(f'🦖 {len(list_items)} items created')

            db.session.add_all(list_images)
            print(f'🖼 {len(list_images)} images created')

            db.session.commit()

            print("👍 All seeded successfully")

        except Exception as e:
            print('There was an error with seeding')
            print(e)