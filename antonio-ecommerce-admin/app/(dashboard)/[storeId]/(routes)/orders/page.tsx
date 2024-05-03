import prismadb from "@/lib/prismadb";
import BillboardClient from "./_components/client";
import { OrderColumn } from "./_components/table-columns";
import { format } from "date-fns";
import { PriceFormatter } from "@/lib/utils";

const OderPage = async ({ params }: { params: { storeId: string } }) => {
    const orders = await prismadb.order.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedOrders: OrderColumn[] = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        address: item.address,
        products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
        totalPrice: PriceFormatter.format(item.orderItems.reduce((total, item) => {
            return total + Number(item.product.price)
        }, 0)),
        isPaid: item.isPaid,
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }));
    return (
        <div className="flex-col ">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient data={formattedOrders} />
            </div>

        </div>);
}

export default OderPage;