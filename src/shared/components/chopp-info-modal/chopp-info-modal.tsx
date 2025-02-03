import { BasicModal } from "../basic-modal";
import { ChoppDescriptionsTree } from "../chopp-descriptions-tree";

type Props = {
  value?: object;
  open: boolean;
  onClose: () => void;
};

export const ChoppInfoModal = ({ value, open, onClose }: Props) => {
  const onSubmit = () => {
    onClose();
  };

  return (
    <BasicModal open={open} onOk={onSubmit} onCancel={onClose}>
      <ChoppDescriptionsTree value={value} />
    </BasicModal>
  );
};