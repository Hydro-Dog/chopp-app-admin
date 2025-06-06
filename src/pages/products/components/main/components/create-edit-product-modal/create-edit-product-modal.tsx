import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProductsContext } from '@pages/products/context';
import { CustomModal } from '@shared/components';
import { useNotificationContext, useSuperDispatch, FETCH_STATUS, Product, sortByOrder } from '@shared/index';
import { createProduct, RootState, updateProduct } from '@store/index';
import {
  Alert,
  Form,
  Input,
  InputNumber,
  Typography,
  Upload,
  Image,
  Select,
  Space,
  UploadFile,
} from 'antd';
import { z } from 'zod';
import {
  useBeforeUpload,
  useCreateProductFormSchema,
  useEditProductFormSchema,
  useImage,
  useRefetchProductList,
} from './hooks';
import { createFormDto, updateFormDto } from './utils';

const { Item } = Form;
const { Text } = Typography;

type Props = {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  product?: Product;
  mode?: 'edit' | 'create';
  id?: number;
};

export const CreateEditProductModal = ({
  open,
  onCancel,
  onOk,
  product,
  mode = 'create',
  id,
}: Props) => {
  const { t } = useTranslation();
  const { superDispatch } = useSuperDispatch<Product, unknown>();
  const { categoryId } = useProductsContext();
  const beforeUpload = useBeforeUpload();
  const { showSuccessNotification } = useNotificationContext();
  const { createProductStatus, updateProductStatus } = useSelector(
    (state: RootState) => state.products,
  );
  const { categories, fetchCategoriesStatus } = useSelector(
    (state: RootState) => state.productCategory,
  );
  const { refetchProductList } = useRefetchProductList();

  const createProductFormSchema = useCreateProductFormSchema();
  type CreateProductFormType = z.infer<typeof createProductFormSchema>;

  const editProductFormSchema = useEditProductFormSchema();
  type EditProductFormType = z.infer<typeof editProductFormSchema>;

  const productFormSchema = mode === 'create' ? createProductFormSchema : editProductFormSchema;
  type ProductFormType = CreateProductFormType | EditProductFormType;

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProductFormType>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
    },
  });

  const {
    fileList,
    setFileList,
    previewOpen,
    setPreviewOpen,
    previewImage,
    setPreviewImage,
    uploadImageError,
    setUploadImageError,
    handleChange,
    handlePreview,
  } = useImage({ beforeUpload });

  const submitCreateProduct = (data: CreateProductFormType) => {
    if (!fileList.length) {
      setUploadImageError(t('ERRORS.UPLOAD_IMAGE'));
      return;
    } else {
      const reqData = createFormDto({ ...data, categoryId, fileList });

      superDispatch({
        action: createProduct({ form: reqData }),
        thenHandler: (product) => {
          showSuccessNotification({
            message: t('SUCCESS'),
            description: `${t('PRODUCT_CREATED_SUCCESSFULLY_MESSAGE')} '${product.category.title}'`,
          });
          onOk();
          reset();
          setFileList([]);
          refetchProductList();
        },
      });
    }
  };

  useEffect(() => {
    if (open && mode === 'edit' && product) {
      // 1️⃣ заполняем текстовые поля
      console.log({
        title: product.title,
        description: product.description,
        price: product.price,
        categoryId: product.category.id,
      });
      reset({
        title: product.title,
        description: product.description,
        price: product.price,
        categoryId: product.category.id,
      });

      // 2️⃣ заполняем изображения
      const imgList: UploadFile[] = product.images.map((img) => ({
        uid: img.id, // важно: uid = id, чтобы отличать старые
        name: img.path,
        status: 'done',
        url: import.meta.env.VITE_BASE_URL_FILES + img.path,
      }));
      setFileList(imgList);
      setUploadImageError(null);
    }

    if (!open) {
      // При закрытии модалки очищаем форму и изображения
      reset();
      setFileList([]);
      setUploadImageError(null);
    }
  }, [open, mode, product, reset, setFileList, setUploadImageError]);

  const submitUpdateProduct = (data: CreateProductFormType) => {
    const allImagesIds = new Set(fileList.map((item) => item.uid));
    const initialImagesIds = new Set(product?.images.map((item) => item.id));

    // 1. Оставшиеся старые изображения (которые были и не удалены)
    const remainingOldImages = product?.images.filter((image) => allImagesIds.has(image.id));

    // 2. Новые изображения (те, у которых нет id из initialImagesIds)
    const newImages = fileList.filter((file) => !initialImagesIds.has(file.uid));

    if (uploadImageError || (!fileList.length && !product?.images.length)) {
      setUploadImageError(t('ERRORS.UPLOAD_IMAGE'));
      return;
    } else {
      const reqData = updateFormDto({
        ...(data as EditProductFormType),
        remainingOldImages,
        fileList: newImages,
      });

      superDispatch({
        action: updateProduct({ form: reqData, id: id! }),
        thenHandler: (product) => {
          if (!product) return;

          showSuccessNotification({
            message: t('SUCCESS'),
            description: t('PRODUCT_UPDATED_SUCCESSFULLY_MESSAGE'),
          });
          onOk();
          reset();
          setFileList([]);
          refetchProductList();
        },
      });
    }
  };

  const handleCancel = () => {
    reset();
    setFileList([]);
    onCancel();
  };

  return (
    <CustomModal
      title={t(mode === 'create' ? 'ADD_PRODUCT' : 'EDIT_PRODUCT')}
      open={open}
      confirmLoading={
        createProductStatus === FETCH_STATUS.LOADING || updateProductStatus === FETCH_STATUS.LOADING
      }
      onOk={handleSubmit(mode === 'create' ? submitCreateProduct : submitUpdateProduct)}
      onCancel={handleCancel}
      okTitle={t(mode === 'create' ? 'ADD' : 'SAVE')}
      cancelButtonProps={{
        disabled:
          createProductStatus === FETCH_STATUS.LOADING ||
          updateProductStatus === FETCH_STATUS.LOADING,
      }}>
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
            validateStatus={'categoryId' in errors ? errors?.categoryId && 'error' : undefined}
            help={'categoryId' in errors ? errors?.categoryId?.message : undefined}>
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
                    options={sortByOrder([...(categories || [])]).map((item) => ({
                      value: item.id,
                      label: item.title,
                    }))}
                  />
                </div>
              )}
            />
          </Item>
        )}

        {/* TODO: вынести блок с изображениями в отдельный файл?  */}
        <Item
          className="!m-0"
          label={
            <Space>
              <div>{t('IMAGE')}</div>
              {/* <ChoppTextWithTooltip
              //TODO: закомментировано пока не отладим работу с несколькими изображениями
              // tooltipText={t('FIRST_IMAGE_IS_COVER')}
              /> */}
            </Space>
          }
          validateStatus={uploadImageError && 'error'}
          help={uploadImageError}>
          <Upload
            accept=".png,.jpeg,.jpg"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={beforeUpload}>
            {/* Временное ограничение до одного изображения. */}
            {fileList.length >= 1 ? null : (
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
    </CustomModal>
  );
};
