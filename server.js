const express = require('express')
const app = express()

const { Validator } = require('node-input-validator')

const notification = require("./model/notification")
const amqp = require("./model/amqp")
const admin = require('./config/firebase')

app.use(express.json())

app.get("/getSentNotification", (req, res) => {
    res.json(notification.getNotification());
})

app.post("/consumeMessage", (req, res)=>{
    const v = new Validator(req.body, {
        'identifier': 'required|string',
        'type': 'required|string',
        'deviceId': 'required|string',
        'text': 'required|string'
    })

    v.check().then(async (matched) => {
        if (!matched) res.status(500).send(v.errors)

        let identifier = req.body.identifier;

        const isoDateString = new Date().toISOString();
        const isoDate = new Date(isoDateString);
        const time = isoDate.toJSON().slice(0, 19).replace('T', ' ');

        let message = {identifier: identifier, deliverAt: time};

        await amqp.consumeMessage(message);

        await admin.sendFCM(req.body.text)

        await notification.insertNotification(message)

        await amqp.publishMessage()

        await res.status(200).json(message);
    })
})

app.listen(3000, () => {console.log("Started")})
