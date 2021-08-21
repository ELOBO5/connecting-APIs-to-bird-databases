DROP TABLE IF EXISTS birds;

CREATE TABLE birds (
    id serial PRIMARY KEY,
    name varchar(20) NOT NULL,
    age int NOT NULL,
    breed varchar(50) NOT NULL
);