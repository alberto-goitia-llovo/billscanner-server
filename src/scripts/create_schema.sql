-- CREATING SCHEMA
DROP SCHEMA IF EXISTS billscanner;
CREATE SCHEMA billscanner;
USE billscanner;

-- CREATING TABLES
CREATE TABLE user (
    user_id INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT unique_name_email UNIQUE (name, email)
);

CREATE TABLE category (
  category_id INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type ENUM ('income', 'expense', 'repayment', 'transfer') NOT NULL,
  user_id INT, -- This is needed for allowing the user to create custom categories
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY category_user (user_id) REFERENCES user(user_id), 
  CONSTRAINT unique_category UNIQUE (name, type, user_id)
);

CREATE TABLE account (
    account_id INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY account_user (user_id) REFERENCES user(user_id),
    CONSTRAINT unique_account UNIQUE (name, user_id)
);

CREATE TABLE bill (
    bill_id INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    date DATE,
    concept VARCHAR(255),
    amount FLOAT,
    balance FLOAT,
    details VARCHAR(255),
    category_id INT,
    account_id INT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY fk_bill_category (category_id) REFERENCES category(category_id),
    FOREIGN KEY fk_bill_account (account_id) REFERENCES account(account_id),
    FOREIGN KEY fk_bill_user (user_id) REFERENCES user(user_id),
    CONSTRAINT unique_bill UNIQUE (date, amount, user_id)
);




