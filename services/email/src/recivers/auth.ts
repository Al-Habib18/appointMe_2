/** @format */

import amqp from "amqplib";
import { sendAuthMail } from "./create";

export const receiveFromQueue = async (queue: string) => {
    const connection = await amqp.connect("amqp://guest:guest@172.17.0.1:5672");
    const channel = await connection.createChannel();

    const exchange = "auth_exchange";
    const routingkey = queue;

    // asser both the exchange and queue exists
    await channel.assertQueue(queue, { durable: true });
    await channel.assertExchange(exchange, "direct", { durable: true });

    await channel.bindQueue(queue, exchange, routingkey);
    channel.consume(
        queue,
        async (msg) => {
            if (!msg) return;
            const emailOption = JSON.parse(msg?.content.toString());
            await sendAuthMail(emailOption);
        },
        { noAck: true }
    );
};
