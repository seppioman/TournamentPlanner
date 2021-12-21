# TournamentPlanner

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.5.
Made by Seppe Geudens.

# Description

This Angular application is based on the Badminton Tournament Planner application by Visual Reality B.V. that is available on tournamentsoftware.com. With this application, you can execute CRUD functionalities on a database of players, view and filter the rankings of these players, and view and filter the different clubs inside the database. This Angular application functions in collaboration with an API running on Express Js that is connected to a local MySQL database. This database contains data exported out of the ranking table that you can find on www.badminton.de/der-dbv/jugend-wettkampf/ranglistentabelle/ in the form of a CSV file. It is recommended to execute the different steps in the order that is descriped here to prevend errors.

# Database
The database is made in MySQL workbench. The scheme of my application in MySQL Workbench is called tournamentplanner. All the data gets imported into this scheme in a table that is called rankingtable through importing the CSV file called Ranking_2021-12-07_11-08-47.csv in the table import wizard in MySQL workbench. When the data is imported the next step is to run the SQL script DatabaseSciptPlayers.sql that can be found in the Script&Data folder within the project to split all the data up into different tables and thus creating the whole architecture of the database.  

# API

The API is an Express Js project that can be found in the folder TournamentPlannerAPI. In the mySQLClient.js file, all the different CRUD functions are defined and the connection with the database is made. Be sure to check that the credentials of the connection string are correct for your database connection. In the index.js file, all functionalities are used for the different routes that you can access through the internet. To be able to run the API you have to install the MySQL2 package with this command: npm install --save mysql2. After you install the package you can always use "node index.js" in the terminal located at the root of the TournamentPlannerAPI folder to start up the API. 


# Angular SPA

The main application is built in the Angular framework and is connected to the running API. The application is split up into different components and their services. To run the application you first have to install Node.js: https://nodejs.org/en/ and after that install the angular-devkit package through executing npm install --save-dev @angular-devkit/build-angular in the terminal. Now you only have to type in ng serve into the terminal located at the src folder and your application will be built and accessible via http://localhost:4200/.

# Ilab-Stud

If you are using my Angular application on Ilab-Stud then everything is already installed and the database is already filled with dummy data. You can find a video on how to run the application in ilab-stud at this location: C:\Users\geuds1\Seppe_Geudens_TournamentPlanner_Case named Startup-Tutorial.
