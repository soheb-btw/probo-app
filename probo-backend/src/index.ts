import express, { json } from 'express';
import router from './controllers/routes';

const app = express();
app.use(express.json())

app.use('/v1', router);

app.get('/healthy', (req,res) => {
    res.send('server is running...');
})

app.listen('3000', () => {
    console.log('Server Started on Port 3000');
})