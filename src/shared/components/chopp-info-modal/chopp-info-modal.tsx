import { ChoppOkModal } from '@shared/index';
import { ChoppDescriptionsTree } from '../chopp-descriptions-tree';

type Props = {
  value?: object;
  open: boolean;
  keyTranslations?: object;
  onOk: () => void;
};

export const ChoppInfoModal = ({ value, open, onOk, keyTranslations }: Props) => (
  <ChoppOkModal onOk={onOk} open={open}>
    <ChoppDescriptionsTree keyTranslations={keyTranslations} value={value} />
  </ChoppOkModal>
);
