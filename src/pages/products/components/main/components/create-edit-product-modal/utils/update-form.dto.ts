import { ProductImage } from '@store/index';
import { UploadFile } from 'antd';

type Args = {
  title: string;
  description: string;
  price: number;
  fileList?: UploadFile[];
  initialImages?: ProductImage[];
  categoryId: string;
};

export const updateFormDto = ({
  title,
  description,
  price,
  fileList,
  initialImages,
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
