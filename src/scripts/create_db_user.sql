DROP USER IF EXISTS 'billscanner_api'@'localhost';
CREATE USER 'billscanner_api'@'localhost' IDENTIFIED BY 'billscanner_api_1234';
-- Without this next line mysql will throw an error ER_NOT_SUPPORTED_AUTH_MODE
ALTER USER 'billscanner_api'@'localhost' IDENTIFIED WITH mysql_native_password BY 'billscanner_api_1234';
GRANT ALL PRIVILEGES ON billscanner.* TO 'billscanner_api'@'localhost';
FLUSH PRIVILEGES;