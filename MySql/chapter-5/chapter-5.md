# Chapter 5: MySQL Views, Indexes, and Triggers

### 📦 Use Case: `book_reviews` Database

Let’s create a database where users review books — good enough to explore concepts.

### 🔧 SQL Setup:

```sql
-- Create the database
CREATE DATABASE book_reviews;
USE book_reviews;

-- Create a table
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_title VARCHAR(100),
    reviewer_name VARCHAR(50),
    rating INT CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert 10 sample entries
INSERT INTO reviews (book_title, reviewer_name, rating, review_text) VALUES
('Atomic Habits', 'Suraj', 5, 'Life-changing and practical.'),
('Deep Work', 'Neha', 4, 'Helped me focus better.'),
('The Alchemist', 'Raj', 3, 'Good story, but a bit overhyped.'),
('Clean Code', 'Amit', 5, 'A must-read for devs.'),
('Rich Dad Poor Dad', 'Sana', 4, 'Great for financial mindset.'),
('Ikigai', 'Dev', 3, 'Simple read, calming.'),
('Rework', 'Nidhi', 5, 'Short, direct, and inspiring.'),
('Do Epic Shit', 'Tanmay', 4, 'Modern, relatable thoughts.'),
('Can’t Hurt Me', 'Aryan', 5, 'Powerful mindset shift.'),
('Hooked', 'Isha', 4, 'Useful for product building.');
```

---

## 👀 2. VIEWS in MySQL

**Views** are **virtual tables** — you don’t store data, just a saved SQL query.

### 📘 Example 1: View for All 5-Star Reviews

```sql
CREATE VIEW five_star_reviews AS
SELECT book_title, reviewer_name, review_text
FROM reviews
WHERE rating = 5;

-- Usage
SELECT * FROM five_star_reviews;
```

> ✅ Helps simplify queries for dashboards or analytics.

---

### 📘 Example 2: View for Average Rating Per Book

```sql
CREATE VIEW average_ratings AS
SELECT book_title, AVG(rating) AS avg_rating
FROM reviews
GROUP BY book_title;

-- Usage
SELECT * FROM average_ratings WHERE avg_rating > 4;
```

> ✅ Useful for performance tuning — offload complex calculations.

---

## ⚡ 3. INDEXES in MySQL

Indexes make your search faster, like a table of contents in a book.

By default, MySQL indexes `PRIMARY KEY`, but you can create indexes on frequently searched columns.

### Example:

```sql
-- Create index on book_title
CREATE INDEX idx_book_title ON reviews(book_title);

-- Query using index
SELECT * FROM reviews WHERE book_title = 'Clean Code';
```

> ✅ Indexes speed up reads but slightly slow down inserts/updates.

---

## 🔥 4. TRIGGERS in MySQL (with Stored Procedure)

**Triggers** are blocks of logic that execute *automatically* on INSERT, UPDATE, or DELETE.

### 🎯 Use Case:

We’ll log whenever a user leaves a 1-star review.

---

### Step 1: Create a `low_ratings_log` table

```sql
CREATE TABLE low_ratings_log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    review_id INT,
    book_title VARCHAR(100),
    reviewer_name VARCHAR(50),
    rating INT,
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### Step 2: Create a Stored Procedure for Logging

```sql
DELIMITER $$

CREATE PROCEDURE log_low_rating(
    IN rid INT, 
    IN btitle VARCHAR(100), 
    IN rname VARCHAR(50), 
    IN rating_val INT
)
BEGIN
    INSERT INTO low_ratings_log (review_id, book_title, reviewer_name, rating)
    VALUES (rid, btitle, rname, rating_val);
END $$

DELIMITER ;
```

---

### Step 3: Create Trigger on `reviews`

```sql
DELIMITER $$

CREATE TRIGGER after_insert_review
AFTER INSERT ON reviews
FOR EACH ROW
BEGIN
    IF NEW.rating = 1 THEN
        CALL log_low_rating(NEW.id, NEW.book_title, NEW.reviewer_name, NEW.rating);
    END IF;
END $$

DELIMITER ;
```

> ✅ Now every time a 1-star review is inserted, it automatically logs the data.



### ✅ Insert a 1-Star Review (Triggers Stored Procedure)

```sql
INSERT INTO reviews (book_title, reviewer_name, rating, review_text)
VALUES ('Some Boring Book', 'Ravi', 1, 'Did not enjoy this at all.');
```

---

### ✅ What Happens Behind the Scenes:

1. This **INSERT** hits the `reviews` table.
2. The **trigger `after_insert_review`** checks `IF NEW.rating = 1`.
3. It calls the stored procedure `log_low_rating(...)`.
4. That procedure inserts this data into `low_ratings_log`.

---

### 🔍 You Can Now Verify:

#### Check `low_ratings_log`:

```sql
SELECT * FROM low_ratings_log;
```


## ✅ Summary

| Feature      | Purpose                                  | Example                                |
| ------------ | ---------------------------------------- | -------------------------------------- |
| **Views**    | Virtual tables to simplify logic & reuse | `five_star_reviews`, `average_ratings` |
| **Indexes**  | Speed up SELECT queries                  | `CREATE INDEX ON book_title`           |
| **Triggers** | Auto-run logic after data changes        | Insert into `low_ratings_log` after 1⭐ |


