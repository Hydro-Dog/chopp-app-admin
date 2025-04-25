import { RefObject, useState } from 'react';
import { FieldError } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { useThemeToken } from '@shared/hooks';

type Props = {
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  errors: FieldError | undefined;
  ref?: RefObject<HTMLInputElement>;
};

export const ChoppPhoneInput = ({ value, onChange, onBlur, ref, errors }: Props) => {
  const themeToken = useThemeToken();
  const [numberInputIsFocus, setNumberInputFocus] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <InputMask
      inputRef={ref}
      mask="+7 (999) 999-99-99"
      value={value}
      onChange={onChange}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onBlur={() => {
        onBlur();
        setNumberInputFocus(false);
      }}
      placeholder="+7 (___) ___-__-__"
      onFocus={() => setNumberInputFocus(true)}
      maskChar="_"
      className={`
        w-full 
        outline-none 
        text-[14px] 
        px-[11px] 
        py-[4px] 
        rounded-lg
      `}
      style={{
        background: themeToken.colorBgContainer,
        border: `1px solid ${
          errors
            ? themeToken.colorError
            : numberInputIsFocus
              ? themeToken.colorPrimary
              : isHovered
                ? themeToken.colorPrimary
                : themeToken.colorBorder
        }`,
        transition: 'border-color 0.5s ease',
      }}></InputMask>
  );
};
