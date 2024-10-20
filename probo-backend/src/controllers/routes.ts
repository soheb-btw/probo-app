import express from 'express';
import { userRouter } from './user';
import { balanceRouter } from './balanceRoutes';
import { orderRoutes } from './orderRoutes';
import { redisManager } from '../RedisManager';

const router = express.Router();

router.use('/user', userRouter);
router.use('/balance', balanceRouter);
router.use('/order', orderRoutes);

router.post('/onramp/inr', (req, res) =>{
    const response = redisManager.publishAndWaitForResponse(req.body, 'onramp');
});

export default router;