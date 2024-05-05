import React, { useEffect, useRef } from 'react';
import { Role, User } from '@models/User';
import { useTranslation } from 'react-i18next';
import { useEdit } from '@hooks/useEdit';
import { Modal } from '@shared/Modal';
import { IonButton, IonGrid, IonItem, IonLabel, IonRow, IonSegment, IonSegmentButton } from '@ionic/react';
import { formatDate } from '@utils/Utils';
import { editProfile } from '@apis/userApi';
import { editUser, registerUser } from '@apis/adminUserApi';
import { useAuth } from '@contexts/AuthContexts';
import { Field } from '@shared/Field';
import { dateValidation, emailValidation, lengthValidation, telephoneValidation } from '@utils/Validations';

export const UserModal: React.FC<{ user: User, action: "add" | "edit", updateInfo: () => void }> = ({ user, action, updateInfo }) => {
  const { t } = useTranslation();
  const auth = useAuth();
  const modal = useRef<HTMLIonModalElement>(null);
  const closeModal = () => { modal.current?.dismiss(); updateInfo(); }
  const { formData, setFormData, guardarCambios, edited } = useEdit(user, action == "add" ? registerUser : (auth.user?.role == Role.administrador ? editUser : editProfile), closeModal);
  const [isFormValid, setIsFormValid] = React.useState(false);

  useEffect(() => {
    setIsFormValid(
      lengthValidation(8, formData.name) &&
      emailValidation(formData.email) &&
      (formData.telephone ? telephoneValidation(String(formData.telephone)) : true) &&
      (formData.birthday ? dateValidation(formatDate(formData.birthday)) : true) &&
      (action == "add" ? lengthValidation(8, formData.password) : true)
    );
    //eslint-disable-next-line
  }, [formData]);

  return (
    <Modal id={'modal-user-' + action} trigger={user?._id || "modal-user-add"} minHeightAndroid={500} minHeightIos={500} title={t("user." + action + ".title")} modal={modal} >
      <IonRow class='ion-margin-horizontal ion-align-items-center ion-justify-content-center'>
        <IonGrid class='ion-no-padding ion-margin-end'>
          <IonRow class='ion-justify-content-center'>
            <img src={"https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_person_people_avatar_white_tone_icon_159365.png"} width={action == "add" ? 90 : 150} />
          </IonRow>
          <IonItem lines='none'>
            <Field
              value={formData.name}
              label={t('personal.data.name')}
              errorText={t('personal.data.name.error')}
              placeholder={t('personal.data.name.placeholder')}
              type="text"
              validationFn={(e) => lengthValidation(8, e)}
              onIonInput={(e) => setFormData({ ...formData, name: e.detail.value || '' })}
            />
          </IonItem>
          {action == "add" &&
            <IonItem lines='none'>
              <Field
                label={t('personal.data.password')}
                errorText={t('personal.data.password.error')}
                placeholder={t('personal.data.password.placeholder')}
                validationFn={(e) => lengthValidation(8, e)}
                type="password"
                onIonInput={(e) => {
                  setFormData({ ...formData, password: e.detail.value });
                }}
                value={formData.password}
              />
            </IonItem>
          }
          <IonItem lines='none'>
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
          {auth.user?.role === Role.administrador &&
            <IonItem lines='none'>
              <IonSegment mode="ios" value={formData?.role} onIonChange={(e) => formData && e.detail.value && setFormData({ ...formData, role: e.detail.value as Role })}>
                {Object.values(Role).map((value, index) =>
                  <IonSegmentButton key={"role" + index} value={value}>
                    <IonLabel>{t("role." + value)}</IonLabel>
                  </IonSegmentButton>)}
              </IonSegment>
            </IonItem>}
          <div className='ion-margin-start'>
            {action == "add" ?
              <IonButton disabled={!edited || !isFormValid} expand="block" onClick={guardarCambios}>
                Crear usuario
              </IonButton>
              :
              <IonButton disabled={!edited || !isFormValid} expand="block" onClick={guardarCambios}>
                Guardar cambios
              </IonButton>}
          </div>
        </IonGrid>
      </IonRow>
    </Modal>
  )
}