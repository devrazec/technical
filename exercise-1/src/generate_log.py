from datetime import datetime, timedelta, timezone
import random
from pathlib import Path

LOG_FILE = Path(__file__).resolve().parent / "logfiles" / "requests.log"
RECORDS = 2000
START = datetime(2025, 11, 25, 0, 0, 0, tzinfo=timezone.utc)
STATUS_CHOICES = [200, 201, 301, 302, 400, 401, 403, 404, 500, 502, 503]


def rand_ip():
    return f"192.168.0.{random.randint(1,254)}"


def rand_bytes():
    if random.random() < 0.05:
        return random.randint(10000, 50000)
    if random.random() < 0.1:
        return 10000 + random.randint(50000, 100000)
    return random.randint(50000, 100000)


def generate():
    lines = ["TIMESTAMP;BYTES;STATUS;REMOTE_ADDR"]
    current = START
    for i in range(RECORDS):
        step = random.randint(1, 900)
        current += timedelta(seconds=step)
        ts = current.isoformat().replace("+00:00", "Z")
        line = f"{ts};{rand_bytes()};{random.choice(STATUS_CHOICES)};{rand_ip()}"
        lines.append(line)
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    LOG_FILE.write_text("\n".join(lines) + "\n")
    print(f"Wrote {RECORDS} records to {LOG_FILE}")


if __name__ == "__main__":
    generate()
