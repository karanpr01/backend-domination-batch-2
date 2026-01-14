create database startersql;

use startersql;

create table users (
    id int auto_increment primary key,
    name varchar(100) not null,
    email varchar(100) UNIQUE not null,
    gender ENUM("Male" , "Female" , "Other"),
    date_of_birth DATE,
    salary decimal(10 , 2),
    created_at timestamp default CURRENT_TIMESTAMP
)

-- Insert data into the table

insert into users (name , email , gender , date_of_birth , salary) values
("Priya" , "Priya@example.com" , "Female" , "1992-03-01" , null)

-- ('Ananya', 'ananya@example.com', 'Female', '1990-11-23', 72000.00),
-- ('Raj', 'raj@example.com', 'Male', '1988-02-17', 58000.00),
-- ('Sneha', 'sneha@example.com', 'Female', '2000-08-09', 50000.00),
-- ('Farhan', 'farhan@example.com', 'Male', '1993-12-30', 61000.00),
-- ('Priyanka', 'priyanka@example.com', 'Female', '1985-07-12', 84000.00),
-- ('Aisha', 'aisha@example.com', 'Female', '1997-03-25', 56000.00),
-- ('Aditya', 'aditya@example.com', 'Male', '1992-06-17', 69000.00),
-- ('Meera', 'meera@example.com', 'Female', '1989-09-05', 77000.00),
-- ('Ishaan', 'ishaan@example.com', 'Male', '2001-10-02', 45000.00),
-- ('Tanvi', 'tanvi@example.com', 'Female', '1994-04-18', 62000.00),
-- ('Rohan', 'rohan@example.com', 'Male', '1986-12-01', 75000.00),
-- ('Zoya', 'zoya@example.com', 'Female', '1998-01-15', 54000.00),

-- ('Karan', 'karan@example.com', 'Male', '1990-08-22', 68000.00),
-- ('Nikita', 'nikita@example.com', 'Female', '1987-03-10', 71000.00),
-- ('Manav', 'manav@example.com', 'Male', '1996-11-29', 61000.00),
-- ('Divya', 'divya@example.com', 'Female', '1991-02-28', 57000.00),
-- ('Harshit', 'harshit@example.com', 'Male', '1993-09-09', 65000.00),
-- ('Ritika', 'ritika@example.com', 'Female', '1999-05-05', 52000.00),
-- ('Imran', 'imran@example.com', 'Male', '1995-07-30', 63000.00),
-- ('Juhi', 'juhi@example.com', 'Female', '1992-10-14', 59000.00),
-- ('Tushar', 'tushar@example.com', 'Male', '1990-01-08', 73000.00),
-- ('Lata', 'lata@example.com', 'Female', '1984-11-11', 78000.00),
-- ('Yash', 'yash@example.com', 'Male', '1997-06-06', 64000.00),
-- ('Fatima', 'fatima@example.com', 'Female', '1993-03-03', 55000.00);

-- How to select data into the mysql

-- select * from users

--* is and is not

SELECT name , salary from users WHERE salary IS NOT NULL;

SELECT name , salary from users WHERE salary IS  NULL;

-- Between

--used for numbers , dates , and ranges

SELECT name , salary from users where salary between 60000 AND 75000;

-- find users born between 1990 and 1995
select name , date_of_birth from users
where date_of_birth between '1990-01-01' and "1995-12-31"

-- IN

-- Fina all male and female users ( excluding other)
select name , gender from users where gender IN ("Male" , "Female")

-- find users with specific salary values
SELECT name , salary from users where salary in (50000 , 55000 , 60000)

-- * combining conditions ( OR , AND)
---user with salary > 70k or born before 1990
select name , salary , date_of_birth from users
where salary > 70000 or date_of_birth < "1990-01-01"

select name , salary from users where gender = "Female" and salary > 60000

-- * order by

-- sort by salary in desc order ( highest first)
select name , salary from users ORDER BY salary DESC;

select name , gender , salary from users ORDER BY gender DESC , salary ASC;

-- Pattern matching ( like)

-- Names starting with A

SELECT name from users where name LIKE 'A%'

select name , email from users where email LIKE "%example%"

-- Aggregate functions

SELECT COUNT(*) from users;

select AVG(salary) as avg_salary from users;

select max(salary) as max_salary from users;

select min(salary) as min_salary from users;

select sum(salary) as total_salary from users where gender = "Female"


-- * Limit

-- Get top 5 highest paid users

select name , salary from users order by salary desc LIMIT 5;

-- get 3 youngest users 

select name , date_of_birth from users ORDER BY date_of_birth desc limit 3;

-- Updating records

-- increase salary of all female by 5000

update users set salary = salary + 115000 where gender = "Male"

select * from users;

update users set email = "newemail@example.com" where name = "Aarav";

-- Delete

DELETE from users where salary < 50000;

DELETE FROM users WHERE email = 'raj@example.com';
--Find all **Female users** with a salary **greater than 70,000**, sorted by **salary (descending)

--Get the **top 3 highest-paid Male employees**, sorted by salary.

select name , salary from users where gender = "Male" ORDER BY salary desc limit 3


select avg(salary) as avg_salary from users where date_of_birth < "1990-01-01"