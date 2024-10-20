import { RawData, WebSocket, WebSocketServer } from "ws";
import { createClient } from 'redis';
import { User } from "./user";

class WebSocketManager {
    private server: WebSocketServer;
    private users: Record<number, User>;
    private redisClient: any;

    constructor(port: number) {
        this.server = new WebSocketServer({ port });
        this.users = {};
        this.initialize();
    }

    private async initialize() {
        this.redisClient = await this.connectToRedis();
        this.server.on('connection', (ws) => this.handleConnection(ws));
    }

    private async connectToRedis() {
        const client = createClient();
        await client.connect();
        return client;
    }

    private handleConnection(ws: WebSocket) {
        const userId = this.generateUserId();
        this.users[userId] = new User(ws);

        ws.on('message', (message) => this.handleMessage(message, userId));
        ws.on('close', () => this.handleDisconnect(userId));
    }

    private generateUserId(): number {
        return Math.random();
    }

    private handleMessage(message: RawData, userId: number) {
        const parsedMessage = JSON.parse(message.toString());

        if (parsedMessage.method === 'subscribe') {
            this.subscribeUserToSymbol(parsedMessage.params, userId);
        }
    }

    private subscribeUserToSymbol(symbol: string, userId: number) {
        this.users[userId].subscribe(symbol);

        if (this.isFirstSubscriber(symbol)) {
            this.redisClient.subscribe(symbol, (message:string) => {
                this.broadcastMessageToSubscribers(message, symbol);
            });
        }
    }

    private isFirstSubscriber(symbol: string): boolean {
        return Object.values(this.users).filter(user => user.hasSubscribed(symbol)).length === 1;
    }

    private broadcastMessageToSubscribers(message: any, symbol: string) {
        const msg = JSON.stringify(message);
        Object.values(this.users).forEach(user => {
            if (user.hasSubscribed(symbol)) {
                user.sendMessage(msg);
            }
        });
    }

    private handleDisconnect(userId: number) {
        delete this.users[userId]; 
    }
}

async function main() {
    new WebSocketManager(3001);
}

main();
