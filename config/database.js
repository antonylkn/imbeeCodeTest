const mysql = require("mysql")
require("dotenv").config()

const dbConnection= mysql.createConnection({
    host: process.env.mysql_host,
    port: process.env.mysql_port,
    user: process.env.mysql_user,
    password: process.env.mysql_password,
    database: process.env.mysql_database
})
dbConnection.connect(function(err) {
    if(err) throw err;

    let sql = "CREATE TABLE  IF NOT EXISTS `fcm_job`(" +
        "  `id` bigint NOT NULL AUTO_INCREMENT," +
        "  `identifier` varchar(45) NOT NULL," +
        "  `deliverAt` datetime NOT NULL," +
        "  PRIMARY KEY (`id`)" +
        ") ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;";
    dbConnection.query(sql,function (err, result) {
        if (err) throw err;
    });
});

module.exports = dbConnection;
