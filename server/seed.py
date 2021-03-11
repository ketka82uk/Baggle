from app import app, db
from data.user_data import list_users
from data.item_data import list_items
from data.image_data import list_images

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
        print("😵 Uh-oh.... Something went wrong!")
        print(e)
