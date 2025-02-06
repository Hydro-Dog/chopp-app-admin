import { useEffect } from 'react';

type Args = {
  inputRef: React.RefObject<HTMLInputElement>;
  open: boolean;
};

export const useAutoFocus = ({ open, inputRef }: Args) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);
};
