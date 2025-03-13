import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TitlePage } from '@shared/components';
import { Alert, Button, Card, Typography } from 'antd';

import { TimeForm } from './components';
const { Paragraph } = Typography;

export const TimeSettings = () => {
  const { t } = useTranslation();
  const [isDisabled, setIsDisabled] = useState(false);
  const [time, setTime] = useState<string[]>(['', '']);

  useEffect(() => {
    console.log(time);
  }, [time]);

  return (
    <TitlePage breadcrumbs title={t('SETTINGS')}>
      <Card title={t('SETTINGS_PAGE.TIME_SETTINGS.TITLE')}>
        <div className="flex flex-col gap-5">
          <div className="w-1/2">
            <Alert type="info" message={t('SETTINGS_PAGE.TIME_SETTINGS.TOOLTIP')} />
          </div>

          {isDisabled === false ? (
            <div>
              <Paragraph>
                {t('SETTINGS_PAGE.TIME_SETTINGS.INFO')} {time[0]} - {time[1]}
              </Paragraph>
              <Button className="mt-5" type="primary" onClick={() => setIsDisabled(true)}>
                {t('EDIT')}
              </Button>
            </div>
          ) : (
            <TimeForm
              time={time}
              setTime={setTime}
              isDisabled={isDisabled}
              setIsDisabled={setIsDisabled}
            />
          )}
        </div>
      </Card>
    </TitlePage>
  );
};
