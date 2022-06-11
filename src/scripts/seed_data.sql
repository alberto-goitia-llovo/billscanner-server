USE billscanner;
-- DELETING ALL categories;
DELETE FROM category;
-- INSERTING DEFAULT VALUES
-- Defaul categories
INSERT INTO category (name, type)
VALUES 
-- Income categories
    ('SALARY', 'income'),
    ('GIFT', 'income'),
    ('SALARY BONUS', 'income'),
    ('OTHER', 'income'),
-- Expense categories
    ('FOOD', 'expense'),
    ('TRANSPORT', 'expense'),
    ('ENTERTAINMENT', 'expense'),
    ('LEISURE', 'expense'),
    ('CLOTHING', 'expense'),
    ('SHOPPING', 'expense'),
    ('HOME', 'expense'),
    ('HEALTH', 'expense'),
    ('EDUCATION', 'expense'),
    ('GIFT', 'expense'),
    ('OTHER', 'expense'),
-- Transfer categories
    ('OTHER', 'transfer');
-- Repayment categories
-- For each expense category insert a repayment category (all expenses can be repaid)
INSERT INTO category (name, type)
    SELECT name, 'repayment' FROM category WHERE type = 'expense';
