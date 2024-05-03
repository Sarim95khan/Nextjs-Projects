import prismadb from "@/lib/prismadb";
import { ProductColumn } from "./_components/table-columns";
import { format } from "date-fns";
import { PriceFormatter } from "@/lib/utils";
import ProductClient from "./_components/client";

const ProductPage = async ({ params }: { params: { storeId: string } }) => {
    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            category: true,
            size: true,
            color: true
        }
        ,
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedProduct: ProductColumn[] = products.map((item) => ({
        id: item.id,
        name: item.name,
        price: PriceFormatter.format(item.price.toNumber()),
        isArchived: item.isArchived,
        isFeatured: item.isFeatured,
        size: item.size.name,
        color: item.color.name,
        category: item.category.name,
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }));
    return (
        <div className="flex-col ">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductClient data={formattedProduct} />
            </div>

        </div>);
}

export default ProductPage;