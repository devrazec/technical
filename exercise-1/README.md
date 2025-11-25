# Exercise #1
````
As software developer, you have to implement a method in order to produce the following daily report: 

/reports/ipaddr.csv 
It must be a text/csv file containing the traffic data per IP Address. Each row must include the following fields: 

IP Address 

Number of requests 

Percentage of Total Requests 

Total Bytes sent 

Percentage of the total amount of bytes 

The data set must be sorted by the number of requests (DESC).  
The source data for your report is stored in the file 

/logfiles/requests.log where each row (record) contains the following semicolon-separated values: 

TIMESTAMP: the moment when the event occurred. 

BYTES: the number of bytes sent to a client. 

STATUS: HTTP response status. 

REMOTE_ADDR: IP address of the client. 

Exclude from your report all the lines in the source file where the STATUS is different from “OK” ( RFC 2616). 

Note: 

Write the requested code in Python; 

Don’t use any frameworks but write the con in Python 3.x using only minimal libraries. 

It is not mandatory, but providing the option to choose between two possible output formats for the daily report file (e.g., CSV, JSON) will be considered. 

Although not required, including unit tests will also be taken into account. 
````

````
Steps for new projects: 

python3 -m venv venv
source venv/bin/activate
touch requirements.txt
pip3 install Flask pytest pytest-flask
pip3 freeze > requirements.txt

Steps for old projects: 

rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt

Create the Project Structure

````

## Description

This tool allows you to download reports in CSV, JSON, PDF, XLSX from a log file stored at /logfiles/requests.log. This file contains the traffic data per IP Address. The interface allows you to filter and sort data.

Note: The download reports CSV and JSON are sorted by the number of requests (DESC), STATUS is igual “OK” and saved automaticaly in the folder /src/reports. The download reports PDF and XLSX are following the Data Grid View where you can filter and sort data.

| Features | 
|----------|
| Load data from a log file. |
| Interface auto-resize with content. |
| Show data from endpoint request. |
| Display the result nicely formatted. |
| Save reports in the server and client side. |
| Generate reports in CSV, JSON, PDF, XLSX. |
| Filter and sort data from the interface. |
| Customized CSV and JSON report with percentage. |

## Endpoints

| APIs | 
|------|
| http://127.0.0.1:5000/api/report |
| http://127.0.0.1:5000/api/table |
| http://127.0.0.1:5000/api/csv_report |
| http://127.0.0.1:5000/api/json_report |

## Unit Tests

 ![Pic2](./src/static/img/pic2.png)

| Pytest Unit Tests | 
|-----------------|
| Parses data |
| Data returns |
| Status codes |
| Endpoints |
| CSV file generation |
| JSON file generation |

## Commands

| CMD | Description |
|-----|-------------|
| pip3 install -r requirements.txt | Install the dependencies. |
| python3 src/app.py | Run the project. | 
| python3 src/generate_log.py | Generate a sample of Log File |
| python3 -m pytest -v | Run all tests. |

## Web Interface

http://127.0.0.1:5000/

![Pic1](./src/static/img/pic1.png)