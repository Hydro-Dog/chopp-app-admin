import { ORDER_STATE, Product } from '@shared/index';
import { UploadFile } from 'antd';

export type CreateProductDTO = Omit<Product, 'id' | 'images'> & { images: UploadFile[] };
export type UpdateProductVisibilityDTO = { state: ORDER_STATE; id: number };
