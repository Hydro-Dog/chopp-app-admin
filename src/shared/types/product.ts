import { PRODUCT_STATE } from '@shared/enum';
import { Category } from './category';
import { ProductImage } from './product-image';

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  images: ProductImage[];
  category: Category;
  state: PRODUCT_STATE;
  categoryId: number;
  imagesOrder: number[];
  createdAt: string;
  updatedAt: string;
};
