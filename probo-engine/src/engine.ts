

import {  APIType, OrderType, PSEUDO, StockType } from "./utils/constants";
import { Market, OrderDetails } from "./utils/types";

const ORDERBOOK: Market = {
    "BTC_USDT_10_Oct_2024_9_30": {
        "yes": {
        },
        "no": {

        }
    }
}

class Engine {
    private orderBook: Market;
    private static instance: Engine;
    private constructor() {
        this.orderBook = ORDERBOOK;
    }

    public static getInstance() {
        if (!Engine.instance) {
            return Engine.instance = new Engine();
        }
        return Engine.instance;
    }

    private placeBuyOrder(market: string, stockType: StockType, buyPrice: string, quantity: number, user: string, orderId: string): void {
        const stock = this.orderBook[market][stockType];
        if (!stock[buyPrice]) {
            this.placePseudoSellOrder(market, stockType, buyPrice, quantity, user, orderId);
            return;
        }
        if (stock[buyPrice].orders.pseudo && quantity !== 0) {
            quantity = this.calculateOrder(stock, buyPrice, PSEUDO, quantity);
        }
        if (stock[buyPrice].orders.sell && quantity !== 0) {
            quantity = this.calculateOrder(stock, buyPrice, APIType.SELL, quantity);
        }
        if (quantity > 0) {
            this.placePseudoSellOrder(market, stockType, buyPrice, quantity, user, orderId);
        }
    }

    private calculateOrder(stock: Record<string, OrderDetails>, buyPrice: string, type: OrderType, quantity: number): number {
        if (!stock[buyPrice].orders[type]) {
            return quantity;
        }
        Object.keys(stock[buyPrice].orders[type]).forEach((orderId) => {

            if (!(stock[buyPrice].orders[type] && Object.keys(stock[buyPrice].orders[type]).length > 0)) { return }

            while (stock[buyPrice].orders[type][orderId]) {
                if (stock[buyPrice].orders[type][orderId].qty > quantity) {
                    stock[buyPrice].orders[type][orderId].qty -= quantity;
                    stock[buyPrice].total -= quantity;
                    quantity = 0;
                    return quantity;
                }
                else if (stock[buyPrice].orders[type][orderId].qty === quantity) {
                    stock[buyPrice].total -= quantity;
                    quantity = 0;
                    delete stock[buyPrice].orders[type][orderId];
                } else {
                    quantity -= stock[buyPrice].orders[type][orderId].qty;
                    stock[buyPrice].total -= stock[buyPrice].orders[type][orderId].qty;
                    delete stock[buyPrice].orders[type][orderId];
                }
            }
        });

        if (!(stock[buyPrice].total === 0)) {
            return quantity;
        }
        delete stock[buyPrice];

        if (stock[buyPrice] && stock[buyPrice].orders.sell && Object.keys(stock[buyPrice].orders.sell).length === 0) {
            delete stock[buyPrice].orders.sell;
        }
        return quantity;
    }

    private checkPseudoOrderExist(market: string, stockType: StockType, sellingPrice: string, qty: number, user: string, orderId: string) {
        const pseudoStockType: StockType = this.getPseudoStock(stockType);
        const sellPrice = this.getPseudoPrice(sellingPrice);
        const priceExists = this.orderBook[market][pseudoStockType][sellPrice];
        const stock = this.orderBook[market][pseudoStockType];
        return { priceExists, stock, sellPrice };
    }

    private placeSellOrder(market: string, stock: StockType, sellingPrice: string, qty: number, user: string, type: OrderType, orderId: string) {
        let price = this.orderBook[market][stock][sellingPrice];
        if (price && price.orders[type]) {
            price.orders[type] = { ...price.orders[type], [orderId]: { user, qty } }
            price.total += qty;
            return;
        }
        if (price && price.orders) {
            this.orderBook[market][stock][sellingPrice] = { total: price.total + qty, orders: { ...price.orders, [type]: { [orderId]: { user, qty } } } };
            return
        }
        this.orderBook[market][stock][sellingPrice] = { total: qty, orders: { [type]: { [orderId]: { user, qty } } } };
    }

    private placePseudoSellOrder(market: string, stockType: StockType, buyPrice: string, quantity: number, user: string, orderId: string) {
        const pseudoStockType: StockType = this.getPseudoStock(stockType);
        const sellPrice = this.getPseudoPrice(buyPrice);
        this.placeSellOrder(market, pseudoStockType, sellPrice, quantity, user, PSEUDO, orderId)
    }

    getPseudoPrice(price: string) {
        return (10 - Number(price)).toString();
    }

    getPseudoStock(stock: StockType) {
        return stock === 'yes' ? 'no' : 'yes';
    }

    getOrderBook() {
        return this.orderBook;
    }

    buy(symbol: string, stockType: StockType, price: string, quantity: number, user: string, orderId: string) {
        engine.placeBuyOrder(symbol, stockType, price, quantity, user, orderId);
    }

    sell(symbol: string, stockType: StockType, price: string, qty: number, user: string, type: OrderType, orderId: string) {
        let remainingQty = qty;
        this.placeSellOrder(symbol, stockType, price, qty, user, type, orderId);
        const { priceExists, stock, sellPrice } = this.checkPseudoOrderExist(symbol, stockType, price, qty, user, orderId);
        if (priceExists) {
            remainingQty = this.calculateOrder(stock, sellPrice, PSEUDO, qty);
        }
        if (remainingQty > 0) {
            this.placeSellOrder(symbol, stockType, price, remainingQty, user, APIType.SELL, orderId);
        }
    }

}

export const engine = Engine.getInstance(); 