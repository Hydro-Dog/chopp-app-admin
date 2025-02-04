import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { ConfirmModal } from '@shared/components';
import {
  getBase64,
  useNotificationContext,
  useSearchParamValue,
  useSuperDispatch,
} from '@shared/index';
import { createProduct, FETCH_STATUS, Product, RootState, updateProduct } from '@store/index';
import {
  Alert,
  Form,
  Input,
  InputNumber,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
  Image,
  Select,
} from 'antd';
import { z } from 'zod';
import { useBeforeUpload, useCreateProductFormSchema } from './hooks';
import { createFormDto, updateFormDto } from './utils';

const { Item } = Form;
const { Text } = Typography;

type FormType = { title: string; description: string; price: number; categoryId?: number };

type Props = {
  open: boolean;
  onCancel: () => void;
  onOk: (item: Product) => void;
  values?: Product;
  mode?: 'edit' | 'create';
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
  const { superDispatch } = useSuperDispatch<Product, unknown>();
  const categoryId = useSearchParamValue('id') || '';
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [uploadImageError, setUploadImageError] = useState('');
  const { showSuccessNotification } = useNotificationContext();
  const beforeUpload = useBeforeUpload();
  const { createProductStatus } = useSelector((state: RootState) => state.products);
  const { categories, fetchCategoriesStatus } = useSelector(
    (state: RootState) => state.productCategory,
  );

  const createProductFormSchema = useCreateProductFormSchema(mode);
  type CreateProductFormType = z.infer<typeof createProductFormSchema>;

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(createProductFormSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
    },
  });

  useEffect(() => {
    if (values) {
      reset({
        title: values.title,
        description: values.description,
        price: values.price,
        categoryId: Number(values.category.id),
      });

      // Обработка начального списка изображений, если они есть
      if (values.images && values.images.length) {
        const initialFileList = values.images.map((item, index) => ({
          uid: item.id, // Убедитесь, что uid отрицательный для избежания конфликта с внутренней логикой Ant Design
          name: item.originalName,
          status: 'done',
          url: import.meta.env.VITE_BASE_URL_FILES + item.path,
        }));

        setFileList(initialFileList as unknown as UploadFile[]);
      }
    }
  }, [reset, values]);

  const submitCreateProduct = (data: CreateProductFormType) => {
    if (!fileList.length) {
      setUploadImageError(t('ERRORS.UPLOAD_IMAGE'));
      return;
    } else {
      const reqData = createFormDto({
        ...data,
        categoryId,
        fileList,
      });
      superDispatch({
        action: createProduct({ form: reqData }),
        thenHandler: (response) => {
          showSuccessNotification({
            message: t('SUCCESS'),
            description: t('PRODUCT_CREATED_SUCCESSFULLY_MESSAGE'),
          });
          onOk(response);
          reset();
          setFileList([]);
        },
      });
    }
  };

  const submitUpdateProduct = (data: CreateProductFormType) => {
    if (!fileList.length && !values?.images.length) {
      setUploadImageError(t('ERRORS.UPLOAD_IMAGE'));
      return;
    } else {
      console.log('submitUpdateProduct fileList: ', fileList);
      const fileListIdsSet = new Set(fileList.map((item) => item.uid));
      const initialImagesAfterChanges = values?.images.filter((item) =>
        fileListIdsSet.has(String(item.id)),
      );
      const reqData = updateFormDto({
        ...data,
        categoryId,
        initialImages: initialImagesAfterChanges,
        fileList,
      });

      superDispatch({
        action: updateProduct({ form: reqData, id: id! }),
        thenHandler: (response) => {
          showSuccessNotification({
            message: t('SUCCESS'),
            description: t('PRODUCT_CREATED_SUCCESSFULLY_MESSAGE'),
          });
          onOk(response);
          reset();
          setFileList([]);
        },
      });
    }
  };

  const onSubmit: SubmitHandler<CreateProductFormType> = async (data) => {
    if (mode === 'create') {
      submitCreateProduct(data);
    } else {
      submitUpdateProduct(data);
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList }) => {
    console.log('fileList: ', fileList);
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

        {mode === 'edit' && (
          <Item
            className="!m-0"
            label={t('CATEGORY')}
            validateStatus={errors.categoryId && 'error'}
            help={errors.categoryId?.message}>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <div className="w-1/2">
                  <Select
                    {...field}
                    loading={fetchCategoriesStatus === FETCH_STATUS.LOADING}
                    value={field.value || ''}
                    onChange={(val) => field.onChange(val || 0)}
                    options={[...(categories || [])]
                      ?.sort((a, b) => a.order - b.order)
                      .map((item) => ({ value: item.id, label: item.title }))}
                  />
                </div>
              )}
            />
          </Item>
        )}

        {/* TODO: вынести блок с изображениями в отдельный файл?  */}
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
