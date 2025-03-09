import { useTranslation } from 'react-i18next';
import { useNotificationContext } from '@shared/context';
import { Upload } from 'antd';

const isImage = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const arr = new Uint8Array(e.target?.result as ArrayBuffer).subarray(0, 4);
      let header = '';
      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16);
      }
      const isImage =
        header === 'ffd8ffe0' || // JPEG
        header === '89504e47'; // PNG
      resolve(isImage);
    };
    reader.readAsArrayBuffer(file.slice(0, 4));
  });
};

export const useBeforeUpload = () => {
  const { showErrorNotification } = useNotificationContext();
  const { t } = useTranslation();

  return async (file: File) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    if (!isJpgOrPng) {
      showErrorNotification({
        message: t('ERROR'),
        description: t('ERRORS.IMAGE_INVALID_FORMAT', { format: 'JPG, JPEG, PNG' }),
      });
      return Upload.LIST_IGNORE;
    }

    const isImageFile = await isImage(file);
    if (!isImageFile) {
      showErrorNotification({
        message: t('ERROR'),
        description: t('ERRORS.IMAGE_INVALID_FORMAT', { format: 'JPG, JPEG, PNG' }),
      });
      return Upload.LIST_IGNORE;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      showErrorNotification({
        message: t('ERROR'),
        description: t('ERRORS.IMAGE_TOO_BIG', { mb: 2 }),
      });
      return Upload.LIST_IGNORE;
    }

    return false;
  };
};
