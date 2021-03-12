from app import app, db
import json
from tests.lib import login

def test_get_items():
    client = app.test_client()
    response = client.get("/api/items")
    assert len(response.json) == 6
    assert response.status_code == 200

def test_get_single_item():
    client = app.test_client()
    response = client.get("/api/items/1")
    assert response.status_code == 200
    assert response.json['id'] == 1
    assert response.json['name'] == 'Toy Dinosaur'
    assert response.json['category'] == 'children'

def test_post_item():
    client = app.test_client()
    token = login(client)
    header = { 'Authorization': f'Bearer {token}'}
    item_data = { "name": "Tissue", "typeof": "goods", "category": "misc", "private": True, "available": True }
    response = client.post(
        "/api/items", data=json.dumps(item_data), content_type="application/json", headers=header
    )
    assert response.status_code == 200
    assert response.json['name'] == 'Tissue'
    assert response.json['category'] == 'misc'
    item_id = response.json['id']

    def test_get_items_middle():
        client = app.test_client()
        response = client.get("/api/items")
        assert len(response.json) == 5
        assert response.status_code == 200

    def test_delete_item(item_id, header):
        client = app.test_client()
        header = { 'Authorization': f'Bearer {token}'}
        response = client.delete(
            f"/api/items/{item_id}", headers=header
        )
        assert response.status_code == 200
    
    def test_get_items_after():
        client = app.test_client()
        response = client.get("/api/items")
        assert len(response.json) == 6
        assert response.status_code == 200

    


