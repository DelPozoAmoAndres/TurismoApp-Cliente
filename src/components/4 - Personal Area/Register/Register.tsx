import React, { useEffect, useRef } from 'react';
/* Ionic Components */
import { IonItem, IonButton, IonGrid } from '@ionic/react';
/* Components */
import Spinner from '@shared/Spinner';
import { Field } from '@shared/Field';
/* Utils */
import { dateValidation, emailValidation, lengthValidation, telephoneValidation } from '@utils/Validations';
import { formatDate } from '@utils/Utils';
/* Hooks */
import { useRegister } from '@hooks/useRegister';
/* i18n */
import { useTranslation } from 'react-i18next';
import { Modal } from '@shared/Modal';

import './Register.css';

interface RegisterProps {
  loginModal: React.MutableRefObject<HTMLIonModalElement | null>;
}

const Register: React.FC<RegisterProps> = ({ loginModal }) => {
  const modal = useRef<HTMLIonModalElement>(null); //Reference of the modal to close it
  const { formData, loading, setFormData, handleRegister } = useRegister(modal, loginModal);
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const [isFormValid, setIsFormValid] = React.useState(false);

  useEffect(() => {
    setIsFormValid(
      lengthValidation(8, formData.name) &&
      emailValidation(formData.email) &&
      (formData.telephone ? telephoneValidation(formData.telephone) : true) &&
      (formData.birthday ? dateValidation(formatDate(formData.birthday || null)) : true) &&
      lengthValidation(8, formData.password) &&
      formData.password === formData.confirmPassword
    );
  }, [formData]);

  useEffect(() => {
    modal.current?.onWillDismiss().then(() => {
      loginModal.current?.dismiss();
      setFormData({
        name: '',
        telephone: '',
        email: '',
        birthday: null,
        country: null,
        password: '',
        confirmPassword: '',
      });
    });
    // eslint-disable-next-line
  }, [modal]);

  return (
    <Modal id={'register-modal-card'} title={t('ACTIONS.SIGN.UP')} trigger={'register-modal'} modal={modal}>
      <form onSubmit={handleRegister}>
        <IonGrid class="ion-no-padding ion-margin-horizontal">
          <IonItem lines="none">
            <Field
              label={t('DATA.NAME.LABEL')}
              errorText={t('DATA.NAME.ERROR')}
              placeholder={t('DATA.NAME.PLACEHOLDER')}
              type="text"
              onIonInput={(e) => setFormData({ ...formData, name: e.detail.value })}
              validationFn={(e) => lengthValidation(8, e)}
              value={formData.name}
            />
          </IonItem>
          <IonItem lines="none">
            <Field
              label={t('DATA.EMAIL.LABEL')}
              errorText={t('DATA.EMAIL.ERROR')}
              placeholder={t('DATA.EMAIL.PLACEHOLDER')}
              type="email"
              onIonInput={(e) => setFormData({ ...formData, email: e.detail.value })}
              validationFn={emailValidation}
              value={formData.email}
            />
          </IonItem>
          <IonItem lines="none">
            <Field
              label={t('DATA.TELEPHONE.LABEL') + ' (' + t('OPTIONAL') + ')'}
              errorText={t('DATA.TELEPHONE.ERROR')}
              placeholder={t('DATA.TELEPHONE.PLACEHOLDER')}
              type="tel"
              onIonInput={(e) => setFormData({ ...formData, telephone: e.detail.value })}
              validationFn={telephoneValidation}
              value={formData.telephone ? String(formData.telephone) : ''}
            />
          </IonItem>
          <IonItem lines="none">
            <Field
              label={t('DATA.BIRTHDAY.LABEL') + ' (' + t('OPTIONAL') + ')'}
              errorText={t('DATA.BIRTHDAY.ERROR')}
              placeholder={t('DATA.BIRTHDAY.PLACEHOLDER')}
              validationFn={dateValidation}
              type="date"
              onIonInput={(e) => {
                setFormData({ ...formData, birthday: new Date(e.detail.value) });
              }}
              value={formatDate(formData.birthday || null)}
            />
          </IonItem>
          <IonItem lines="none">
            <Field
              label={t('DATA.COUNTRY.LABEL') + ' (' + t('OPTIONAL') + ')'}
              errorText={t('DATA.COUNTRY.error')}
              placeholder={t('DATA.COUNTRY.PLACEHOLDER')}
              validationFn={() => true}
              type="text"
              onIonInput={(e) => {
                setFormData({ ...formData, country: e.detail.value });
              }}
              value={formData.country ? formData.country : ''}
            />
          </IonItem>

          <IonItem lines="none">
            <Field
              label={t('DATA.PASSWORD.LABEL')}
              errorText={t('DATA.PASSWORD.ERROR')}
              placeholder={t('DATA.PASSWORD.PLACEHOLDER')}
              validationFn={(e) => lengthValidation(8, e)}
              type="password"
              onIonInput={(e) => {
                setFormData({ ...formData, password: e.detail.value });
              }}
              value={formData.password}
            />
          </IonItem>
          <IonItem lines="none">
            <Field
              label={t('DATA.PASSWORD.CONFIRM.LABEL')}
              errorText={t('DATA.PASSWORD.CONFIRM.ERROR')}
              placeholder={t('DATA.PASSWORD.CONFIRM.PLACEHOLDER')}
              validationFn={(e) => e === formData.password}
              type="password"
              onIonInput={(e) => {
                setFormData({ ...formData, confirmPassword: e.detail.value });
              }}
              value={formData.confirmPassword}
            />
          </IonItem>
          <IonButton disabled={!isFormValid} type="submit" expand="block">
            {loading ? <Spinner /> : t('ACTIONS.SIGN.UP')}
          </IonButton>
        </IonGrid>
      </form>
    </Modal>
  )
};

export default Register;
