# Guess which!

#### Video Demo: <URL www.youtube.com>

#### Description:

    Inspired by the SQL week, a React app that simulates a guessing game, based on a selection of the most popular IMDB movies at the time of the database download [10/09/2023]. The data files were downloaded directly from the IMDB site <URL https://datasets.imdbws.com/> and the SQL database was created using jojie's imdb-sqlite <URL https://github.com/jojje/imdb-sqlite> which converted the specific files I needed. I then trimmed the database with SQL queries to only use the top 1000 films (at the time).

    It uses React's state management to handle the game's states as that seemed the most fitting. The app selects a random entry from the film database using an SQL query. The details that are used are the name, year, director, main cast and genre.

    At the start, only the genre of the chosen film will show up, but as the game progresses, the hidden details are revealed. The user gets less points for each information revealed. You can keep playing until you run out of lives (presented as hearts). If they guess incorrectly 3 times during the course of a run, they get a game over and their current score is saved if it's higher than their previous one.

    There's a leaderboard to save the highest scores (and the user who got them). The user (and the scores) are saved in a separate, simple SQLite database. I considered making a separate table for scores, but since I only care about 1 scoreper user I decided to just have that be a column in the user table. If I ever decide to expand the project, like, say, adding a new type of guessing game that does not involve movies, I'd consider making a table for keeping the scores and refering the user who has it.

    I studied fullstackopen's <URL https://fullstackopen.com/en/> part in regards to the backend part, and use its backend chapter and user handling as a basis for this app, merging what I had learned with CS50 and this course. The middleware used is also a part of that course's exercise, as well as the way the frontend interacts with the backend. The sqlite3 inteation with NodeJS was taken from sqlite's own tutorial. <URL https://www.sqlitetutorial.net/sqlite-nodejs/>
