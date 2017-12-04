### DB setup Schema


CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE burgers
(
    id INT NOT NULL AUTO_INCREMENT, 
    burger_name varchar(255) NOT NULL,
    devoured BOOLEAN DEFAULT FALSE,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);



