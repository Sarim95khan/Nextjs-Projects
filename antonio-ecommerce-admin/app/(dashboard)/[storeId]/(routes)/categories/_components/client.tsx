'use client'

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { PlusCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { CategoryColumn, columns } from "./table-columns";
import ApiList from "@/components/ui/api-list";

interface CategoryClientProps {
    data: CategoryColumn[]
}

const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
    const router = useRouter()
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Categories (${data.length})`} description="Create your Category" />
                <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API calls for Categories" />
            <Separator />
            <ApiList enetityleIdName="categoryId" entityName="categories" />
        </>)
}

export default CategoryClient;