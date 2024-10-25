import { INRBalance, StockBalance } from "./utils/types";

const STOCK_BALANCES = {
    user1: {
        "BTC_USDT_10_Oct_2024_9_30": {
            "yes": {
                "quantity": 1,
                "locked": 0
            }
        }
    },
    user2: {
        "BTC_USDT_10_Oct_2024_9_30": {
            "no": {
                "quantity": 3,
                "locked": 4
            }
        }
    }
}

const INR_BALANCES = {
    "user1": {
        balance: 1000,
        locked: 0
    },
    "user2": {
        balance: 20,
        locked: 10
    }
};



class UserManager{
    private static instance: UserManager;
    private inrBalance: INRBalance;
    private stockBalance: StockBalance;

    private constructor(){
        this.inrBalance = INR_BALANCES;
        this.stockBalance = STOCK_BALANCES;
    }

    static getInstance(){
        if(!UserManager.instance){
            return UserManager.instance = new UserManager();
        }
        return UserManager.instance;
    }

    
    onRamp(userId: string, amount: number){
        if(this.inrBalance[userId]){
            this.inrBalance[userId].balance += amount;
        }
    }

    createUser(userId:string){
        this.inrBalance[userId] = {
            balance: 0,
            locked: 0
        }
        console.log(INR_BALANCES);
    }
}

export const userManager = UserManager.getInstance();