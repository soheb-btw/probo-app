import express from 'express';

export const balanceRouter = express.Router();

balanceRouter.get('/inr', (req, res) => {
    res.send('user has 1000 balance');
})

balanceRouter.get('/inr/:userId', (req, res) =>{
    
});