const dbConnection = require("../config/database")

exports.getNotification = function () {
    let query = "SELECT * FROM fcm_job";
    dbConnection.query(query, function (err, rows, fields) {
        if (err) {
            return err;
        }else{
            return {
                res: true,
                content: rows,
            };
        }
    });
}

exports.insertNotification = function (insertData, callback) {
    let insertQuery = "INSERT INTO fcm_job (`identifier`, `deliverAt`) VALUES ('" + insertData.identifier + "', '" + insertData.deliverAt + "')";
    dbConnection.query(insertQuery, function (err, rows, fields) {
        if (err) {
            return err;
        }
        return {
            res: true,
            content: rows,
        };
    });
}
