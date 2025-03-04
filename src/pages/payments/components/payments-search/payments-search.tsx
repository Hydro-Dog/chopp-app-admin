import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { usePaymentsContext } from '@pages/payments/context';
import { Input } from 'antd';
import { useDebounceCallback } from 'usehooks-ts';

export const PaymentsSearch = () => {
  const { t } = useTranslation();
  const { payment_id, setPayment_id } = usePaymentsContext();

  const debounced = useDebounceCallback(setPayment_id, 500);
  //   useEffect(() => {
  //     setPayment_id(payment_id);
  //   }, []);
  //   console.log(payment_id, 1111);

  //   const handleSearch = useCallback(
  //     (event: React.ChangeEvent<HTMLInputElement>) => {
  //       setDebouncedValue(event.target.value);
  //     },
  //     [setDebouncedValue],
  //   );

  return (
    <Input
      defaultValue={payment_id}
      onChange={(e) => debounced(e.target.value)}
      placeholder={t('SEARCH')}
    />
  );
};
