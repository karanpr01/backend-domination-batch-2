create DATABASE book_reviews;

use book_reviews;

-- CREATE TABLE reviews (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     book_title VARCHAR(100),
--     reviewer_name VARCHAR(50),
--     rating INT CHECK (rating BETWEEN 1 AND 5),
--     review_text TEXT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- INSERT INTO reviews (book_title, reviewer_name, rating, review_text) VALUES
-- ('Atomic Habits', 'Suraj', 5, 'Life-changing and practical.'),
-- ('Deep Work', 'Neha', 4, 'Helped me focus better.'),
-- ('The Alchemist', 'Raj', 3, 'Good story, but a bit overhyped.'),
-- ('Clean Code', 'Amit', 5, 'A must-read for devs.'),
-- ('Rich Dad Poor Dad', 'Sana', 4, 'Great for financial mindset.'),
-- ('Ikigai', 'Dev', 3, 'Simple read, calming.'),
-- ('Rework', 'Nidhi', 5, 'Short, direct, and inspiring.'),
-- ('Do Epic Shit', 'Tanmay', 4, 'Modern, relatable thoughts.'),
-- ('Can’t Hurt Me', 'Aryan', 5, 'Powerful mindset shift.'),
-- ('Hooked', 'Isha', 4, 'Useful for product building.');

-- select * from reviews

-- create VIEW five_star_reviews as
-- select book_title , reviewer_name, review_text
-- from reviews
-- where rating = 5;

-- select * from five_star_reviews

-- CREATE VIEW average_ratings AS
-- SELECT book_title, AVG(rating) AS avg_rating
-- FROM reviews
-- GROUP BY book_title;

-- SELECT * from average_ratings;

-- create index idx_book_title on reviews(book_title);

-- select * from reviews where book_title = "Atomic Habits";

CREATE TABLE low_ratings_log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    review_id INT,
    book_title VARCHAR(100),
    reviewer_name VARCHAR(50),
    rating INT,
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER $$

create PROCEDURE log_low_rating(
    in rid int,
    in btitle varchar(100),
    in rname varchar(50),
    in rating_val int
)
begin
 INSERT INTO low_ratings_log (review_id, book_title, reviewer_name, rating)
    VALUES (rid, btitle, rname, rating_val);
end$$

DELIMITER;

DELIMITER $$

CREATE TRIGGER aftr_insert_reviews
after INSERT on reviews
for each row

begin
if NEW.rating = 1 THEN
CALL log_low_rating(new.id , new.book_title , new.reviewer_name , new.rating);
END if;

END$$

DELIMITER ;

INSERT INTO reviews (book_title, reviewer_name, rating, review_text)
VALUES ('Some Boring Book', 'Suraj', 1, 'Did not enjoy this at all.');

SELECT * FROM low_ratings_log;