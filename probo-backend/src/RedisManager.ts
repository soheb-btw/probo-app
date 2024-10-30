import { createClient, RedisClientType } from 'redis';
import {  QUEUE_CHANNEL } from './utils/constants';
import { QueueData } from './utils/types';

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

    public publishAndWaitForResponse( queuePayload: QueueData, pubSubKey: string) {
        return new Promise((res, rej) => {
            this.pubSub.subscribe(pubSubKey, (message) => {
                this.pubSub.unsubscribe(pubSubKey);
                res(message);
            });
            this.queue.lPush(QUEUE_CHANNEL, JSON.stringify(queuePayload));
        });
    }
}

export const redisManager = RedisManager.getInstance();