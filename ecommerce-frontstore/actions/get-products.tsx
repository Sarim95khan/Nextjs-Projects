import { Category, Product } from '@/types';
import qs from 'query-string';
const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface QueryProps {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}
const getProducts = async (query: QueryProps): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      categoryId: query.categoryId,
      colorId: query.colorId,
      sizeId: query.sizeId,
      isFeatured: query.isFeatured,
    },
  });
  const res = await fetch(url);
  return res.json();
};

export default getProducts;
