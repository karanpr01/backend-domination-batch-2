-- Active: 1736351091953@@127.0.0.1@3306@mydb
 -- create database myDb;
SHOW DATABASES;
-- DROP DATABASE myDb;

use myDb;


create table users (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(100),
email VARCHAR(100) UNIQUE,
age INT,
create_at TIMESTAMP DEFAULT current_timestamp
);
 -- Add columns
alter table users add gender varchar(10);

-- Modify Columns

alter table users modify age smallint;

-- Rename

alter table users change name full_name varchar(100);

ALTER TABLE users DROP COLUMN gender;

DESCRIBE users;

select * from users;