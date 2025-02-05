import { Product } from '@shared/index';
import { UploadFile } from 'antd';

export type CreateProductDTO = Omit<Product, 'id' | 'images'> & { images: UploadFile[] };
