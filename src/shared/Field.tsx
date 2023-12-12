import React, { useState } from 'react';
import { IonInput } from '@ionic/react';

interface FieldProps {
  value: string;
  label: string;
  type: typeof IonInput.prototype.defaultProps.type;
  placeholder: string;
  errorText: string;
  labelPlacement?: typeof IonInput.prototype.defaultProps.labelPlacement;
  validationFn: (value: string) => boolean;
  onIonInput: (value: CustomEvent) => void;
}

export const Field: React.FC<FieldProps> = ({ value, errorText, label, type, placeholder, labelPlacement, validationFn, onIonInput }) => {
  const [isValid, setIsValid] = useState<boolean | undefined>();
  const [isTouched, setIsTouched] = useState(false);

  const validate = (ev: CustomEvent) => {
    const fieldValue = ev.detail.value;

    setIsValid(undefined);

    if (fieldValue === '') return;

    const isValidValue = validationFn(fieldValue);
    setIsValid(isValidValue);
  };

  const markTouched = () => {
    setIsTouched(true);
  };

  return (
    <IonInput
      className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
      type={type}
      labelPlacement={labelPlacement ?? 'floating'}
      label={label}
      value={value}
      placeholder={placeholder}
      errorText={errorText}
      onIonInput={(event) => {
        validate(event);
        onIonInput(event);
      }}
      onIonBlur={() => markTouched()}
    ></IonInput>
  );
};
