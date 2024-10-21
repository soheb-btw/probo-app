import express from 'express';
import { userRouter } from './user';
import { balanceRouter } from './balanceRoutes';
import { orderRoutes } from './orderRoutes';
import { redisManager } from '../RedisManager';
import { QueueData } from '../utils/types';

const router = express.Router();

router.use('/user', userRouter);
router.use('/balance', balanceRouter);
router.use('/order', orderRoutes);

router.post('/onramp/inr',async (req, res) =>{
    const queueData: QueueData = {
        type: 'onramp',
        data: req.body
    }
    const response = await redisManager.publishAndWaitForResponse(JSON.stringify(queueData), 'onramp');
    console.log(response);
});

export default router;