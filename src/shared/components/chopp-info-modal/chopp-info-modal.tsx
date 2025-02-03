import { ChoppOkModal } from '@shared/index';
import { ChoppDescriptionsTree } from '../chopp-descriptions-tree';

type Props = {
  value?: object;
  open: boolean;
  onClose: () => void;
};

export const ChoppInfoModal = ({ value, open, onClose }: Props) => (
  <ChoppOkModal onOk={onClose} open={open}>
    <ChoppDescriptionsTree value={value} />
  </ChoppOkModal>
);
