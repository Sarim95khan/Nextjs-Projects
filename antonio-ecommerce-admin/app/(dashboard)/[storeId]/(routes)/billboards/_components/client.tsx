'use client'

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { PlusCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const BillboardClient = () => {
    const router = useRouter()
    const params = useParams()
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title="Billboard (0)" description="Create your billboard" />
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add New
                </Button>
            </div>
            <Separator />
        </>)
}

export default BillboardClient;