import getProduct from '@/actions/get-product';
import getProducts from '@/actions/get-products';
import Gallery from '@/components/gallery';
import ProductList from '@/components/product-list';
import Cont from '@/components/ui/container';

interface ProductPageProps {
  params: {
    productId: string;
  };
}
export const revalidate = 0;

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);
  const suggestedProducts = await getProducts({
    categoryId: product?.category.id,
  });

  return (
    <div className="bg-white">
      <Cont>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={product.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">Infor</div>
          </div>
          <hr className="my-10" />
          <ProductList title="Related Items" product={suggestedProducts} />
        </div>
      </Cont>
    </div>
  );
};

export default ProductPage;
