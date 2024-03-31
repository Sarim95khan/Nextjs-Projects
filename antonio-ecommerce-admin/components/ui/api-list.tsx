'use client'

import useOrigin from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { ApiAlert } from "./api-alert";

interface ApiListPros {
    entityName: string;
    enetityleIdName: string
}
const ApiList: React.FC<ApiListPros> = ({ entityName, enetityleIdName }) => {
    const params = useParams();
    const origin = useOrigin();

    const baseUrl = `${origin}/api/${params.storeId}`;

    return (
        <>
            <ApiAlert title='GET'
                description={`${baseUrl}/${entityName}`}
                variant="public"
            />
            <ApiAlert title='GET'
                description={`${baseUrl}/${entityName}/${enetityleIdName}`}
                variant="public"
            />
            <ApiAlert title='POST'
                description={`${baseUrl}/${entityName}`}
                variant="admin"
            />
            <ApiAlert title='PATCH'
                description={`${baseUrl}/${entityName}/${enetityleIdName}`}
                variant="admin"
            />
            <ApiAlert title='DELETE'
                description={`${baseUrl}/${entityName}/${enetityleIdName}`}
                variant="admin"
            />
        </>);
}

export default ApiList;