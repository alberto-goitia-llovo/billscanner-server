DROP USER IF EXISTS 'billscanner_api'@'localhost';
CREATE USER 'billscanner_api'@'localhost' IDENTIFIED BY 'billscanner_api_pass';
-- Without this next line mysql will throw error ER_NOT_SUPPORTED_AUTH_MODE 
ALTER USER 'billscanner_api'@'localhost' IDENTIFIED WITH mysql_native_password BY 'billscanner_api_pass';
GRANT ALL PRIVILEGES ON billscanner TO 'billscanner_api'@'localhost';
FLUSH PRIVILEGES;
-- TODO: access .env file and set the password dynamically