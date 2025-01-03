import React, { PropsWithChildren, ReactNode, useMemo, useRef, useState } from 'react';
import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';
import { SCREEN_SIZE } from '@shared/enum/screen-size';
import { Modal } from 'antd';
import { useWindowSize } from 'usehooks-ts';
import { ResponsiveModal } from '../mobile-modal';
import OpenWithIcon from '@mui/icons-material/OpenWith';

type Props = {
  open: boolean;
  title?: ReactNode;
  width?: string | number;
  onOk: () => void;
  onCancel: () => void;
};

export const DraggableModal = ({
  children,
  open,
  title,
  onOk,
  onCancel,
  ...props
}: PropsWithChildren<Props>) => {
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
  const draggleRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const Dialog = useMemo(() => (width < SCREEN_SIZE.XS ? ResponsiveModal : Modal), [width]);

  const handleOk = (_e: React.MouseEvent<HTMLElement>) => {
    onOk();
  };

  const handleCancel = (_e: React.MouseEvent<HTMLElement>) => {
    onCancel();
  };

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <>
      <Dialog
        width={props?.width || 'fit-content'}
        mask={false}
        title={
          <div
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}>
            <div className="flex gap-1 w-full cursor-move mr-10 items-center -mt-1">
              {/* <div>
                <OpenWithIcon fontSize="small" color='disabled'/>
              </div> */}
              <div>{title}</div>
            </div>
          </div>
        }
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}>
            <div ref={draggleRef} className="max-w-xl">
              {modal}
            </div>
          </Draggable>
        )}
        {...props}>
        {children}
      </Dialog>
    </>
  );
};
