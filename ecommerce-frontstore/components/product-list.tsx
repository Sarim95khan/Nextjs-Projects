import { Product } from "@/types";
import NoResult from "./ui/no-results";
import ProductCard from "./product-card";

interface ProductListProps {
    title: string;
    product: Product[]
}

const ProductList: React.FC<ProductListProps> = ({ title, product }) => {

    return (
        <div className="space-y-4">
            <h3 className="text-3xl font-bold">{title}</h3>
            {product.length === 0 && <NoResult />}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2">
                {product.map((item) => (
                    <ProductCard key={item.id} data={item} />
                ))}
            </div>
        </div>
    );
}

export default ProductList;