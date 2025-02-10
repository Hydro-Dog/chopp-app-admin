import { ProductImage } from '@shared/index';
import { UploadFile } from 'antd';

type Args = {
  title: string;
  description: string;
  price: number;
  fileList?: UploadFile[];
  remainingOldImages?: ProductImage[];
  categoryId: string;
};

export const updateFormDto = ({
  title,
  description,
  price,
  fileList,
  remainingOldImages,
  categoryId,
}: Args) => {
  const formData = new FormData();
  if (fileList?.length) {
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append('images', file.originFileObj);
      }
    });
  }

  if (remainingOldImages?.length) {
    remainingOldImages.forEach((item) => {
      formData.append('remainingOldImages', JSON.stringify(item));
    });
  }
  formData.append('title', title);
  formData.append('description', description);
  formData.append('price', String(price));
  formData.append('categoryId', categoryId);

  return formData;
};
