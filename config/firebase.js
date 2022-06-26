const admin = require("firebase-admin");

require("dotenv").config()

var serviceAccount = require("../ServiceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

exports.sendFCM = (message) => {
    let refreshToken = process.env.firebase_refresh_token;
    let payload = {
        notification: {
            title: "Incoming Message",
            body: message
        }
    }
    admin.messaging().sendToDevice(refreshToken,payload).then( response => {
        return response;
    })
    .catch( error => {
        console.log(error);
    });
}
