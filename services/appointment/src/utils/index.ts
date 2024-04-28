/** @format */

const bcrypt = require("bcryptjs");
import amqp from "amqplib";

const generateHash = async (payload: string, saltRound = 10) => {
    const salt = await bcrypt.genSalt(saltRound);
    return bcrypt.hash(payload, salt);
};

const hasMatched = async (raw: string, hash: string) => {
    const result = await bcrypt.compare(raw, hash);
    return result;
};

// send email to queue
const sendToQueue = async (data: {
    from: string;
    to: string;
    subject: string;
    text: string;
    source: string;
}) => {
    try {
        const connection = await amqp.connect(
            "amqp://guest:guest@172.17.0.1:5672"
        );
        const channel = await connection.createChannel();

        const exchange = "appointment_exchange";
        const queue = "appointment_queue";
        const routingKey = queue;

        // Assert both the exchange and queue exist on the broker
        await channel.assertQueue(queue, { durable: true });
        await channel.assertExchange(exchange, "direct", { durable: true });

        //bind the queue to the exchange with the routing key
        await channel.bindQueue(queue, exchange, routingKey);

        // stingify the data
        const stringifiedData = JSON.stringify(data);

        channel.publish(exchange, queue, Buffer.from(stringifiedData));
        console.log(`Sent ${data} to ${queue}`);

        setTimeout(() => {
            connection.close();
        }, 500);

        return true;
    } catch (error) {
        console.log("error occured during email sent to queue: ", error);
        return error;
    }
};

export { generateHash, hasMatched, sendToQueue };
