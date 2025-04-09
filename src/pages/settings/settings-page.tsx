import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ExclamationCircleFilled } from '@ant-design/icons';
import {
  ClientAppConfig,
  CustomModal,
  TitlePage,
  useNotificationContext,
  useSuperDispatch,
  useThemeToken,
} from '@shared/index';
import { fetchClientAppConfig, postClientAppConfig } from '@store/slices';
import { Row, Col, Typography, Button, Modal, Flex } from 'antd';
import { SettingCard } from './components';
import { useGetSettings } from './hooks';
import { useBoolean } from 'usehooks-ts';

const { confirm } = Modal;
const { Paragraph, Title, Text } = Typography;

type Args = {
  onOk: () => void;
  onCancel: () => void;
};

const useShowDisableConfirm = ({ onOk, onCancel }: Args) => {
  const { t } = useTranslation();

  return () => {
    confirm({
      title: `${t('SETTINGS_PAGE.TURN_APP_OFF_TITLE_FULL')}?`,
      icon: <ExclamationCircleFilled />,
      content: t('SETTINGS_PAGE.TURN_APP_OFF_DESCRIPTION_FULL'),
      okText: t('YES'),
      okType: 'danger',
      cancelText: t('NO'),
      onOk,
      onCancel,
    });
  };
};

export const SettingsPage = () => {
  const [isAppDisabled, setIsAppDisabled] = useState(false);
  const { t } = useTranslation();
  const settingsList = useGetSettings();
  const themeToken = useThemeToken();
  const { superDispatch: setClientAppConfigDispatch } = useSuperDispatch<
    ClientAppConfig,
    Partial<ClientAppConfig>
  >();
  const { superDispatch: fetchClientAppConfigDispatch } = useSuperDispatch<ClientAppConfig, void>();
  const { showErrorNotification } = useNotificationContext();
  const { value: open, setTrue: openModal, setFalse: closeModal } = useBoolean();

  const showDisableConfirm = useShowDisableConfirm({
    onOk: () => onSwitchAppToggler(!isAppDisabled),
  });

  useEffect(() => {
    fetchClientAppConfigDispatch({
      action: fetchClientAppConfig(),
      thenHandler: ({ disabled }) => {
        setIsAppDisabled(!!disabled);
      },
      catchHandler: (error) => {
        showErrorNotification({
          message: t('ERROR'),
          description: error.message,
        });
      },
    });
  }, []);

  const onSwitchAppToggler = (disabled: boolean) => {
    setClientAppConfigDispatch({
      action: postClientAppConfig({ disabled }),
      thenHandler: ({ disabled }) => {
        setIsAppDisabled(!!disabled);
      },
      catchHandler: (error) => {
        showErrorNotification({
          message: t('ERROR'),
          description: error.message,
        });
      },
    });
  };

  return (
    <>
      <TitlePage breadcrumbs title={t('SETTINGS')}>
        <Row gutter={[24, 24]} className="px-2">
          {settingsList.map((item) => (
            <Col key={item.path}>
              <SettingCard
                path={item.path}
                title={item.title}
                image={item.image}
                description={item.description}
              />
            </Col>
          ))}
        </Row>
        <div
          className={`p-4 rounded-xl fixed bottom-10 right-4 border-2`}
          style={{
            borderColor: 'none',
            border: `1px solid ${isAppDisabled ? themeToken.colorError : themeToken.colorWarning}`,
            background: isAppDisabled ? themeToken.colorErrorBg : themeToken.colorWarningBg,
          }}>
          <Title level={5}>
            {t(
              isAppDisabled
                ? 'SETTINGS_PAGE.TURN_APP_ON_TITLE'
                : 'SETTINGS_PAGE.TURN_APP_OFF_TITLE',
            )}
            ?
          </Title>
          <Paragraph>
            {t(
              isAppDisabled
                ? 'SETTINGS_PAGE.TURN_APP_ON_DESCRIPTION'
                : 'SETTINGS_PAGE.TURN_APP_OFF_DESCRIPTION',
            )}
          </Paragraph>
          <Button
            onClick={() => {
              if (!isAppDisabled) {
                openModal();
              } else {
                onSwitchAppToggler(!isAppDisabled);
              }
            }}
            danger>
            {t(isAppDisabled ? 'TURN_ON' : 'TURN_OFF')}
          </Button>
        </div>
      </TitlePage>

      <CustomModal
        title={`${t('SETTINGS_PAGE.TURN_APP_OFF_TITLE_FULL')}?`}
        open={open}
        onOk={() => {
          onSwitchAppToggler(!isAppDisabled);
          closeModal();
        }}
        onCancel={closeModal}
        okTitle={t('YES')}
        okColor="danger">
        <Flex align="center" gap={16}>
          <Text>{t('SETTINGS_PAGE.TURN_APP_OFF_DESCRIPTION_FULL')}</Text>
        </Flex>
      </CustomModal>
    </>
  );
};
