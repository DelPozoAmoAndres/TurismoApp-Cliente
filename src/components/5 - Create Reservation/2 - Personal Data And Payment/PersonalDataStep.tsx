import React from 'react';
/* Ionic Components */
import { IonCheckbox, IonLabel, IonRow, IonTitle } from '@ionic/react';
import { Capacitor } from '@capacitor/core';
/* Hooks */
import { useForm } from '@hooks/useForm';
/* Components */
import { Field } from '@shared/Field';
import StripeCheckoutMobileButton from '@create-reservation/2 - Personal Data And Payment/Payment/Mobile/StripeCheckOutMobileButton';
import { StripeCheckOutWebButton } from '@create-reservation/2 - Personal Data And Payment/Payment/Web/StripeCheckOutWebButton';
/* Contexts */
import { ReservationContext, useReservation } from '@contexts/ReservationContext'; 
/* i18n */
import { useTranslation } from 'react-i18next';

export const PersonalDataStep: React.FC = () => {
  const { t } = useTranslation();
  const { setPersonalData } = useReservation();
  const { name, email, telephone, numPersons, onChange } = useForm(
    {
      name: '',
      email: '',
      telephone: '',
      numPersons: 1,
    },
    setPersonalData
  );

  return (
    <ReservationContext.Consumer>
      {({ reservation }) => (
        <>
          <IonRow class="ion-margin-top">
            <IonTitle>
              <strong>{t('reservation.data.title')}</strong>
            </IonTitle>
          </IonRow>
          <IonRow class="ion-margin-top">
            <Field
              label={t('personal.data.name')}
              onIonInput={(e) => onChange(e.detail.value, 'name')}
              placeholder={t('personal.data.name.placeholder')}
              type={'text'}
              errorText={t('personal.data.name.error')}
              validationFn={() => true}
              value={name}
            />
          </IonRow>
          <Field
            label={t('personal.data.email')}
            onIonInput={(e) => onChange(e.detail.value, 'email')}
            placeholder={t('personal.data.email.placeholder')}
            type={'email'}
            errorText={t('personal.data.email.error')}
            validationFn={() => true}
            value={email}
          />
          <Field
            label={t('personal.data.telephone') + ' (' + t('optional') + ')'}
            onIonInput={(e) => onChange(e.detail.value, 'telephone')}
            placeholder={t('personal.data.telephone.placeholder')}
            type={'text'}
            errorText={t('personal.data.telephone.error')}
            validationFn={() => true}
            value={telephone}
          />
          <Field
            label={t('number.of.seats')}
            onIonInput={(e) => onChange(e.detail.value, 'numPersons')}
            placeholder={t('number.of.seats.placeholder')}
            type={'number'}
            errorText={t('number.of.seats.error')}
            validationFn={() => true}
            value={String(numPersons)}
          />
          <IonCheckbox labelPlacement="end">{t('privacy.policy')}</IonCheckbox>
          <IonRow class="ion-margin-top ion-padding-top">
            <IonLabel>{t('total.price')}:</IonLabel>
            <IonLabel>{reservation.price + '€'}</IonLabel>
          </IonRow>
          <IonRow>{Capacitor.isNativePlatform() ? <StripeCheckoutMobileButton /> : <StripeCheckOutWebButton />}</IonRow>
        </>
      )}
    </ReservationContext.Consumer>
  );
};
