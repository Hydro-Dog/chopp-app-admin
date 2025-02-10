import { Category } from './category';
import { ProductImage } from './product-image';

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  images: ProductImage[];
  category: Category;
  isVisible: boolean;
};
