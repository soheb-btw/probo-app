import { engine } from "./engine";
import { redisManager } from "./redisManager";
import { userManager } from "./userManager";
import { APIType } from "./utils/constants";


console.log('engine started');
async function main() {
    while (true) {
        try {
            const response = await redisManager.getValueFromQueue();
            const data = response.data;
            console.log(data);
            switch (response.type) {
                case APIType.BUY:
                    engine.buy(data.order.symbol, data.order.stockType, data.order.price, data.order.qty, data.order.user, data.orderId);
                    await redisManager.publishOrder(data.orderId);
                    await redisManager.publishOrderBook(data.order.symbol);
                    break;
                case APIType.SELL:
                    engine.sell(data.order.symbol, data.order.stockType, data.order.price, data.order.qty, data.order.user, APIType.SELL, data.orderId);
                    await redisManager.publishOrder(data.orderId);
                    await redisManager.publishOrderBook(data.order.symbol);
                    break;
                case APIType.OnRamp:
                    userManager.onRamp(data.userId, data.amount);
                    await redisManager.publishRedisPubSub(data.userId, data.amount);
                    break;
                case APIType.CreateUser:
                    userManager.createUser(data);
                    await redisManager.publishRedisPubSub(data, data);
                    break;
                default:
                    throw new Error('Type does not exists');
            }
        } catch (error) {
            console.log(error);
        }
    }
}

main();