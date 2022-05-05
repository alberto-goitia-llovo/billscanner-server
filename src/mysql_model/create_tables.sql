CREATE TABLE category (
  category_id INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(user_id), /* This is needed for allowing the user to create custom categories*/
  CONSTRAINT unique_category UNIQUE (name, user_id)
);

CREATE TABLE user (
    user_id INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT unique_email_pass UNIQUE (email, password)
)

CREATE TABLE account (
    account_id INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    CONSTRAINT unique_account UNIQUE (name, user_id)
);


CREATE TABLE bill (
    bill_id INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    date DATE,
    concept VARCHAR(255),
    amount FLOAT,
    balance FLOAT,
    details VARCHAR(255),
    FOREIGN KEY (category_id) REFERENCES category(category_id)
    FOREIGN KEY (account_id) REFERENCES account(account_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    CONSTRAINT unique_bill UNIQUE (date, amount, user_id)
);

/** 
TODO: insert default categories
*/
