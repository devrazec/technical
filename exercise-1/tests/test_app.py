import csv
from unittest.mock import patch
import pytest
from src.app import app, table_log, report_log

@pytest.fixture
def client():
    app.config["TESTING"] = True
    return app.test_client()

# Test table_log() with a fake log file
def test_table_log_parses_data_correctly(tmp_path):
    mock_log = """TIMESTAMP;BYTES;STATUS;REMOTE_ADDR
2024-01-01T12:00:00Z;1000;200;192.168.1.1
2024-01-02T13:00:00Z;2000;404;192.168.1.2
"""
    log_dir = tmp_path / "logfiles"
    log_dir.mkdir()
    log_file = log_dir / "requests.log"
    log_file.write_text(mock_log)

    with patch("src.app.os.path.dirname", return_value=str(tmp_path)):
        data = table_log()

    assert len(data) == 2
    assert data[0]["REMOTE_ADDR"] == "192.168.1.1"
    assert data[0]["BYTES"] == 1000
    assert data[0]["STATUS"] == "OK"
    assert data[0]["TIMESTAMP"] == "01/01/2024"

# Test report_log() aggregation
def test_report_log_counts_ok_requests(tmp_path):
    mock_log = """TIMESTAMP;BYTES;STATUS;REMOTE_ADDR
2024-01-01T12:00:00Z;1500;200;10.0.0.1
2024-01-01T12:05:00Z;500;200;10.0.0.1
2024-01-01T12:10:00Z;999;404;10.0.0.2
"""
    log_dir = tmp_path / "logfiles"
    log_dir.mkdir()
    (log_dir / "requests.log").write_text(mock_log)

    with patch("src.app.os.path.dirname", return_value=str(tmp_path)):
        result = report_log()

    assert len(result) == 1  # only OK entries counted
    assert result[0]["ip"] == "10.0.0.1"
    assert result[0]["requests"] == 2
    assert result[0]["bytes"] == 2000

# Test API endpoint /api/table
def test_api_table_returns_json(client, tmp_path):
    mock_log = """TIMESTAMP;BYTES;STATUS;REMOTE_ADDR
2024-01-01T10:00:00Z;1000;200;1.1.1.1
"""
    log_dir = tmp_path / "logfiles"
    log_dir.mkdir()
    (log_dir / "requests.log").write_text(mock_log)

    with patch("src.app.os.path.dirname", return_value=str(tmp_path)):
        response = client.get("/api/table")

    assert response.status_code == 200
    data = response.get_json()
    assert len(data) == 1
    assert data[0]["REMOTE_ADDR"] == "1.1.1.1"

# Test API endpoint /api/report
def test_api_report(client, tmp_path):
    mock_log = """TIMESTAMP;BYTES;STATUS;REMOTE_ADDR
2024-01-01T12:00:00Z;1000;200;9.9.9.9
"""
    log_dir = tmp_path / "logfiles"
    log_dir.mkdir()
    (log_dir / "requests.log").write_text(mock_log)

    with patch("src.app.os.path.dirname", return_value=str(tmp_path)):
        response = client.get("/api/report")

    assert response.status_code == 200
    data = response.get_json()
    assert len(data) == 1
    assert data[0]["ip"] == "9.9.9.9"

# Test CSV download endpoint
def test_csv_report_download(client, tmp_path):
    mock_log = """TIMESTAMP;BYTES;STATUS;REMOTE_ADDR
2024-01-01T12:00:00Z;2048;200;8.8.8.8
"""
    log_dir = tmp_path / "logfiles"
    log_dir.mkdir()
    (log_dir / "requests.log").write_text(mock_log)

    reports_dir = tmp_path / "reports"
    reports_dir.mkdir()

    with patch("src.app.os.path.dirname", return_value=str(tmp_path)):
        response = client.get("/api/csv_report")

    assert response.status_code == 200
    assert response.headers["Content-Disposition"].startswith("attachment")

    rows = list(csv.reader(response.data.decode().splitlines()))
    assert rows[1][0] == "8.8.8.8"

# Test JSON download endpoint
def test_json_report_download(client, tmp_path):
    mock_log = """TIMESTAMP;BYTES;STATUS;REMOTE_ADDR
2024-01-01T12:00:00Z;500;200;5.5.5.5
"""
    log_dir = tmp_path / "logfiles"
    log_dir.mkdir()
    (log_dir / "requests.log").write_text(mock_log)

    with patch("src.app.os.path.dirname", return_value=str(tmp_path)):
        response = client.get("/api/json_report")

    assert response.status_code == 200
    assert response.headers["Content-Disposition"].startswith("attachment")
