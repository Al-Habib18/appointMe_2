/** @format */

import amqp from "amqplib";
import { createLoginHistory } from "../lib";
export const receiveFromQueue = async () => {
    const connection = await amqp.connect("amqp://guest:guest@172.17.0.1:5672");
    const channel = await connection.createChannel();

    const exchange = "login_exchange";
    const queue = "login_queue";
    const routingkey = queue;

    // asser both the exchange and queue exists
    await channel.assertQueue(queue, { durable: true });
    await channel.assertExchange(exchange, "direct", { durable: true });

    await channel.bindQueue(queue, exchange, routingkey);
    channel.consume(
        queue,
        async (msg) => {
            if (!msg) return;
            const login_history = JSON.parse(msg?.content.toString());
            await createLoginHistory(login_history);
        },
        { noAck: true }
    );
};
