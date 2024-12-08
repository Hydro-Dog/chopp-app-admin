import { UploadFile } from 'antd';

export type Product = {
  id: string;
  title: string;
  description: number;
  price: number;
  images: string[];
};

export type CreateProductDTO = Omit<Product, 'id' | 'images'> & { images: UploadFile[] };
