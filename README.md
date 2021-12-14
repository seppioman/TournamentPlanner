# TournamentPlanner

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.5.
Made by Seppe Geudens.

# Description

This Angular application is based on the Badminton Tournament Planner application by Visual Reality B.V. that is available on tournamentsoftware.com. With this application you can execute CRUD functionalities on a database of players, view and filter the rankings of these players, and view and filter the different clubs inside the database. This Angular application functions in collaboration with an API running on expressJs that is connected to a local MySQL database. This database contains data exported out of the ranking table that you can find on www.badminton.de/der-dbv/jugend-wettkampf/ranglistentabelle/ in the form of a CSV file.

# Database
The database is made in MySQL workbench. The scheme of my application in MySQL Workbench is called tournamentplanner. All the data gets imported into this scheme in a table that is called rankingtable through importing the CSV file called Ranking_2021-12-07_11-08-47.csv in the table import wizard in MySQL workbench. When the data is imported the next step is to run the sql script DatabaseSciptPlayers.sql that can be found in the Script&Data folder withing the project to split all the data up in different tables and thus creating the whole architecture of the database.  

# API


# Application
