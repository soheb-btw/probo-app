import Card from "./card";
import { Button } from "./ui/button";

export default function PlaceOrder() {
    return <Card>
        <div className="flex gap-y-2.5 flex-col">
            <div className="flex gap-2.5">
                <Button>Yes $0.5</Button>
                <Button>No $9.5</Button>
            </div>
            <Card>
                <div className="flex">
                    <div className="flex flex-col">
                        <span> Price </span>
                        <span>13123 qty available</span>
                    </div>
                    <div className="flex gap-3.5 items-center border p-2 rounded-xl">
                    <Button>+</Button>
                    4.5
                    <Button>-</Button>
                    </div>
                </div>
                <div>quantity</div>
                <div>you put</div>
            </Card>
        </div>
    </Card>
}