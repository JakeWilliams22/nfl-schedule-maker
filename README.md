# Release Notes #

### New Software Features ###
* Added login and logout functionality
* Added ability to edit profile
### Bug Fixes ###
* Fixed ability to regenerate a schedule after filtering by week
### Known Bugs ###
* Filtering by both week and and team, the application will only filter by week

# Install Guide #

The application can be accessed using our installation by navigating to https://nfl-sched-maker.herokuapp.com/. Default credentials are username: “admin”, password: “admin”. Below are technical instructions for installing and launching the application on your own server.

### Pre-requisites ###
* NodeJS must be installed on the host computer
* Apache web server must installed on the host computer

### Dependent libraries that must be installed ###
N/A

### Download instructions ###
Git is the recommended program for downloading the source code for the application

1. Clone the nfl-sched-maker repository - https://github.com/JakeWilliams22/nfl-sched-maker.git
2. Clone the nfl-schedule-maker repository - https://github.com/JakeWilliams22/nfl-schedule-maker.git
3. Clone the nfl-schedule-algorithm repository - https://github.com/JakeWilliams22/nfl-schedule-algorithm.git

### Build instructions ###
N/A - All source code built/interpreted when the servers are started.

### Installation of actual application ###
N/A. See run instructions below. Optionally, the run instructions can be started as services to autorun when a server is booted.

### Run instructions ###

#### Start Servers ####
##### 1. Start the algorithm server #####
Navigate to the directory where nfl-schedule-algorithm is downloaded and from the terminal run ```python3 app.py```
##### 2. Start the NodeJS backend server #####
Navigate to the directory where nfl-schedule-maker is downloaded and from the terminal run ```nodejs server.js```
##### 3. Start the Frontend server #####
Copy the cloned nfl-sched-maker repo into the html folder wherever apache is installed, and then start the apache server.

#### Access Application ####
Navigate to http://localhost/index.php

### Troubleshooting ###
Common issues with out application have not been identified. To troubleshoot issues with Apache, NodeJS, or Python, see their respective troubleshooting guides online.
