import Card from "./card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

function Orderbook() {
    return <Card>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-black font-bold">PRICE</TableHead>
                    <TableHead className="text-right text-black font-normal">QTY AT YES</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            <TableRow>
                    <TableCell>0</TableCell>
                    <TableCell className="text-right">  0</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>0</TableCell>
                    <TableCell className="text-right">  0</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>0</TableCell>
                    <TableCell className="text-right">  0</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>0</TableCell>
                    <TableCell className="text-right">  0</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>0</TableCell>
                    <TableCell className="text-right">  0</TableCell>
                </TableRow>
            </TableBody>
        </Table>

    </Card>
}

export default Orderbook;