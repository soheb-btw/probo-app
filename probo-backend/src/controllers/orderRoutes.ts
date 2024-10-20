import express from 'express';
import { redisManager } from '../RedisManager';
import { generateRandomId } from '../utils/config';
import { OrderData, QueueOrder } from '../utils/types';
import { BUY, SELL } from '../utils/constants';

export const orderRoutes = express.Router();

orderRoutes.post('/buy/yes', async (req, res) => {
    const { symbol, stockType, price, qty, user }: OrderData = req.body;
    const orderId = generateRandomId();
    const orderDetails: QueueOrder = { orderId, buyOrSell: BUY, order: { symbol, stockType, price, user, qty } };
    const response = await redisManager.publishAndWaitForResponse(JSON.stringify(orderDetails), orderDetails.orderId);
    res.send(response);
});

orderRoutes.post('/buy/no', async (req, res) => {
    const { symbol, stockType, price, qty, user }: OrderData = req.body;
    const orderId = generateRandomId();
    const orderDetails: QueueOrder = { orderId, buyOrSell: BUY, order: { symbol, stockType, price, user, qty } };
    const response = await redisManager.publishAndWaitForResponse(JSON.stringify(orderDetails), orderDetails.orderId);
    res.send(response);
});


orderRoutes.post('/sell/yes', async (req, res) => {
    const { symbol, stockType, price, qty, user }: OrderData = req.body;
    const orderId = generateRandomId();
    const orderDetails: QueueOrder = { orderId, buyOrSell: SELL, order: { symbol, stockType, price, user, qty } };
    const response = await redisManager.publishAndWaitForResponse(JSON.stringify(orderDetails), orderDetails.orderId);
    res.send(response);
});


orderRoutes.post('/sell/no', async (req, res) => {
    const { symbol, stockType, price, qty, user }: OrderData = req.body;
    const orderId = generateRandomId();
    const orderDetails: QueueOrder = { orderId, buyOrSell: SELL, order: { symbol, stockType, price, user, qty } };
    const response = await redisManager.publishAndWaitForResponse(JSON.stringify(orderDetails), orderDetails.orderId);
    res.send(response);
});