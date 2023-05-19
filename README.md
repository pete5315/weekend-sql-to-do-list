# Project Name

Weekend coding project - To-do list

## Description

This project created a to-do list page. You can add new tasks to it using a form and submit button. The resulting data will be entered into a table and include and a button to indicate the task has been completed and a button to delete the task if it was entered in error.

The client sends GET, POST, PUT, and DELETE queries to the server via ajax. The server then communicates with the database to pull data/change the database accordingly. The server will send queries to the database using the pg.Pool method. There is a router to keep the server.js code clean.

## Setup requirements

You will need to create a table in your localhost on port 5432 following the database.sql query.
You will need to run npm install in order to have the appropriate dependencies.