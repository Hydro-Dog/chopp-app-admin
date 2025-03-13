import { useTranslation } from 'react-i18next';
import { TitlePage } from '@shared/components';
import { Card, TimePicker, Typography } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
const { Paragraph } = Typography;

export const TimeSettings = () => {
  const { t } = useTranslation();
  const changeTime: RangePickerProps['onChange'] = (dates, dateStrings) => {
    console.log(dateStrings);
  };
  return (
    <TitlePage breadcrumbs title={t('SETTINGS')}>
      <Card title={t('TIME_SETTINGS')}>
        <div className="flex flex-col gap-5">
          <div>
            <Paragraph strong>{t('TIME_SETTINGS_TOOLTIP')}</Paragraph>
            <TimePicker.RangePicker
              placeholder={[t('ORDERS_PAGE.START_DATE'), t('ORDERS_PAGE.END_DATE')]}
              onChange={changeTime}
              format="HH:mm"
              // value={}
            />
          </div>
        </div>
      </Card>
    </TitlePage>
  );
};
