import { useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNotificationContext, useThemeToken } from '@shared/index';
import './sign-in-page.scss';

import {
  AppDispatch,
  RootState,
  UserLoginDTO,
  loginUser,
  setLoginStatus,
  wsConnect,
} from '@store/index';
import { FETCH_STATUS } from '@store/types/fetch-status';
import { Button, Flex, Form, Input, Tooltip, Typography, Tabs } from 'antd';
import { z } from 'zod';
import { useSignInFormSchema } from './hooks/useSignInFormSchema';
import { useSignInTabs } from './hooks/useSignInTabs';

const { Item } = Form;
const { Text } = Typography;

export const SignInPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loginStatus, loginError } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showErrorNotification } = useNotificationContext();
  const themeToken = useThemeToken();
  const { signInType, setSignInType, isSignInByEmail, tabsItems } = useSignInTabs();
  const signInFormSchema = useSignInFormSchema(signInType);

  type SignInFormType = z.infer<typeof signInFormSchema>;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserLoginDTO>({
    resolver: zodResolver(signInFormSchema),
    reValidateMode: 'onChange',
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      phoneNumber: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<UserLoginDTO> = (data) => {
    dispatch(loginUser({ ...data }))
      .then(({ payload }) => {
        if (payload) {
          dispatch(
            wsConnect({
              url: `${import.meta.env.VITE_BASE_WS}/ws?token=${payload.accessToken}`,
            }),
          );
        }
      })
      .catch((e) => console.log('e: ', e));
  };

  useEffect(() => {
    if (loginStatus === FETCH_STATUS.ERROR) {
      showErrorNotification({
        message: t('ERROR'),
        description: loginError?.message,
      });
    } else if (loginStatus === FETCH_STATUS.SUCCESS) {
      dispatch(setLoginStatus(FETCH_STATUS.IDLE));
      navigate('/');
      console.log('HERE!');
    }
  }, [dispatch, loginError?.message, loginStatus, navigate, showErrorNotification, t]);

  return (
    <Flex className="w-full h-screen" style={{ background: themeToken.colorBgBase }}>
      <Form
        className="m-auto"
        labelCol={{ span: 8 }}
        labelAlign="left"
        labelWrap
        colon={false}
        wrapperCol={{ span: 16 }}
        onFinish={handleSubmit(onSubmit)}>

        <Tabs
          centered
          className="sign-in-tabs"
          defaultActiveKey={signInType}
          items={tabsItems}
          onChange={(key: any) => setSignInType(key)}
        />

        {isSignInByEmail && (
          <Item<SignInFormType>
            label={t('EMAIL')}
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email?.message}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div className="flex">
                  <Input {...field} placeholder={t('LOGIN')} />
                </div>
              )}
            />
          </Item>
        )}

        {!isSignInByEmail && (
          <Item<SignInFormType>
            label={t('PHONE')}
            validateStatus={errors.phoneNumber ? 'error' : ''}
            help={errors.phoneNumber?.message}>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <div className="flex">
                  {/* TODO: добавить маску номера из клиентской части */}
                  <Input {...field} placeholder={t('+7 ___ ___-__-__')} />
                </div>
              )}
            />
          </Item>
        )}

        <Item<SignInFormType>
          label={t('PASSWORD')}
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password?.message}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => {
              return <Input.Password {...field} placeholder={t('PASSWORD')} />;
            }}
          />
        </Item>

        <div className="flex items-center justify-between">
          <Item className="m-0">
            <Button
              type="primary"
              onClick={() => handleSubmit(onSubmit)}
              htmlType="submit"
              loading={loginStatus === 'loading'}>
              {t('ENTER')}
            </Button>
          </Item>
          <Tooltip title={t('FORGOT_PASSWORD_TOOLTIP')}>
            <Text type="secondary" className="cursor-pointer">
              {t('FORGOT_PASSWORD')}?
            </Text>
          </Tooltip>

          {/* <Button type="text" onClick={() => navigate(`/${ROUTES.REGISTER}`)}>
            {t('REGISTER', { ns: 'phrases' })}
          </Button> */}
        </div>
        {/* TODO: удалить, если не понадобится кнопка,
            чисто для примера, сейчас вместо нее табы
        */}
        {/* <Button onClick={() => () => setSignInType(isSignInByEmail ? SIGN_IN_TYPE.PHONE_NUMBER : SIGN_IN_TYPE.EMAIL)}>{isSignInByEmail ? t('BY_PHONE_NUMBER') : t('BY_EMAIL');}</Button> */}
      </Form>
    </Flex>
  );
};
