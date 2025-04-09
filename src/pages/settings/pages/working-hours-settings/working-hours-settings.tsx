import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ChoppTextWithTooltip, TitlePage } from '@shared/components';
import { useNotificationContext } from '@shared/context';
import { FETCH_STATUS } from '@shared/types';
import { fetchClientAppConfig } from '@store/slices';
import { AppDispatch, RootState } from '@store/store';
import { Button, Card, Descriptions, Space, Spin, Typography } from 'antd';
import { WorkingHoursForm } from './components';

const { Title } = Typography;

export const WorkingHoursSettings = () => {
  const { t } = useTranslation();
  const [isEditNode, setEditMode] = useState(false);
  const { clientAppConfigData } = useSelector((state: RootState) => state.clientAppConfig);
  const { fetchClientAppConfigDataStatus } = useSelector(
    (state: RootState) => state.clientAppConfig,
  );
  const dispatch = useDispatch<AppDispatch>();
  const { showErrorNotification } = useNotificationContext();

  useEffect(() => {
    dispatch(fetchClientAppConfig())
      .unwrap()
      .catch((error) => showErrorNotification({ message: t('ERROR'), description: error.message }));
  }, [dispatch]);

  if (fetchClientAppConfigDataStatus === FETCH_STATUS.LOADING) {
    return <Spin tip={t('LOADING')} />;
  }

  return (
    <TitlePage breadcrumbs title={t('SETTINGS')}>
      <Card>
        <Title level={4}>{t('SETTINGS_PAGE.TIME_SETTINGS.TITLE')}</Title>
        <div className="flex flex-col gap-5">
          {isEditNode === false ? (
            <div>
              <div className="flex items-center gap-5">
                <Descriptions bordered>
                  <Descriptions.Item
                    label={
                      <ChoppTextWithTooltip
                        title={t('SETTINGS_PAGE.TIME_SETTINGS.INFO')}
                        tooltipText={t('SETTINGS_PAGE.TIME_SETTINGS.TOOLTIP')}
                      />
                    }>
                    {clientAppConfigData?.openTime} - {clientAppConfigData?.closeTime}
                  </Descriptions.Item>
                </Descriptions>
              </div>

              <Button className="mt-5" type="primary" onClick={() => setEditMode(true)}>
                {t('EDIT')}
              </Button>
            </div>
          ) : (
            <WorkingHoursForm setEditMode={setEditMode} />
          )}
        </div>
      </Card>
    </TitlePage>
  );
};
