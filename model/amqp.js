const amqp = require('amqplib/callback_api')

let exchange = 'notification';
let queueName = 'notification.fcm'
let routingKey = 'notification.done';
let channel;

amqp.connect(process.env.rabbitmq_host, function(error0, connection) {
    if (error0) {
        throw error0;
    }
    channel = connection.createChannel(async function (error1, channel) {
        if (error1) {
            throw error1;
        }

        channel.assertExchange(exchange, 'topic', {
            durable: false
        });
    });
});

exports.consumeMessage = function (message) {

    channel.assertQueue(queueName);

    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)))

    console.log(" [x] Sent %s:'%s'", routingKey, message);
}

exports.publishMessage = function () {
    channel.assertQueue('', {
        exclusive: true
    }, function (error2, q) {
        if (error2) {
            throw error2;
        }

        channel.bindQueue(q.queue, exchange, routingKey);

        channel.consume(q.queue, function (message) {
            channel.ack(message)
            console.log(" [x] %s:'%s'", message.fields.routingKey, message.content.toString());
        }, {
            noAck: false
        });
    });
}
