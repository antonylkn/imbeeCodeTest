# imbeeCodeTest
Leung Kin Ngai

This project contains code for the code Test of Imbee.IO for candidate Leung Kin Ngai.


## Prerequisites

Node.js
MySQL
Firebase
RabbitMQ
Postman

## Setup Procedure

1. Create the `fcm_job` database in the MySQL. 
  Remarks: the table `fcm_job` will be created automatically.
  
2. Clone the repo.

3. Replace the environment variables in the `.env`.
-database config
-rabbitmq host
-firebase refresh token

4. Replace the firebase config in the `ServiceAccountKey.json`.


## Test Guide

1. Open Postman.

2. Call the API.
  `POST /consumeMessage` 
  REQUEST BODY SCHEMA: application/json
  ```
{
    "identifier": "fcm-msg-a1beff5ac",
    "type": "device",
    "deviceId": "testtest15",
    "text": "Hello World"
}
```

## Limitation

The `Send FCM` function may not be worked because of unfamiliarizing to firebase.

Please comment the line 37 in `index.js` if there is any error.
`await admin.sendFCM(req.body.text)`

