import { createClient, RedisClientType } from 'redis';
import {  QUEUE_CHANNEL } from './utils/constants';
import { QueueOrder } from './utils/types';


class RedisManager {
    private queue: RedisClientType;
    private pubSub: RedisClientType;
    private static instance: RedisManager;
    private constructor() {
        this.queue = createClient();
        this.pubSub = createClient();
        this.queue.connect();
        this.pubSub.connect();
    }

    public static getInstance() {
        if (!RedisManager.instance) {
            return this.instance = new RedisManager;
        }
        return this.instance;
    }

    public publishAndWaitForResponse( queuePayload: string, pubSubKey: string) {
        return new Promise((res, rej) => {
            this.queue.lPush(QUEUE_CHANNEL, queuePayload);
            this.pubSub.subscribe(pubSubKey, (message) => {
                this.pubSub.unsubscribe(pubSubKey);
                res(message);
            });
        });
    }
}

export const redisManager = RedisManager.getInstance();