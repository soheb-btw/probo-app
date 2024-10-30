import { BuyOrSell, OrderType, StockType } from "./constants";

export interface OrderData {
  symbol: string;
  stockType: StockType;
  price: string;
  qty: number;
  user: string;
  orderType?: OrderType;
  // orderId: string,
}

export interface OrderDetails {
  total: number;
  orders: Orders;
}

export interface Orders {
  sell?: { [key: string]: { user: string; qty: number } };
  pseudo?: { [key: string]: { user: string; qty: number } };
}

export interface MarketData {
  yes: Record<string, OrderDetails>;
  no: Record<string, OrderDetails>;
}

export interface Market {
  [key: string]: MarketData;
}

export interface QueueOrder {
  orderId: string;
  buyOrSell: BuyOrSell;
  order: OrderData;
}

export interface QueueResponse {
  key: string;
  element: string;
}

export interface INRBalance {
    [userId: string]: UserBalance
}

interface UserBalance{
    balance: number,
    locked: number
}

export interface StockBalance{
  [userId: string] : {
    [symbol: string]: {
      yes : {
        quantity: number,
        locked: number
      },
      no: {
        quantity: number,
        locked: number
      }
    }
  }
}