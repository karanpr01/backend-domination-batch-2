-- create database techdb;

use techdb;



--- turn off autocommit
SET autocommit = 0;
insert into tech (name , category , release_year , website)
values
("Javascript" , "Fullstack" , 1995 , "https://Javascript.org"),
("Python" , "Fullstack" , 1995 , "https://Python.org"),
("Rust" , "Backend" , 2013 , "https://Rust.com")

select * from tech

delete from tech where id = 5;

ROLLBACK;
--COMMIT


-- create table tech(
--     id int primary key auto_increment,
--     name varchar(50) not  null,
--     category varchar(50) not null,
--     release_year int check (release_year >=1990),
--     website varchar(100) UNIQUE,
--     create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- )

-- insert into tech (name , category , release_year , website)
-- values
-- ("React" , "Frontend" , 2013 , "https://reactjs.org"),
-- ("Node.js" , "Backend" , 2009 , "https://nodejs.org"),
-- ("MySQl" , "Database" , 1995 , "https://mysql.com")

-- select * from tech;

-- CREATE TABLE frameworks (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     tech_id INT,  
--     framework_name VARCHAR(50) NOT NULL,
--     version VARCHAR(10) DEFAULT '1.0',
--     CONSTRAINT fk_tech FOREIGN KEY (tech_id)
--         REFERENCES tech(id)
--         ON DELETE CASCADE
--         ON UPDATE CASCADE
-- );

-- insert into frameworks (tech_id , framework_name , version)
-- values
-- (1 , "Next.js" , "15"),
-- (2 , "Express.js" , "5"),
-- (3, "InnoDB" , "1.0")

-- select * from frameworks;


-- delete from tech where id = 2;

