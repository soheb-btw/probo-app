import { OrderType, StockType } from "./utils/constants";
import { INRBalance, StockBalance } from "./utils/types";

export const STOCK_BALANCES = {
    '111': {
        "BTC_USDT_10_Oct_2024_9_30": {
            yes: {
                quantity: 0,
                locked: 0
            },
            no: {
                quantity: 0,
                locked: 0
            }
        }
    },
    '121': {
        "BTC_USDT_10_Oct_2024_9_30": {
            yes: {
                quantity: 0,
                locked: 0
            },
            no: {
                quantity: 0,
                locked: 8
            }
        }
    }
}

export const INR_BALANCES = {
    "121": {
        balance: 0,
        locked: 0
    },
    "111": {
        balance: 3200,
        locked: 0
    },
};



class UserManager {
    private static instance: UserManager;
    private inrBalance: INRBalance;
    private stockBalance: StockBalance;

    private constructor() {
        this.inrBalance = INR_BALANCES;
        this.stockBalance = STOCK_BALANCES;
    }

    static getInstance() {
        if (!UserManager.instance) {
            return UserManager.instance = new UserManager();
        }
        return UserManager.instance;
    }


    onRamp(userId: string, amount: number) {
        if (this.inrBalance[userId]) {
            this.inrBalance[userId].balance += amount;
        }
    }

    createUser(userId: string) {
        this.inrBalance[userId] = {
            balance: 0,
            locked: 0
        }
    }

    createUserStockBal(userId: string, symbol: string) {
        this.stockBalance[userId] = {
            [symbol]: {
                yes: {
                    quantity: 0,
                    locked: 0
                },
                no: {
                    quantity: 0,
                    locked: 0
                }
            }
        }
    }

    completedOrders(seller: string, buyer: string, buyerQty: number, market: string, stockType: StockType, buyPrice: string, type: OrderType) {
        if (!this.stockBalance[seller]) {
            userManager.createUserStockBal(seller, market);
        }

        if (!this.stockBalance[buyer]) {
            userManager.createUserStockBal(buyer, market);
        }

        if (type === 'pseudo') {
            const type = stockType === 'yes' ? 'no' : 'yes';
            const sellerStock = this.stockBalance[seller][market][type];
            const sellerBalance = this.inrBalance[seller];

            sellerStock.quantity += buyerQty;
            sellerBalance.locked -= (buyerQty * (10 - Number(buyPrice))) * 100;
        }

        if (type === 'sell') {
            const sellerStock = this.stockBalance[seller][market][stockType];
            const sellerBalance = this.inrBalance[seller];

            sellerStock.locked -= buyerQty;
            sellerBalance.balance += (buyerQty * Number(buyPrice)) * 100;
        }

    }

    lockBuyerBalance(user: string, buyPrice: string, remainingQty: number) {
        this.inrBalance[user].balance -= (remainingQty * Number(buyPrice)) * 100;
        this.inrBalance[user].locked += (remainingQty * Number(buyPrice)) * 100;
    }

    updateBuyerBalance(user: string, buyPrice: string, quantity: number, remainingQty: number, symbol : string, stockType: StockType) {
        this.inrBalance[user].balance -= ((quantity - remainingQty) * Number(buyPrice)) * 100;
        this.stockBalance[user][symbol][stockType].quantity += (quantity - remainingQty);
    }

    lockSellerStock(user: string, symbol: string, stockType: StockType, remainingQty: number) {
        this.stockBalance[user][symbol][stockType].quantity -= remainingQty;
        this.stockBalance[user][symbol][stockType].locked += remainingQty;
    }

    updateSellerStock(user: string, buyPrice: string, quantity: number, remainingQty: number, symbol : string, stockType: StockType) {
        this.stockBalance[user][symbol][stockType].quantity -= (quantity - remainingQty);
        this.inrBalance[user].balance += ((quantity - remainingQty) * Number(buyPrice)) * 100;
    }
}

export const userManager = UserManager.getInstance();