import { ChoppOkModal } from '@shared/index';
import { ChoppDescriptionsTree } from '../chopp-descriptions-tree';

type Props = {
  value?: object;
  open: boolean;
  onOk: () => void;
};

export const ChoppInfoModal = ({ value, open, onOk }: Props) => (
  <ChoppOkModal onOk={onOk} open={open}>
    <ChoppDescriptionsTree value={value} />
  </ChoppOkModal>
);
