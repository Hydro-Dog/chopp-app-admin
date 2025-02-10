import { useTranslation } from 'react-i18next';
import { useNotificationContext } from '@shared/context';
import { Upload } from 'antd';

// Обработчик загрузки файла, который просто сохраняет файлы в состояние
// TODO: добавить вычисление хэша, чтобы проверить нет ли уже такого изображения в загруженных
export const useBeforeUpload = () => {
  const { showErrorNotification } = useNotificationContext();
  const { t } = useTranslation();

  return (file: { type: string; size: number }) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    if (!isJpgOrPng) {
      showErrorNotification({
        message: t('ERROR'),
        description: t('ERRORS.IMAGE_INVALID_FORMAT', { format: 'JPG, JPEG, PNG' }),
      });
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      showErrorNotification({
        message: t('ERROR'),
        description: t('ERRORS.IMAGE_TOO_BIG', { mb: 2 }),
      });
    }

    // Возвращаем false, чтобы предотвратить автоматическую загрузку
    return isJpgOrPng && isLt2M ? false : Upload.LIST_IGNORE;
  };
};
