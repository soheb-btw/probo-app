import { engine } from "./engine";
import { redisManager } from "./redisManager";
import { BUY, SELL } from "./utils/constants";
import { QueueOrder } from "./utils/types";


async function main() {
    while (true) {
        try {
            const data = await redisManager.getValueFromQueue();
            console.log(data.type);
            switch (data.type) {
                case BUY:
                    engine.buy(data.symbol, data.stockType, data.price, data.qty, data.user, data.orderId);
                    redisManager.publishOrder(data.orderId);
                    redisManager.publishOrderBook(data.symbol);
                    break;
                case SELL:
                    engine.sell(data.symbol, data.stockType, data.price, data.qty, data.user, SELL, data.orderId);
                    redisManager.publishOrder(data.orderId);
                    redisManager.publishOrderBook(data.symbol);
                    break;
                case 'onramp':

                default:
                    throw new Error('Type does not exists');
            }
        } catch (error) {
            console.log(error);
        }
    }
}

main();