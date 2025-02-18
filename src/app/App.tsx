import { createContext, useState } from 'react';
import { initReactI18next } from 'react-i18next';
import { Provider as StoreProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ChatsContextProvider } from '@pages/chats/chats-context';
import {
  useNotificationApi,
  useTheme,
  LANG,
  LangContextProvider,
  NotificationContextProvider,
  THEME,
} from '@shared/index';
import { store } from '@store/index';
import { ConfigProvider, theme as antTheme } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import ruRU from 'antd/lib/locale/ru_RU';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { router } from './router/router';
import 'dayjs/locale/ru';

import './index.css';
import { useAxiosInterceptors } from '@store/middleware';

dayjs.extend(utc); // активация плагина
dayjs.locale('ru'); // установка локали

i18n
  .use(initReactI18next)
  .use(HttpBackend)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    debug: false, //вывод отладочной информации в консоль
    ns: ['translation', 'phrases'], // Добавляем namespaces
    defaultNS: 'translation',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export const App = () => {
  const { theme } = useTheme();

  const themeConfig = {
    algorithm: theme === THEME.DARK ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
  };

  const {
    showNotification,
    showInfoNotification,
    showErrorNotification,
    showSuccessNotification,
    closeNotification,
    closeAllNotifications,
    NotificationContext: NotificationCtx,
  } = useNotificationApi();
  const [lang, setLang] = useState(LANG.RU);

  return (
    <LangContextProvider lang={lang} setLang={setLang}>
      <StoreProvider store={store}>
        <ConfigProvider theme={themeConfig} locale={lang === LANG.RU ? ruRU : enUS}>
          <NotificationContextProvider
            showNotification={showNotification}
            showInfoNotification={showInfoNotification}
            showErrorNotification={showErrorNotification}
            showSuccessNotification={showSuccessNotification}
            closeNotification={closeNotification}
            closeAllNotifications={closeAllNotifications}>
            <div className="w-full h-screen overflow-hidden">
              <ChatsContextProvider>
                <RouterProvider router={router} />
              </ChatsContextProvider>
            </div>
            <NotificationCtx />
          </NotificationContextProvider>
        </ConfigProvider>
      </StoreProvider>
    </LangContextProvider>
  );
};
