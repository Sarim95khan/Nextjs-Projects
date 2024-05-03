'use client'

import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./table-columns";

interface OrderClientProps {
    data: OrderColumn[]
}

const OrderClient: React.FC<OrderClientProps> = ({ data }) => {


    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Order (${data.length})`} description="Orders List" />
            </div>
            <Separator />
            <DataTable searchKey="products" columns={columns} data={data} />
        </>)
}

export default OrderClient;