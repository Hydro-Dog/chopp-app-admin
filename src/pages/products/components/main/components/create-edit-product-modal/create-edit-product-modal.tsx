import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { BasicModal, ConfirmModal } from '@shared/components';
import { useNotificationContext, useSearchParamValue, useSuperDispatch } from '@shared/index';
import { createProduct, FETCH_STATUS, Product, RootState, updateProduct } from '@store/index';
import {
  Alert,
  Form,
  GetProp,
  Input,
  InputNumber,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
  Image,
} from 'antd';
import { z } from 'zod';
import { useCreateProductFormSchema } from './hooks';
import { createFormDto } from './utils';

const { Item } = Form;
const { Text } = Typography;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

// Обработчик загрузки файла, который просто сохраняет файлы в состояние
const useBeforeUpload = () => {
  const { showErrorNotification } = useNotificationContext();
  const { t } = useTranslation();

  return (file) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    if (!isJpgOrPng) {
      console.error('Вы можете загрузить только JPG/PNG файл!');
      showErrorNotification({
        message: t('ERROR'),
        description: t('ERRORS.IMAGE_INVALID_FORMAT', { format: 'JPG, JPEG, PNG' }),
      });
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      console.error('Изображение должно быть меньше 2MB!');
      showErrorNotification({
        message: t('ERROR'),
        description: t('ERRORS.IMAGE_TOO_BIG', { mb: 2 }),
      });
    }

    return isJpgOrPng && isLt2M ? false : Upload.LIST_IGNORE; // Возвращаем false, чтобы предотвратить автоматическую загрузку
  };
};

type Props = {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  values?: Product;
  mode: 'edit' | 'create';
  id?: number;
};

export const CreateEditProductModal = ({
  open,
  onCancel,
  onOk,
  values,
  mode = 'create',
  id,
}: Props) => {
  const { t } = useTranslation();
  const superDispatch = useSuperDispatch();
  const categoryId = useSearchParamValue('id');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [uploadImageError, setUploadImageError] = useState('');
  const { showSuccessNotification } = useNotificationContext();
  const beforeUpload = useBeforeUpload();
  const { createProductStatus } = useSelector((state: RootState) => state.products);

  const createProductFormSchema = useCreateProductFormSchema();
  type CreateProductFormType = z.infer<typeof createProductFormSchema>;

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm<{ title: string; description: string; price: number | null }>({
    resolver: zodResolver(createProductFormSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 100,
    },
  });

  useEffect(() => {
    console.log('values: ', values);
    if (values) {
      reset({
        title: values.title,
        description: values.description,
        price: values.price,
      });

      // Обработка начального списка изображений, если они есть
      if (values.images && values.images.length) {
        const initialFileList = values.images.map((url, index) => ({
          uid: -index, // Убедитесь, что uid отрицательный для избежания конфликта с внутренней логикой Ant Design
          name: `Image ${index + 1}`,
          status: 'done',
          url: import.meta.env.VITE_BASE_URL_FILES + url,
        }));

        setFileList(initialFileList);
      }
    }
  }, [reset, values]);

  const onSubmit: SubmitHandler<CreateProductFormType> = async (data) => {
    if (!fileList.length) {
      setUploadImageError(t('ERRORS.UPLOAD_IMAGE'));
      return;
    } else {
      const reqData = createFormDto({ ...data, fileList, categoryId: categoryId || '' });
      // eslint-disable-next-line prettier/prettier
      const action =
        mode === 'create' ? createProduct({ form: reqData }) : updateProduct({ form: reqData, id });
      superDispatch({
        action,
        thenHandler: () => {
          showSuccessNotification({
            message: t('SUCCESS'),
            description: t('PRODUCT_CREATED_SUCCESSFULLY_MESSAGE'),
          });
          // dispatch(fetchProducts())
          onOk();
          reset();
          setFileList([]);
        },
      });
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
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

  const handleCancel = () => {
    reset();
    setFileList([]);
    onCancel();
  };

  return (
    <ConfirmModal
      title={t('ADD_PRODUCT')}
      open={open}
      confirmLoading={createProductStatus === FETCH_STATUS.LOADING}
      onOk={handleSubmit(onSubmit)}
      onCancel={handleCancel}
      okTitle={t('ADD')}>
      <Form layout="vertical" className="flex flex-col gap-4">
        <Item
          className="!m-0"
          label={t('TITLE_NAME')}
          validateStatus={errors.title && 'error'}
          help={errors.title?.message}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => <Input {...field} placeholder={t('TITLE_NAME')} />}
          />
        </Item>

        <Item
          className="!m-0"
          label={t('DESCRIPTION')}
          validateStatus={errors.description && 'error'}
          help={errors.description?.message}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input.TextArea {...field} rows={4} placeholder={t('DESCRIPTION')} />
            )}
          />
        </Item>

        <Item
          className="!m-0"
          label={t('PRICE')}
          validateStatus={errors.price && 'error'}
          help={errors.price?.message}>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                prefix="₽"
                value={field.value || ''}
                onChange={(val) => field.onChange(val || 0)}
                className="w-1/2"
              />
            )}
          />
        </Item>

        <Item
          className="!m-0"
          label={t('IMAGES')}
          validateStatus={uploadImageError && 'error'}
          help={uploadImageError}>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={beforeUpload}>
            {fileList.length >= 8 ? null : (
              <button style={{ border: 0, background: 'none' }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            )}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{ display: 'none' }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(''),
              }}
              src={previewImage}
            />
          )}
        </Item>

        <Alert
          message={
            <Text>{t('UPLOAD_IMAGE_HELPER_TEXT', { format: 'JPG, JPEG, PNG', mb: 2 })}</Text>
          }
          type="info"
        />
      </Form>
    </ConfirmModal>
  );
};