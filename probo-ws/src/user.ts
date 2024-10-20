import { WebSocket } from "ws";

export class User {
    private ws: WebSocket;
    private symbols: string[];

    constructor(ws: WebSocket) {
        this.ws = ws;
        this.symbols = [];
    }

    public subscribe(symbol: string) {
        this.symbols.push(symbol);
    }

    public hasSubscribed(symbol: string): boolean {
        return this.symbols.includes(symbol);
    }

    public sendMessage(message: string) {
        this.ws.send(message);
    }
}

