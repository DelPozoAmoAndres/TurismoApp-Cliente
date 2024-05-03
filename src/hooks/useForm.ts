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


  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const validateName = (name: string) => {
    return name.trim().length > 0;
  };

  const validateTelephone = (telephone: string) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(telephone) || telephone === '';
  };

  const validateNumPersons = (numPersons: string) => {
    return Number(numPersons) > 0;
  };

  return { ...state, validateEmail, validateName, validateTelephone, validateNumPersons, onChange };
};



