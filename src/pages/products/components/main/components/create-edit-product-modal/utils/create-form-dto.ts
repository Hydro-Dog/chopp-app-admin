import { UploadFile } from 'antd';

type Args = {
  title: string;
  description: string;
  price: number;
  fileList: UploadFile[];
  categoryId: string;
};

export const createFormDto = ({ title, description, price, fileList, categoryId }: Args) => {
  const formData = new FormData();
  fileList.forEach((file) => {
    if (file.originFileObj) {
      formData.append('images', file.originFileObj);
    }
  });
  formData.append('title', title);
  formData.append('description', description);
  formData.append('price', String(price));
  formData.append('categoryId', categoryId || '');

  return formData;
};