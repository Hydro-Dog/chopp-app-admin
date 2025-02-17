import { useEffect, useState } from 'react';
import { UseFormReset } from 'react-hook-form';
import { Product } from '@shared/types';
import { getBase64 } from '@shared/utils';
import { UploadFile, UploadProps } from 'antd';
import { t } from 'i18next';

type ProductFormType =
  | {
      title: string;
      description: string;
      price: number;
    }
  | {
      categoryId: number;
      title: string;
      description: string;
      price: number;
    };

type Args = {
  isOpened: boolean;
  product?: Product;
  reset: UseFormReset<ProductFormType>;
};

export const useImage = ({ product, reset, isOpened }: Args) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [uploadImageError, setUploadImageError] = useState('');

  useEffect(() => {
    if (product) {
      reset({
        title: product.title,
        description: product.description,
        price: product.price,
        categoryId: Number(product.category.id),
      });

      // Обработка начального списка изображений, если они есть
      if (product.images && product.images.length) {
        const initialFileList = product.images.map((item, index) => ({
          uid: item.id, // Убедитесь, что uid отрицательный для избежания конфликта с внутренней логикой Ant Design
          name: item.originalName,
          status: 'done',
          url: import.meta.env.VITE_BASE_URL_FILES + item.path,
        }));

        setFileList(initialFileList as unknown as UploadFile[]);
      }
    }
  }, [reset, product, isOpened]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList }) => {
    if (!fileList || !fileList?.length) {
      setUploadImageError(t('ERRORS.UPLOAD_IMAGE'));
    } else {
      setUploadImageError('');
    }
    setFileList(fileList);
  };

  return {
    handleChange,
    handlePreview,
    fileList,
    setFileList,
    previewOpen,
    setPreviewOpen,
    previewImage,
    setPreviewImage,
    uploadImageError,
    setUploadImageError,
  };
};
