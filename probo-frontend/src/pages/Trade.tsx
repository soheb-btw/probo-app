import PlaceOrder from '@/components/placeOrder';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/gradients.css';

interface OrderBookEntry {
  price: number;
  qtyYes: number;
  qtyNo: number;
}

interface TradeProps {}

const Trade: React.FC<TradeProps> = () => {
 
  const orderBookData: OrderBookEntry[] = [
    { price: 4.5, qtyYes: 6, qtyNo: 9 },
    { price: 5.5, qtyYes: 5, qtyNo: 3 },
    { price: 6.0, qtyYes: 50, qtyNo: 4 },
    { price: 6.5, qtyYes: 49, qtyNo: 2 },
    { price: 7.0, qtyYes: 130, qtyNo: 1 },
  ];

  // Calculate maximum quantities for scaling
  const maxYesQty = Math.max(...orderBookData.map(entry => entry.qtyYes));
  const maxNoQty = Math.max(...orderBookData.map(entry => entry.qtyNo));

  return (
    <div className="flex bg-gray-100 p-20 text-sm">
      <div className="w-1/2 p-8 bg-white shadow-lg rounded-lg">
        <div className="space-y-2">
          <div className="flex gap-4 mb-6">
            <h2 className="text-lg font-semibold border-b-2 border-black">Order Book</h2>
          </div>

          <div className="flex gap-4">
            {/* YES Table */}
            <div className="flex-1">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-semibold pb-2">PRICE</th>
                    <th className="text-right font-semibold pb-2">
                      QTY AT <span className="text-blue-500">YES</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderBookData.map((entry, index) => (
                    <tr 
                      key={`yes-${index}`} 
                      className="hover:bg-gray-50 bg-gradient-yes border-b-2 border-gray-200"
                      style={{ 
                        '--gradient-width': `${(entry.qtyYes / maxYesQty) * 100}%`
                      } as React.CSSProperties}
                    >
                      <td className="py-1 relative z-10">{entry.price.toFixed(1)}</td>
                      <td className="text-right py-1 relative z-10">{entry.qtyYes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* NO Table */}
            <div className="flex-1">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-semibold pb-2">PRICE</th>
                    <th className="text-right font-semibold pb-2">
                      QTY AT <span className="text-red-500">NO</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderBookData.map((entry, index) => (
                    <tr 
                      key={`no-${index}`} 
                      className="hover:bg-gray-50 bg-gradient-no relative"
                      style={{ 
                        '--gradient-width': `${(entry.qtyNo / maxNoQty) * 100}%`
                      } as React.CSSProperties}
                    >
                      <td className="py-1 relative z-10">{(entry.price + 0.5).toFixed(1)}</td>
                      <td className="text-right py-1 relative z-10">{entry.qtyNo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

     <PlaceOrder/>
    </div>
  );
};

export default Trade;
