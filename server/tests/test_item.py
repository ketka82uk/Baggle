from app import app, db
import json
from tests.lib import login


def test_get_items():

   
    client = app.test_client()
   
    response = client.get("/api/items")

    
    assert len(response.json) == 6
    
    assert response.status_code == 200