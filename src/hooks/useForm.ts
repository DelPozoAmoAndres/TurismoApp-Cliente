import { useState } from 'react';

export const useForm = <T extends Record<string, unknown>>(form: T, auxFunc?: (arg0: NonNullable<unknown>) => void) => {
  const [state, setState] = useState(form);
  const onChange = (value: any, field: keyof T) => {
    setState({
      ...state,
      [field]: value,
    });
    auxFunc && auxFunc({ [field]: value });
  };

  const onChangeMultiple = (values: Record<string, unknown>) => {
    setState({
      ...state,
      ...values,
    });
    auxFunc && auxFunc({
      ...state,
      ...values,
    });
  }

  return { ...state, onChange, onChangeMultiple };
};



