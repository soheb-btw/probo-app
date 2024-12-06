import PlaceOrder from '@/components/placeOrder';
import '../styles/gradients.css';
import Orderbook from '@/components/orderbook';
import EventChart from '@/components/EventChart';

interface TradeProps { }

const Trade: React.FC<TradeProps> = () => {
  return (
    <div className="flex px-20 gap-10">
      <div className='flex flex-col gap-5 flex-grow'>
        <Orderbook />
        <EventChart />
      </div>
      <div className="w-[400px]">
        <PlaceOrder />
      </div>
    </div>
  );
};

export default Trade;
