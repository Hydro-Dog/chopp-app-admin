import { Product } from '@shared/index';

type Args = {
  prevProducts: Product[];
  updatedProduct: Product;
  categoryId: number | string;
};

// TODO: удалить, не используется
export const updateProductsList = ({ prevProducts, updatedProduct, categoryId }: Args) => {
  if (String(updatedProduct.category.id) !== String(categoryId)) {
    return prevProducts.filter((product) => product.id !== updatedProduct.id);
  }

  return prevProducts.map((product) =>
    product.id === updatedProduct.id ? updatedProduct : product,
  );
};
