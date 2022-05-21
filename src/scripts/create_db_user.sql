CREATE USER 'billscanner_api'@'localhost' IDENTIFIED BY 'billscanner_api_admin';
GRANT ALL PRIVILEGES ON billscanner TO 'billscanner_api'@'localhost';
flush privileges;

-- TODO: access .env file and set the password dynamically