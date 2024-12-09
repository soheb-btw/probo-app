import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from './card';

interface ChartData {
  date: string;
  value: number;
  volume: number;
  timestamp: number;
}

type TimePeriod = '1h' | '1w' | '2w' | 'all';

const generateData = (): ChartData[] => {
  const now = Date.now();
  const twoWeeksData: ChartData[] = [];
  
  // Generate 2 weeks of data points
  for (let i = 14; i >= 0; i--) {
    const date = new Date(now - i * 24 * 60 * 60 * 1000);
    twoWeeksData.push({
      date: date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }),
      value: 25 + Math.random() * 30, // Random value between 25-55
      volume: 20 + Math.random() * 35, // Random volume between 20-55
      timestamp: date.getTime()
    });
  }
  return twoWeeksData;
};

const data = generateData();

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-medium">Yes {payload[0].value.toFixed(1)}%</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    );
  }
  return null;
};

const EventChart = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('1w');

  const getFilteredData = () => {
    const now = Date.now();
    switch (timePeriod) {
      case '1h':
        return data.filter(d => d.timestamp >= now - 60 * 60 * 1000);
      case '1w':
        return data.filter(d => d.timestamp >= now - 7 * 24 * 60 * 60 * 1000);
      case '2w':
        return data.filter(d => d.timestamp >= now - 14 * 24 * 60 * 60 * 1000);
      default:
        return data;
    }
  };

  const filteredData = getFilteredData();

  const timeButtons: { label: TimePeriod; text: string }[] = [
    { label: '1h', text: '1h' },
    { label: '1w', text: '1w' },
    { label: '2w', text: '2w' },
    { label: 'all', text: 'All' },
  ];

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold">YES</h2>
                <p className="text-sm text-blue-600">20% Chance</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 text-sm">
            {timeButtons.map(({ label, text }) => (
              <button
                key={label}
                onClick={() => setTimePeriod(label)}
                className={`${
                  timePeriod === label
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {text}
              </button>
            ))}
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={filteredData}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorValue)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-12 gap-2">
          {filteredData.map((item, index) => (
            <div key={index} className="flex flex-col gap-1">
              <div className="h-20 flex items-end gap-1">
                <div
                  className="w-full bg-blue-100"
                  style={{ height: `${item.volume}%` }}
                ></div>
                <div
                  className="w-full bg-red-100"
                  style={{ height: `${Math.max(0, 100 - item.volume)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default EventChart;
