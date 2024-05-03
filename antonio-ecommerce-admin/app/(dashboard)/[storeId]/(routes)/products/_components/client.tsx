'use client'

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";
import { PlusCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ProductColumn, columns } from "./table-columns";
import ApiList from "@/components/ui/api-list";

interface ProductClientProps {
    data: ProductColumn[]
}

const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
    const router = useRouter()
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Product (${data.length})`} description="Create your product" />
                <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API calls for Products" />
            <Separator />
            <ApiList enetityleIdName="productId" entityName="products" />
        </>)
}

export default ProductClient;