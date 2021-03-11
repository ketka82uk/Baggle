from app import app, db
import json
from tests.lib import login

def test_get_persons():

    client = app.test_client()
    response = client.get("/api/users")

    assert len(response.json) == 10

    assert response.status_code == 200



