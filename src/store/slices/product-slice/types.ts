import { UploadFile } from 'antd';

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: number;
};

export type CreateProductDTO = Omit<Product, 'id' | 'images'> & { images: UploadFile[] };
