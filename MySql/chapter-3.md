# **MySQL Constraints, Keys & Transactions – Full Notes**

---

## **1. What are Constraints in MySQL?**

**Constraints** are rules applied to table columns to ensure **data integrity** (data remains valid and consistent).

### Types of Constraints:

1. **NOT NULL** – The column must always have a value.
2. **UNIQUE** – Each value in the column must be unique (no duplicates).
3. **PRIMARY KEY** – Uniquely identifies every row (cannot be `NULL` and is automatically `UNIQUE`).
4. **FOREIGN KEY** – Links a column to a Primary Key in another table (creates relationships).
5. **CHECK** – Ensures values meet a condition (e.g., `age > 0`).
6. **DEFAULT** – Assigns a default value if none is given.

---

## **2. Primary Key**

A **Primary Key (PK)** is a special column (or set of columns) used to **uniquely identify each row** in a table.

### Rules:

* Must be **unique** for each row.
* Cannot be `NULL`.
* Each table can have **only one Primary Key**, but it can be made up of multiple columns (What is a composite key).

---

### Example – `tech` Table

We create a `tech` table with `id` as the Primary Key.

```sql
CREATE DATABASE IF NOT EXISTS techdb;
USE techdb;

DROP TABLE IF EXISTS tech;

CREATE TABLE tech (
    id INT PRIMARY KEY AUTO_INCREMENT,        -- Primary Key with Auto Increment
    name VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    release_year INT CHECK (release_year >= 1990),
    website VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Insert sample data:

```sql
INSERT INTO tech (name, category, release_year, website)
VALUES
('React', 'Frontend', 2013, 'https://reactjs.org'),
('Node.js', 'Backend', 2009, 'https://nodejs.org'),
('MySQL', 'Database', 1995, 'https://mysql.com');
```

View data:

```sql
SELECT * FROM tech;
```

Here:

* `id` is the **Primary Key** (Auto Incremented).
* `website` is **Unique** (cannot repeat but is not a primary key).

---

## **3. Foreign Key**

A **Foreign Key (FK)** is a column in one table that **references a Primary Key in another table**.
It enforces **referential integrity** (a row can only refer to an existing parent row).

### Why use Foreign Keys?

* To link tables (relationships).
* To prevent invalid references.
* To define what happens when parent rows are **deleted or updated**.

---

### Example – `frameworks` Table

Each framework belongs to a technology in the `tech` table.

```sql
DROP TABLE IF EXISTS frameworks;

CREATE TABLE frameworks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tech_id INT,  -- Foreign Key referencing tech.id
    framework_name VARCHAR(50) NOT NULL,
    version VARCHAR(10) DEFAULT '1.0',
    CONSTRAINT fk_tech FOREIGN KEY (tech_id)
        REFERENCES tech(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
```

What this means:

* `tech_id` must match an existing `id` from `tech`.
* If a `tech` row is **deleted**, all its frameworks will also be deleted (`ON DELETE CASCADE`).
* If a `tech` row’s `id` is updated, the `tech_id` in `frameworks` is updated automatically (`ON UPDATE CASCADE`).

Insert sample frameworks:

```sql
INSERT INTO frameworks (tech_id, framework_name, version)
VALUES
(1, 'Next.js', '13'),   -- Related to React
(2, 'Express.js', '4'), -- Related to Node.js
(3, 'InnoDB', '1.0');   -- Related to MySQL
```

View data:

```sql
SELECT * FROM frameworks;
```

Test cascading delete:

```sql
DELETE FROM tech WHERE id = 2;  -- Deletes Node.js AND its framework (Express.js)
SELECT * FROM frameworks;       -- Express.js is now gone
```

---

## **4. Other Constraints**

Besides Primary & Foreign Keys, we also commonly use:

* `NOT NULL`: Column must always have a value.
* `UNIQUE`: No duplicates allowed.
* `CHECK`: Ensures values are valid (e.g., `salary > 0`).
* `DEFAULT`: Sets a default value when none is given.

Already used in the `tech` table:

```sql
CREATE TABLE tech (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    release_year INT CHECK (release_year >= 1990),
    website VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## **5. Transactions & Commit**

A **transaction** allows you to group multiple SQL statements as **one unit of work**.
You can either:

* **Commit**: Save all changes permanently.
* **Rollback**: Undo all changes.

By default, MySQL uses **autocommit (every statement is committed automatically)**.

---

### Example Transaction:

```sql
-- Turn off autocommit
SET autocommit = 0;

-- Insert multiple records
INSERT INTO tech (name, category, release_year, website)
VALUES ('Vue.js', 'Frontend', 2014, 'https://vuejs.org');

INSERT INTO tech (name, category, release_year, website)
VALUES ('Angular', 'Frontend', 2010, 'https://angular.io');

-- If everything is correct, save changes
COMMIT;

 

ROLLBACK
-- If something went wrong, undo changes instead
-- ROLLBACK;

-- Re-enable autocommit
SET autocommit = 1;
```

---

## **6. Auto Increment**

`AUTO_INCREMENT` is used on integer columns (usually a Primary Key) so that MySQL **automatically generates a unique number** for each new row.

Example (already in `tech` and `frameworks`):

```sql
id INT PRIMARY KEY AUTO_INCREMENT
```

Insert without specifying `id`:

```sql
INSERT INTO tech (name, category, release_year, website)
VALUES ('Django', 'Backend', 2005, 'https://djangoproject.com');

SELECT * FROM tech;  -- The id is generated automatically
```

---

## **7. Full Working Example (Run from Scratch)**

```sql
-- Create and use database
CREATE DATABASE IF NOT EXISTS techdb;
USE techdb;

-- Drop old tables if they exist
DROP TABLE IF EXISTS frameworks;
DROP TABLE IF EXISTS tech;

-- Step 1: Primary Key Table
CREATE TABLE tech (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    release_year INT CHECK (release_year >= 1990),
    website VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO tech (name, category, release_year, website)
VALUES
('React', 'Frontend', 2013, 'https://reactjs.org'),
('Node.js', 'Backend', 2009, 'https://nodejs.org'),
('MySQL', 'Database', 1995, 'https://mysql.com');

-- Step 2: Foreign Key Table
CREATE TABLE frameworks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tech_id INT,
    framework_name VARCHAR(50) NOT NULL,
    version VARCHAR(10) DEFAULT '1.0',
    CONSTRAINT fk_tech FOREIGN KEY (tech_id)
        REFERENCES tech(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Insert frameworks
INSERT INTO frameworks (tech_id, framework_name, version)
VALUES
(1, 'Next.js', '13'),
(2, 'Express.js', '4'),
(3, 'InnoDB', '1.0');

-- Step 3: Transactions Example
SET autocommit = 0;
INSERT INTO tech (name, category, release_year, website)
VALUES ('Vue.js', 'Frontend', 2014, 'https://vuejs.org');
INSERT INTO tech (name, category, release_year, website)
VALUES ('Angular', 'Frontend', 2010, 'https://angular.io');
COMMIT;
SET autocommit = 1;

-- Check final data
SELECT * FROM tech;
SELECT * FROM frameworks;
```

---

## **8. Quick Cheat Sheet (For Revision)**

* **Primary Key**

  ```sql
  column_name datatype PRIMARY KEY AUTO_INCREMENT
  ```

  Uniquely identifies each row.

* **Foreign Key**

  ```sql
  FOREIGN KEY (column) REFERENCES other_table(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
  ```

  Enforces relationship and handles parent deletions/updates.

* **Other Constraints**

  ```sql
  NOT NULL, UNIQUE, CHECK (condition), DEFAULT value
  ```

* **Transactions**

  ```sql
  SET autocommit = 0;
  -- SQL statements
  COMMIT;   -- or ROLLBACK;
  SET autocommit = 1;
  ```


