# Technical Tests

Implementing some Technical Tests

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
Steps: 

````
