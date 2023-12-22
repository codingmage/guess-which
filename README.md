# Guess which!

#### Video Demo: <URL www.youtube.com>

#### Description:

    Inspired by the SQL week, a React app that simulates a guessing game, based on a selection of the most popular IMDB movies at the time of the database download [10/09/2023]. The data files were downloaded directly from the IMDB site <URL https://datasets.imdbws.com/> and the SQL database was created using jojie's imdb-sqlite <URL https://github.com/jojje/imdb-sqlite> which converted the specific files I needed. I then trimmed the database with SQL queries to only use the top 1000 films (at the time).

    It uses React's state management to handle the game's states as that seemed the most fitting. The app selects a random entry from the film database using an SQL query. The details that are used are the name, year, director, main cast and genre.

    At the start, only the genre of the chosen film will show up, but as the game progresses, the hidden details are revealed. The user gets less points for each information revealed. You can keep playing until you run out of lives (presented as hearts). If they guess incorrectly 3 times during the course of a run, they get a game over and their current score is saved if it's higher than their previous one.

    There's a leaderboard to save the highest scores (and the user who got them). The user (and the scores) are saved in a noSQL database (Mongo) since creating a SQLite database just for the users seemed unnecessary given the complexity of a SQL database, and that's something that I wanted to learn as well. I studied fullstackopen's <URL https://fullstackopen.com/en/> part in regards to this type of database since I wasn't familiar with it. I also used the course's backend part and user handling as a basis for this app.
