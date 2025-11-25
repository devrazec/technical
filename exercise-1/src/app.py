from flask import Flask, render_template, jsonify, send_file, Response
from collections import Counter
from datetime import datetime
import os
import io
import csv
import json

app = Flask(__name__)

# Map HTTP status codes to text
STATUS_MAP = {
    200: "OK",
    201: "Created",
    204: "No Content",
    301: "Moved",
    302: "Redirect",
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable",
}


# Load log file from /src/logfiles/requests.log
def table_log():
    data = []
    base_dir = os.path.dirname(os.path.abspath(__file__))
    log_path = os.path.join(base_dir, "logfiles", "requests.log")

    with open(log_path, "r") as f:
        lines = f.readlines()

    if not lines:
        return data

    # Skip the firt line
    for line in lines[1:]:
        line = line.strip()
        if not line or ";" not in line:
            continue

        parts = line.split(";")
        if len(parts) != 4:
            continue

        raw_ts, raw_bytes, raw_status, raw_ip = parts
        entry = {}

        # Timestamp conversion to date dd/mm/yyyy
        try:
            ts_clean = raw_ts.replace("Z", "")
            dt = datetime.fromisoformat(ts_clean)
            entry["TIMESTAMP"] = dt.strftime("%d/%m/%Y")
        except:
            entry["TIMESTAMP"] = None

        # Bytes
        try:
            entry["BYTES"] = int(raw_bytes)
        except:
            entry["BYTES"] = 0

        # Status
        try:
            code = int(raw_status)
            entry["STATUS"] = STATUS_MAP.get(code, raw_status)
        except:
            entry["STATUS"] = raw_status

        # IP Address
        entry["REMOTE_ADDR"] = raw_ip if raw_ip else None

        # Skip if the IP is missing
        if not entry["REMOTE_ADDR"]:
            continue

        data.append(entry)

    return data


# Generate source data for the reports (CSV, JSON)
def report_log():
    logs = table_log()

    # Counters
    counter = Counter()
    bytes_per_ip = Counter()

    total_requests = 0
    total_bytes = 0

    for log in logs:
        # Only include logs with STATUS == "OK"
        if log.get("STATUS") != "OK":
            continue

        ip = log.get("REMOTE_ADDR")
        bytes_sent = int(log.get("BYTES", 0))

        if ip:
            counter[ip] += 1
            bytes_per_ip[ip] += bytes_sent

        total_requests += 1
        total_bytes += bytes_sent

    # Convert Bytes in Megabytes
    total_bytes_mb = round(total_bytes / (1024 * 1024), 2)

    # Build the list
    ip_summary = [
        {
            "ip": ip,
            "bytes": round(bytes_per_ip[ip]),
            "bytes_percentage": round((bytes_per_ip[ip] / total_bytes) * 100, 2),
            "requests": count,
            "requests_percentage": round((count / total_requests) * 100, 2),
        }
        for ip, count in counter.items()
    ]

    # Sort descending by number of requests
    ip_summary.sort(key=lambda x: x["requests"], reverse=True)

    return ip_summary


# Main route
@app.route("/")
def index():
    return render_template("index.html")


# Endpoint for data table web interface
@app.route("/api/table")
def api_table():
    return jsonify(table_log())


# Endpoint for data report
@app.route("/api/report")
def api_report():
    return jsonify(report_log())


# Generate CSV report
@app.route("/api/csv_report")
def csv_report():

    # Get the data
    ip_summary = report_log()

    base_dir = os.path.dirname(os.path.abspath(__file__))
    reports_path = os.path.join(base_dir, "reports")

    # Check the reports folder exists
    os.makedirs(reports_path, exist_ok=True)
    file_path = os.path.join(reports_path, "ipaddr.csv")

    # Save CSV file in the folder src/reports/ipaddr.csv
    with open(file_path, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(
            ["ip", "bytes", "bytes_percentage", "requests", "requests_percentage"]
        )
        for entry in ip_summary:
            writer.writerow(
                [
                    entry["ip"],
                    entry["bytes"],
                    entry["bytes_percentage"],
                    entry["requests"],
                    entry["requests_percentage"],
                ]
            )

    # Generate CSV in memory for download
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(
        ["ip", "bytes", "bytes_percentage", "requests", "requests_percentage"]
    )
    for entry in ip_summary:
        writer.writerow(
            [
                entry["ip"],
                entry["bytes"],
                entry["bytes_percentage"],
                entry["requests"],
                entry["requests_percentage"],
            ]
        )
    output.seek(0)

    return Response(
        output,
        mimetype="text/csv",
        headers={"Content-Disposition": "attachment;filename=ipaddr.csv"},
    )


# Generate JSON report
@app.route("/api/json_report")
def json_report():

    # Get the data
    ip_summary = report_log()

    # Map the lables
    mapped_summary = []
    for entry in ip_summary:
        mapped_summary.append(
            {
                "ip": entry["ip"],
                "bytes": entry["bytes"],
                "bytes_percentage": entry["bytes_percentage"],
                "requests": entry["requests"],
                "requests_percentage": entry["requests_percentage"],
            }
        )

    base_dir = os.path.dirname(os.path.abspath(__file__))
    reports_path = os.path.join(base_dir, "reports")

    # Check the reports folder exists
    os.makedirs(reports_path, exist_ok=True)
    json_file_path = os.path.join(reports_path, "ipaddr.json")

    # Save JSON file in the folder src/reports/ipaddr.json
    with open(json_file_path, "w") as f:
        json.dump(mapped_summary, f, indent=4)

    # Generate JSON in memory for download
    return send_file(
        json_file_path,
        as_attachment=True,
        download_name="ipaddr.json",
        mimetype="application/json",
    )


if __name__ == "__main__":
    app.run(debug=True)
