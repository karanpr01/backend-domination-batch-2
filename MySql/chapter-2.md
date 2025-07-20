


# **MySQL Notes for `users` Table (With Examples & Quizzes)**



## **1. Table Setup**

```sql
CREATE DATABASE startersql;
USE startersql;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    gender ENUM('Male', 'Female', 'Other'),
    date_of_birth DATE,
    salary DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data (25 users)
INSERT INTO users (name, email, gender, date_of_birth, salary) VALUES
('Aarav', 'aarav@example.com', 'Male', '1995-05-14', 65000.00),
('Ananya', 'ananya@example.com', 'Female', '1990-11-23', 72000.00),
('Raj', 'raj@example.com', 'Male', '1988-02-17', 58000.00),
('Sneha', 'sneha@example.com', 'Female', '2000-08-09', 50000.00),
('Farhan', 'farhan@example.com', 'Male', '1993-12-30', 61000.00),
('Priyanka', 'priyanka@example.com', 'Female', '1985-07-12', 84000.00),
('Aisha', 'aisha@example.com', 'Female', '1997-03-25', 56000.00),
('Aditya', 'aditya@example.com', 'Male', '1992-06-17', 69000.00),
('Meera', 'meera@example.com', 'Female', '1989-09-05', 77000.00),
('Ishaan', 'ishaan@example.com', 'Male', '2001-10-02', 45000.00),
('Tanvi', 'tanvi@example.com', 'Female', '1994-04-18', 62000.00),
('Rohan', 'rohan@example.com', 'Male', '1986-12-01', 75000.00),
('Zoya', 'zoya@example.com', 'Female', '1998-01-15', 54000.00),
('Karan', 'karan@example.com', 'Male', '1990-08-22', 68000.00),
('Nikita', 'nikita@example.com', 'Female', '1987-03-10', 71000.00),
('Manav', 'manav@example.com', 'Male', '1996-11-29', 61000.00),
('Divya', 'divya@example.com', 'Female', '1991-02-28', 57000.00),
('Harshit', 'harshit@example.com', 'Male', '1993-09-09', 65000.00),
('Ritika', 'ritika@example.com', 'Female', '1999-05-05', 52000.00),
('Imran', 'imran@example.com', 'Male', '1995-07-30', 63000.00),
('Juhi', 'juhi@example.com', 'Female', '1992-10-14', 59000.00),
('Tushar', 'tushar@example.com', 'Male', '1990-01-08', 73000.00),
('Lata', 'lata@example.com', 'Female', '1984-11-11', 78000.00),
('Yash', 'yash@example.com', 'Male', '1997-06-06', 64000.00),
('Fatima', 'fatima@example.com', 'Female', '1993-03-03', 55000.00);
```

---

## **2. Checking for NULL Values (`IS` and `IS NOT`)**

Used to check if a value is missing.

```sql
-- Find all users where salary is NOT NULL
SELECT name, salary FROM users WHERE salary IS NOT NULL;

-- Find users where date_of_birth is NULL
SELECT name FROM users WHERE date_of_birth IS NULL;
```

---

## **3. Filtering by Range (`BETWEEN`)**

Used for **numbers, dates, and ranges**.

```sql
-- Find users with salary between 60k and 75k
SELECT name, salary FROM users WHERE salary BETWEEN 60000 AND 75000;

-- Find users born between 1990 and 1995
SELECT name, date_of_birth FROM users
WHERE date_of_birth BETWEEN '1990-01-01' AND '1995-12-31';
```

---

## **4. Filtering Multiple Values (`IN`)**

Instead of multiple `OR` conditions.

```sql
-- Find all Male and Female users (excluding Other)
SELECT name, gender FROM users WHERE gender IN ('Male', 'Female');

-- Find users with specific salary values
SELECT name, salary FROM users WHERE salary IN (50000, 55000, 60000);
```

---

## **5. Combining Conditions (`OR` and `AND`)**

```sql
-- Users with salary > 70k OR born before 1990
SELECT name, salary, date_of_birth FROM users
WHERE salary > 70000 OR date_of_birth < '1990-01-01';

-- Users who are Female AND earn more than 60k
SELECT name, salary FROM users WHERE gender = 'Female' AND salary > 60000;
```

---

## **6. Sorting Data (`ORDER BY`)**

Sort results by one or more columns.

```sql
-- Sort by salary in descending order (highest first)
SELECT name, salary FROM users ORDER BY salary DESC;

-- Sort by gender, then salary (ascending)
SELECT name, gender, salary FROM users ORDER BY gender ASC, salary ASC;
```

---

## **7. Pattern Matching (`LIKE`)**

```sql
-- Names starting with 'A'
SELECT name FROM users WHERE name LIKE 'A%';

-- Emails containing 'example'
SELECT name, email FROM users WHERE email LIKE '%example%';
```

---

## **8. Aggregate Functions**

Perform calculations on data.

```sql
-- Count total users
SELECT COUNT(*) FROM users;

-- Average salary of all users
SELECT AVG(salary) AS avg_salary FROM users;

-- Highest salary
SELECT MAX(salary) AS max_salary FROM users;

-- Lowest salary
SELECT MIN(salary) AS min_salary FROM users;

-- Total salary of Female employees
SELECT SUM(salary) AS total_salary FROM users WHERE gender = 'Female';
```

---

## **9. Limiting Results (`LIMIT`)**

```sql
-- Get top 5 highest-paid users
SELECT name, salary FROM users ORDER BY salary DESC LIMIT 5;

-- Get 3 youngest users (by birth date)
SELECT name, date_of_birth FROM users ORDER BY date_of_birth DESC LIMIT 3;
```

---

## **10. Updating Records (`UPDATE`)**

```sql
-- Increase salary of all Female employees by 5000
UPDATE users SET salary = salary + 5000 WHERE gender = 'Female';

-- Update email for a specific user
UPDATE users SET email = 'newemail@example.com' WHERE name = 'Aarav';
```

---

## **11. Deleting Records (`DELETE`)**

```sql
-- Delete users with salary less than 50k
DELETE FROM users WHERE salary < 50000;

-- Delete a user by email
DELETE FROM users WHERE email = 'raj@example.com';
```

---



# **Practice Quiz (10 Questions)**

---

### **Q1:**

Find all **Female users** with a salary **greater than 70,000**, sorted by **salary (descending)**.

---

### **Q2:**

Find all users **born after 1995** OR with **salary less than 55,000**.

---

### **Q3:**

Count how many **Male users** earn **between 60,000 and 75,000**.

---

### **Q4:**

Find the **highest salary** among **Females** and display their **name and salary**.

---

### **Q5:**

Increase salary by **5,000** for all users earning **less than 60,000**.

---

### **Q6:**

Delete all users whose **names start with 'I'**.

---

### **Q7:**

Get the **top 3 highest-paid Male employees**, sorted by salary.

---

### **Q8:**

Find the **average salary of users born before 1990**.

---

### **Q9:**

List all users whose **email ends with 'example.com'** and sort them by **name (ascending)**.

---

### **Q10:**

Find all users whose **name contains the letter 'a' (case-insensitive)** and **salary is more than 60,000**.

---

# **Quiz Answers**



```sql
-- Q1: Female users earning >70k (highest first)
SELECT name, salary FROM users
WHERE gender = 'Female' AND salary > 70000
ORDER BY salary DESC;

-- Q2: Born after 1995 OR salary <55k
SELECT name, date_of_birth, salary FROM users
WHERE date_of_birth > '1995-01-01' OR salary < 55000;

-- Q3: Count Male users earning 60k–75k
SELECT COUNT(*) FROM users
WHERE gender = 'Male' AND salary BETWEEN 60000 AND 75000;

-- Q4: Highest-paid Female
SELECT name, salary FROM users
WHERE gender = 'Female'
ORDER BY salary DESC LIMIT 1;

-- Q5: Increase salary by 5000 for those earning <60k
UPDATE users SET salary = salary + 5000 WHERE salary < 60000;

-- Q6: Delete users whose name starts with 'I'
DELETE FROM users WHERE name LIKE 'I%';

-- Q7: Top 3 highest-paid Male employees
SELECT name, salary FROM users
WHERE gender = 'Male'
ORDER BY salary DESC LIMIT 3;

-- Q8: Average salary of users born before 1990
SELECT AVG(salary) AS avg_salary FROM users
WHERE date_of_birth < '1990-01-01';

-- Q9: Users with email ending in 'example.com' sorted by name
SELECT name, email FROM users
WHERE email LIKE '%example.com'
ORDER BY name ASC;

-- Q10: Names containing 'a' (case-insensitive) with salary >60k
SELECT name, salary FROM users
WHERE name LIKE '%a%' AND salary > 60000;
```

