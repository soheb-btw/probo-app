import { createClient, RedisClientType } from 'redis';
import {  QUEUE_CHANNEL } from './utils/constants';
import { Market, QueueOrder, QueueResponse } from './utils/types';
import { engine } from './engine';

class RedisManager {
    private queue: RedisClientType;
    private pubSub: RedisClientType;
    private static instance: RedisManager;
    private orderBook: Market;
    private constructor() {
        this.queue = createClient();
        this.pubSub = createClient();
        this.queue.connect();
        this.pubSub.connect();
        this.orderBook = engine.getOrderBook();
    }

    public static getInstance() {
        if (!RedisManager.instance) {
            return this.instance = new RedisManager;
        }
        return this.instance;
    }

    public async getOrderFromQueue(): Promise<QueueOrder> {
        const order: QueueResponse = await this.queue.brPop(QUEUE_CHANNEL, 0);
        return JSON.parse(order.element);
    }

    public publishOrderBook(channel: string) {
        this.pubSub.publish(channel, JSON.stringify(this.orderBook[channel]));
    }
    
    public publishOrder(channel: string){
        this.pubSub.publish(channel, JSON.stringify(`Your order ${channel} has been placed`));
    }
}

export const redisManager = RedisManager.getInstance();