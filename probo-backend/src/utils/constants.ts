
export type OrderType = 'sell' | 'pseudo';
export type StockType = 'yes' | 'no';
export type BuyOrSell = 'buy' | 'sell';

export const PSEUDO = 'pseudo';
// export const SELL: BuyOrSell = 's/ell';
// export const BUY: BuyOrSell = 'buy';

export const QUEUE_CHANNEL = 'queue';

export enum APIType{
    BUY = 'buy',
    SELL = 'sell',
    OnRamp = 'onramp',
    CreateUser = 'createUser'
}

