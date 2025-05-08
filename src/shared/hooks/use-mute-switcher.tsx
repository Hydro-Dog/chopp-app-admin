import { MutedOutlined, SoundOutlined } from '@ant-design/icons';
import { useNotificationContext } from '@shared/index';
import { Button, Tooltip } from 'antd';

/**
 * Хук для создания переключателя режима "Без звука".
 * Использует глобальный NotificationContext.
 */
export const useMuteSwitcher = () => {
  const { isMute, mute, unmute } = useNotificationContext();

  const onMuteChange = (val: boolean) => {
    if (val) {
      unmute();
    } else {
      mute();
    }
  };

  return {
    muteSwitcher: (
      <Tooltip title={isMute ? 'Включить звук' : 'Выключить звук'}>
        <Button
          shape="circle"
          size="small"
          type={isMute ? undefined : 'primary'}
          icon={isMute ? <MutedOutlined /> : <SoundOutlined />}
          onClick={() => {
            onMuteChange(isMute);
          }}
        />
      </Tooltip>
    ),
  };
};
