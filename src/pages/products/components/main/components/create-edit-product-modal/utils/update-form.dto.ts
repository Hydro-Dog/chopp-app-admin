import { ProductImage } from '@store/index';
import { UploadFile } from 'antd';

type Args = {
  title: string;
  description: string;
  price: number;
  newFiles?: UploadFile[];
  initialImages?: ProductImage[];
  categoryId: string;
};

export const updateFormDto = ({
  title,
  description,
  price,
  newFiles,
  initialImages,
  categoryId,
}: Args) => {
  const formData = new FormData();
  if (newFiles?.length) {
    newFiles.forEach((file) => {
      if (file.originFileObj) {
        formData.append('newFiles', file.originFileObj);
      }
    });
  }
  if (initialImages?.length) {
    initialImages.forEach((item) => {
      formData.append('initialImages', JSON.stringify(item));
    });
  }
  formData.append('title', title);
  formData.append('description', description);
  formData.append('price', String(price));
  formData.append('categoryId', categoryId);

  return formData;
};
