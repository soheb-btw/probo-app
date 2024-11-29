import Orderbook from "@/components/orderbook";
import PlaceOrder from "@/components/placeOrder";
import TimelineChart from "@/components/timelineChart";

const Market = () => {
    return <div className="flex justify-around gap-10 p-10">
        <div className="flex-grow flex flex-col gap-5">
            <Orderbook />
            <TimelineChart />
        </div>
        <div>
            <PlaceOrder />
        </div>
    </div>
}

export default Market;