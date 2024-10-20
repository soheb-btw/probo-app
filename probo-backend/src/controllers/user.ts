import express from 'express';

export const userRouter = express.Router();

userRouter.get('/getbalance', (req, res) => {
    res.send('hi there');
});