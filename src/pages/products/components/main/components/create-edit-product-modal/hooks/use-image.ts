import { useState, useCallback } from 'react';
import type { UploadFile } from 'antd/es/upload/interface';

type Args = {
  beforeUpload: (file: File) => boolean | Promise<File>;
};

export const useImage = ({ beforeUpload }: Args) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [uploadImageError, setUploadImageError] = useState<string | null>(null);

  const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
    if (fileList.length) setUploadImageError(null);
  };

  const handlePreview = async (file: UploadFile) => {
    setPreviewImage(file.url || (await getBase64(file.originFileObj!)));
    setPreviewOpen(true);
  };

  return {
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
    beforeUpload,
  };
};

const getBase64 = (file: File): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
