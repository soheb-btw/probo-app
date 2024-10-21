import { BuyOrSell, OrderType, StockType } from "./constants";

export interface OrderData {
    symbol: string,
    stockType: StockType,
    price: string,
    qty: number,
    user: string,
    orderType?: OrderType,
    // orderId: string,
}

export interface OrderDetails {
    total: number;
    orders: Orders;
}

export interface Orders {
    sell?: { [key: string]: { user: string, qty: number } }
    pseudo?: { [key: string]: { user: string, qty: number } } //Record<string, number>;
}

export interface MarketData {
    yes: Record<string, OrderDetails>;
    no: Record<string, OrderDetails>;
}

export interface Market {
    [key: string]: MarketData;
}

export interface QueueData{
    type: string;
    data: Object;
}
