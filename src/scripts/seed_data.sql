USE billscanner;
-- INSERTING DEFAULT VALUES
-- Defaul categories
INSERT INTO category (name, type)
VALUES 
-- Income categories
    ('Salary', 'income'),
    ('Gift', 'income'),
    ('Salary bonus', 'income'),
    ('Other', 'income'),
-- Expense categories
    ('Food', 'expense'),
    ('Transport', 'expense'),
    ('Entertainment', 'expense'),
    ('Clothing', 'expense'),
    ('Home', 'expense'),
    ('Health', 'expense'),
    ('Education', 'expense'),
    ('Gift', 'expense'),
    ('Other', 'expense'),
-- Transfer categories
    ('Transfer', 'transfer');
-- Repayment categories
-- For each expense category insert a repayment category (all expenses can be repaid)
INSERT INTO category (name, type)
    SELECT name, 'repayment' FROM category WHERE type = 'expense';
