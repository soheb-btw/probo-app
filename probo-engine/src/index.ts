import { engine } from "./engine";
import { redisManager } from "./redisManager";
import { BUY, SELL } from "./utils/constants";
import { QueueOrder } from "./utils/types";


async function main() {
    while (true) {
        try {
            const orderData: QueueOrder = await redisManager.getOrderFromQueue();
            const  { symbol, stockType, price, qty, user } = orderData.order;
            const orderId = orderData.orderId;
            switch(orderData.buyOrSell){
                case BUY:
                    engine.buy(symbol, stockType, price, qty, user, orderId);
                    redisManager.publishOrder(orderId);
                    redisManager.publishOrderBook(symbol);
                    break;
                case SELL:
                    engine.sell(symbol, stockType, price, qty, user,SELL, orderId);
                    redisManager.publishOrder(orderId);
                    redisManager.publishOrderBook(symbol);
                    break;
                default: 
                    throw new Error('Error while popping from queue');
            }
        } catch (error) {
            console.log(error);
            }
        }
}

    main();