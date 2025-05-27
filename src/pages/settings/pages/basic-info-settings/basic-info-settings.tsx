import { useTranslation } from 'react-i18next';
import { TitlePage } from '@shared/index';
import { Card, Typography } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { BasicInfoSettingsEditForm } from './components/basic-info-settings-edit-form/basic-info-settings-edit-form';
import { BasicInfoSettingsView } from './components/basic-info-settings-view/basic-info-settings-view';

const { Title } = Typography;

export const BasicInfoSettingsPage = () => {
  const { t } = useTranslation();
  const { value: isEditing, toggle } = useBoolean();

  return (
    <TitlePage breadcrumbs title={t('SETTINGS_PAGE.BASIC_INFO_SETTINGS.TITLE')}>
      <div className=" pb-10">
        <Card className="h-full">
          {/* <Title level={4}>{t('SETTINGS_PAGE.BASIC_INFO_SETTINGS.TITLE')}</Title> */}
          <div>
            {isEditing ? (
              <BasicInfoSettingsEditForm toggle={toggle} />
            ) : (
              <BasicInfoSettingsView toggle={toggle} />
            )}
          </div>
        </Card>
      </div>
    </TitlePage>
  );
};
