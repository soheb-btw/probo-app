import PlaceOrder from '@/components/placeOrder';
import '../styles/gradients.css';
import Orderbook from '@/components/orderbook';
import EventChart from '@/components/EventChart';

interface TradeProps { }

const Trade: React.FC<TradeProps> = () => {
  return (
    <div className="flex px-[10%] gap-5">
      <div className='flex flex-col gap-5 flex-grow max-w-[820px]'>
        <Orderbook />
        <EventChart />
      </div>
      <div className="w-[400px] h-fit sticky top-[11.5%]">
        <PlaceOrder />
      </div>
    </div>
  );
};

export default Trade;
