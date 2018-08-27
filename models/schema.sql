DROP DATABASE IF EXISTS trivia_db;
CREATE DATABASE trivia_db;

USE trivia_db;

CREATE TABLE questions (
    id INT NOT NULL AUTO_INCREMENT,
    category VARCHAR(255) NOT NULL,
    difficulty VARCHAR(255) NOT NULL,
    question VARCHAR(1000) NOT NULL,
    correctAnswer VARCHAR(255) NOT NULL,
    incorrect1 VARCHAR(255) NOT NULL,
    incorrect2 VARCHAR(255) NOT NULL,
    incorrect3 VARCHAR(255) NOT NULL,
    incorrect4 VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
-- you will need to import the results.csv file

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;
