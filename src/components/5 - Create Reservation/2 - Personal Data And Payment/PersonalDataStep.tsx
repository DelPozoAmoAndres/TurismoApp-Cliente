import React, { useEffect } from 'react';
/* Ionic Components */
import { IonCheckbox, IonRow, IonText, IonTitle } from '@ionic/react';
/* Hooks */
import { useForm } from '@hooks/useForm';
/* Components */
import { Field } from '@shared/Field';
import { StripeCheckOutWebButton } from '@create-reservation/2 - Personal Data And Payment/Payment/Web/StripeCheckOutWebButton';
/* Contexts */
import { useReservation } from '@contexts/ReservationContext';
/* i18n */
import { useTranslation } from 'react-i18next';
import { emailValidation, lengthValidation, telephoneValidation } from '@utils/Validations';
import { useScreen } from '@hooks/useScreen';
import { useAuth } from '@contexts/AuthContexts';

export const PersonalDataStep: React.FC<{ numPersons: number }> = ({ numPersons }) => {
  const { t } = useTranslation();
  const { setPersonalData, setPrivacyPolicy, privacyPolicy } = useReservation();
  const { browsingWeb } = useScreen();
  const auth = useAuth();
  const { name, email, telephone, onChange, onChangeMultiple } = useForm(
    {
      name: '',
      email: '',
      telephone: '',
      numPersons
    },
    setPersonalData
  );

  useEffect(() => {
    if (auth.user) {
      onChangeMultiple({
        name: auth.user?.name,
        email: auth.user?.email,
        telephone: Number(auth.user?.telephone || 0),
        numPersons: numPersons
      });
    }
    //eslint-disable-next-line
  }, [auth.user]);

  return (
    <>
      <section className='ion-padding ion-margin-vertical' style={{ background: "var(--ion--color--background)", borderRadius: 20 }}>
        <IonRow class="ion-margin-top">
          <IonTitle class='ion-no-padding'>
            <strong>{t('reservation.data.title')}</strong>
          </IonTitle>
        </IonRow>
        <IonRow class="ion-margin-top">
          <Field
            label={t('DATA.NAME.LABEL')}
            onIonInput={(e) => e.detail.value.length && onChange(e.detail.value, 'name')}
            placeholder={t('DATA.NAME.PLACEHOLDER')}
            type={'text'}
            errorText={t('DATA.NAME.ERROR')}
            validationFn={name => lengthValidation(8, name)}
            value={name}
          />
        </IonRow>
        <Field
          label={t('DATA.EMAIL.LABEL')}
          onIonInput={(e) => e.detail.value.length && onChange(e.detail.value, 'email')}
          placeholder={t('DATA.EMAIL.PLACEHOLDER')}
          type={'email'}
          errorText={t('DATA.EMAIL.ERROR')}
          validationFn={emailValidation}
          value={email}
        />
        <Field
          label={t('DATA.TELEPHONE.LABEL') + ' (' + t('OPTIONAL') + ')'}
          onIonInput={(e) => e.detail.value.length && onChange(e.detail.value, 'telephone')}
          placeholder={t('DATA.TELEPHONE.PLACEHOLDER')}
          type={''}
          errorText={t('DATA.TELEPHONE.ERROR')}
          validationFn={telephoneValidation}
          value={telephone}
        />
        <IonCheckbox class='ion-margin-vertical' style={{}} onIonChange={(e) => setPrivacyPolicy(e.detail.checked)} labelPlacement="end" checked={privacyPolicy}><IonText style={{ "text-wrap": "pretty" }}>{t('privacy.policy')}</IonText> </IonCheckbox>
      </section>
      {browsingWeb && <section style={{ background: "var(--ion--color--background)", borderRadius: 20 }}>
        <IonRow class="ion-padding ion-margin-top">
          <IonTitle class='ion-no-padding ion-padding-top'>
            <strong>{t('reservation.card.title')}</strong>
          </IonTitle>
        </IonRow>
        <StripeCheckOutWebButton />
      </section>}
    </>
  );
};
