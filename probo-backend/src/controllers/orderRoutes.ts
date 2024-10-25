import express from 'express';
import { redisManager } from '../RedisManager';
import { generateRandomId } from '../utils/config';
import { OrderData, QueueData } from '../utils/types';
import { APIType } from '../utils/constants';

export const orderRoutes = express.Router();

orderRoutes.post('/buy/yes', async (req, res) => {
    const { symbol, stockType, price, qty, user }: OrderData = req.body;
    const orderId = generateRandomId();
    const queueData: QueueData = {
        type: APIType.BUY, data: {
            orderId,
            order: { symbol, stockType, price, user, qty }
        }
    };
    const response = await redisManager.publishAndWaitForResponse(queueData, orderId);
    res.send(response);
});

orderRoutes.post('/buy/no', async (req, res) => {
    const { symbol, stockType, price, qty, user }: OrderData = req.body;
    const orderId = generateRandomId();
    const queueData: QueueData = {
        type: APIType.BUY, data: {
            orderId,
            order: { symbol, stockType, price, user, qty }
        }
    };
    const response = await redisManager.publishAndWaitForResponse(queueData, orderId);
    res.send(response);
});


orderRoutes.post('/sell/yes', async (req, res) => {
    const { symbol, stockType, price, qty, user }: OrderData = req.body;
    const orderId = generateRandomId();
    const queueData: QueueData = {
        type: APIType.SELL, data: {
            orderId,
            order: { symbol, stockType, price, user, qty }
        }
    };
    const response = await redisManager.publishAndWaitForResponse(queueData, orderId);
    res.send(response);
});


orderRoutes.post('/sell/no', async (req, res) => {
    const { symbol, stockType, price, qty, user }: OrderData = req.body;
    const orderId = generateRandomId();
    const queueData: QueueData = {
        type: APIType.SELL, data: {
            orderId,
            order: { symbol, stockType, price, user, qty }
        }
    };
    const response = await redisManager.publishAndWaitForResponse(queueData, orderId);
    res.send(response);
});