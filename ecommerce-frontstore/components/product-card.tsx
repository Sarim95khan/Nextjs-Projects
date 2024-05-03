'use client'

import { Product } from "@/types";
import Image from "next/image";
import IconButton from "./ui/icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "./ui/currency";
import { useRouter } from "next/navigation";

interface ProductCardProps {
    data: Product
}



const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
    const router = useRouter()
    const handleClick = () => {
        router.push(`/products/${data.id}`)
    }

    return (
        <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
            <div className="aspect-square rounded-xl bg-gray-100 relative">
                <Image
                    src={data?.images?.[0]?.url}
                    alt="image"
                    fill
                    className="aspect-square object-cover rounded-md"
                />
                <div className="transition absolute w-full px-6 bottom-5 opacity-0 group-hover:opacity-100">
                    <div className="flex justify-center gap-x-6">
                        <IconButton
                            onClick={() => { }}
                            icon={<Expand size={20}
                                className="text-gray-600" />}
                            className="text-black"
                        />
                        <IconButton
                            onClick={() => { }}
                            icon={<ShoppingCart size={20}
                                className="text-gray-600" />}
                            className="text-black"
                        />
                    </div>
                </div>

            </div>
            <div>
                <p className="text-lg font-semibold">
                    {data.name}
                </p>
                <p className="text-gray-500 text-sm ">
                    {data.category?.name}
                </p>
            </div>
            <div>
                <Currency value={data?.price} />
            </div>

        </div>);
}

export default ProductCard;