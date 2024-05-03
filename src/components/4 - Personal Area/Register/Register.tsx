import React, { useRef } from 'react';
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
  return (
    <Modal id={'register-modal-card'} title={t('sign.up')} trigger={'register-modal'} modal={modal} minHeightAndroid={570} minHeightIos={590}>
      <form onSubmit={handleRegister}>
        <IonGrid class="ion-no-padding ion-margin-horizontal">
          <IonItem lines="none">
            <Field
              label={t('personal.data.name')}
              errorText={t('personal.data.name.error')}
              placeholder={t('personal.data.name.placeholder')}
              type="text"
              onIonInput={(e) => setFormData({ ...formData, name: e.detail.value })}
              validationFn={(e) => lengthValidation(8, e)}
              value={formData.name}
            />
          </IonItem>
          <IonItem lines="none">
            <Field
              label={t('personal.data.email')}
              errorText={t('personal.data.email.error')}
              placeholder={t('personal.data.email.placeholder')}
              type="email"
              onIonInput={(e) => setFormData({ ...formData, email: e.detail.value })}
              validationFn={emailValidation}
              value={formData.email}
            />
          </IonItem>
          <IonItem lines="none">
            <Field
              label={t('personal.data.telephone')}
              errorText={t('personal.data.telephone.error')}
              placeholder={t('personal.data.telephone.placeholder')}
              type="tel"
              onIonInput={(e) => setFormData({ ...formData, telephone: e.detail.value })}
              validationFn={telephoneValidation}
              value={formData.telephone ? String(formData.telephone) : ''}
            />
          </IonItem>
          <IonItem lines="none">
            <Field
              label={t('personal.data.birthday')}
              errorText={t('personal.data.birthday.error')}
              placeholder={t('personal.data.birthday.placeholder')}
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
              label={t('personal.data.country') + ' (' + t('optional') + ')'}
              errorText={t('personal.data.country.error')}
              placeholder={t('personal.data.country.placeholder')}
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
              label={t('personal.data.password')}
              errorText={t('personal.data.password.error')}
              placeholder={t('personal.data.password.placeholder')}
              validationFn={() => true}
              type="password"
              onIonInput={(e) => {
                setFormData({ ...formData, password: e.detail.value });
              }}
              value={formData.password}
            />
          </IonItem>
          <IonItem lines="none">
            <Field
              label={t('personal.data.confirm.password')}
              errorText={t('personal.data.confirm.password.error')}
              placeholder={t('personal.data.confirm.password.placeholder')}
              validationFn={() => true}
              type="password"
              onIonInput={(e) => {
                setFormData({ ...formData, confirmPassword: e.detail.value });
              }}
              value={formData.confirmPassword}
            />
          </IonItem>
          <IonButton type="submit" expand="block">
            {loading ? <Spinner /> : t('sign.up')}
          </IonButton>
        </IonGrid>
      </form>
    </Modal>
  )
};

export default Register;
