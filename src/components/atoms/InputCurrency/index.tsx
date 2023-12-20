import S from './styles.module.scss';

import { forwardRef, useEffect, useRef, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

const InputCurrency = forwardRef(function InputCurrency(props: any, ref: any) {
  const { value = null, onChange } = props;

  const [currency, setCurrency] = useState(null);

  const onValueChange = (value) => {
    setCurrency(value);
    onChange(value);
  };

  useEffect(() => {
    setCurrency(value);
  }, [value]);

  return (
    <CurrencyInput
      ref={ref}
      value={currency}
      placeholder="R$"
      decimalsLimit={2}
      maxLength={8}
      onValueChange={onValueChange}
      className={`${S.style} ant-input ant-input-sm`}
      prefix="R$ "
    />
  );
});

export default InputCurrency;
