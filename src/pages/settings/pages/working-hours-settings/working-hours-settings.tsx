import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChoppTextWithTooltip, TitlePage } from '@shared/components';
import { Button, Card, Descriptions, Space } from 'antd';

import { WorkingHoursForm } from './components';

export const WorkingHoursSettings = () => {
  const { t } = useTranslation();
  const [isEditNode, setEditMode] = useState(false);
  const [time, setTime] = useState<string[]>(['', '']);

  useEffect(() => {
    console.log(time);
  }, [time]);

  return (
    <TitlePage breadcrumbs title={t('SETTINGS')}>
      <Card title={t('SETTINGS_PAGE.TIME_SETTINGS.TITLE')}>
        <div className="flex flex-col gap-5">
          {isEditNode === false ? (
            <div>
              <div className="flex items-center gap-5">
                <Descriptions>
                  <Descriptions.Item
                    label={
                      <Space size={4}>
                        {t('SETTINGS_PAGE.TIME_SETTINGS.INFO')}
                        <ChoppTextWithTooltip
                          tooltipText={t('SETTINGS_PAGE.TIME_SETTINGS.TOOLTIP')}
                        />
                      </Space>
                    }>
                    {time[0]} - {time[1]}
                  </Descriptions.Item>
                </Descriptions>
              </div>

              <Button className="mt-5" type="primary" onClick={() => setEditMode(true)}>
                {t('EDIT')}
              </Button>
            </div>
          ) : (
            <WorkingHoursForm time={time} setTime={setTime} setEditMode={setEditMode} />
          )}
        </div>
      </Card>
    </TitlePage>
  );
};
