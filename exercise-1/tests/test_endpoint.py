from src.app import app

def test_index_route():
    client = app.test_client()
    response = client.get("/")
    assert response.status_code == 200

def test_api_table_json():
    client = app.test_client()
    response = client.get("/api/table")
    assert response.status_code == 200
    assert response.is_json

def test_api_report_json():
    client = app.test_client()
    response = client.get("/api/report")
    assert response.status_code == 200
    assert response.is_json

def test_api_csv_report():
    client = app.test_client()
    response = client.get("/api/csv_report")
    assert response.status_code == 200
    assert response.is_streamed

def test_api_json_report():
    client = app.test_client()
    response = client.get("/api/json_report")
    assert response.status_code == 200
    assert response.is_json
