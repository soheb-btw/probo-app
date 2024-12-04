import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const PlaceOrder = () => {
    const [selectedOption, setSelectedOption] = useState<'yes' | 'no' | null>(null);
    const location = useLocation();
    const [price, setPrice] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('');


    const handlePlaceOrder = () => {
        console.log('Order placed:', {
            option: selectedOption,
            price,
            quantity
        });
    };


    return (
        <div className="w-1/2 p-4">
            <div className="flex flex-col gap-y-4 bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
                {/* Yes/No Toggle */}
                <div className="flex rounded-full border border-gray-300">
                    <button
                        onClick={() => setSelectedOption('yes')}
                        className={`flex-1 py-2 rounded-full text-center transition-colors ${selectedOption === 'yes'
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-600'
                            }`}
                    >
                        Yes ₹4.5
                    </button>
                    <button
                        onClick={() => setSelectedOption('no')}
                        className={`flex-1 py-2 rounded-full text-center transition-colors ${selectedOption === 'no'
                            ? 'bg-red-500 text-white'
                            : 'text-gray-600'
                            }`}
                    >
                        No ₹5.5
                    </button>
                </div>

                <div className='flex flex-col gap-y-4 border border-gray-300 p-4 rounded-lg'>
                    {/* Price Input */}
                    <div className="flex justify-between">
                        <label className="block text-gray-800 text-lg font-medium">
                            Price
                            <p className="text-gray-500 text-sm">6 qty available</p>
                        </label>
                        <div className="flex items-center bg-white border rounded-lg px-4">
                            <button className="hover:bg-gray-200 rounded bg-gray-200 text-blue-500 px-2" onClick={() => setPrice(prev => (Number(prev) - 0.5).toString())}>
                                <span className="text-xl">−</span>
                            </button>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="flex-1 bg-transparent text-center max-w-[100px] text-lg font-medium focus:outline-none"
                                placeholder="0.0"
                            />
                            <button className="hover:bg-gray-200 rounded bg-gray-200 text-blue-500 px-2" onClick={() => setPrice(prev => (Number(prev) + 0.5).toString())}>
                                <span className="text-xl">+</span>
                            </button>
                        </div>
                    </div>

                    {/* Quantity Input */}
                    <div className="flex justify-between">
                        <label className="block text-gray-800 text-lg font-medium">
                            Quantity
                            <p className="text-gray-500 text-sm">⚖️</p>
                        </label>
                        <div className="flex items-center bg-white border rounded-lg px-4">
                            <button className="hover:bg-gray-200 rounded bg-gray-200 text-blue-500 px-2" onClick={() => setQuantity(prev => Math.max(0, Number(prev) - 1).toString())}>
                                <span className="text-xl">−</span>
                            </button>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="flex-1 bg-transparent text-center max-w-[100px] text-lg font-medium focus:outline-none"
                                placeholder="1"
                            />
                            <button className="hover:bg-gray-200 rounded bg-gray-200 text-blue-500 px-2" onClick={() => setQuantity(prev => (Number(prev) + 1).toString())}>
                                <span className="text-xl">+</span>
                            </button>
                        </div>
                    </div>

                    {/* Price Summary */}
                    <div className="flex justify-around">
                        <div>
                            <p className="text-xl font-medium">₹4.5</p>
                            <p className="text-gray-500">You put</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-medium text-green-500">₹10.0</p>
                            <p className="text-gray-500">You get</p>
                        </div>
                    </div>

                </div>


                {/* Advanced Options */}
                {/* <button className="w-full text-gray-500 mb-6 flex items-center justify-center gap-2">
                    Advanced Options
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button> */}

                {/* Place Order Button */}
                <button
                    onClick={handlePlaceOrder}
                    disabled={!selectedOption || !price || !quantity}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium text-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    Place order
                </button>
            </div>
        </div>
    );
};

export default PlaceOrder;
