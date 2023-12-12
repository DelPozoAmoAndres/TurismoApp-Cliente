import { useState } from 'react';

export const useForm = <T extends Record<string, unknown>>(form: T, auxFunc?: (arg0: NonNullable<unknown>) => void) => {
  const [state, setState] = useState(form);
  const onChange = (value: string, field: keyof T) => {
    setState({
      ...state,
      [field]: value,
    });
    auxFunc && auxFunc({ [field]: value });
  };

  return { ...state, onChange };
};
