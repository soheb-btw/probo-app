import express from 'express';
import { redisManager } from '../RedisManager';
import { APIType } from '../utils/constants';
import { QueueData } from '../utils/types';

export const userRouter = express.Router();

userRouter.post('/create/:userId', async (req, res) => {
    const userId = req.params.userId;
    const queueData: QueueData = {
        type: APIType.CreateUser,
        data: userId
    }
    try {
        await redisManager.publishAndWaitForResponse(queueData, userId);
        res.status(200).json({message: 'User created successfully'});
    } catch (error) {
        res.send('something went wrong :(');
  }
});