import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Cont from "@/components/ui/container";

export const revalidate = 0

const HomePage = async () => {
    const billboard = await getBillboard('577ec0f5-9579-4fc9-a9df-2174dcf20111')
    const products = await getProducts({ isFeatured: true })
    return (
        <Cont >
            <div className="space-y-10 pb-10">
                <Billboard data={billboard} />
                <ProductList title="Featured Products" product={products} />
            </div>
        </Cont>
    );
}

export default HomePage;