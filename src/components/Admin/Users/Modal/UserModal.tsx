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
import "./UserModal.css";
import { dateValidation, emailValidation, lengthValidation, telephoneValidation } from '@utils/Validations';
import { useScreen } from '@hooks/useScreen';

export const UserModal: React.FC<{ user: User, action: "add" | "edit", updateInfo: () => void }> = ({ user, action, updateInfo }) => {
  const { t } = useTranslation();
  const auth = useAuth();
  const modal = useRef<HTMLIonModalElement>(null);
  const closeModal = () => { modal.current?.dismiss(); updateInfo(); }
  const { formData, setFormData, guardarCambios, edited } = useEdit(user, action == "add" ? registerUser : (auth.user?.role == Role.administrador ? editUser : editProfile), closeModal);
  const [isFormValid, setIsFormValid] = React.useState(false);
  const { isMobile } = useScreen();

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
    <Modal id={'modal-user'} trigger={user?._id || "modal-user-add"} title={t("USER.TITLE." + action.toUpperCase())} modal={modal}>
      <IonRow class='ion-margin-horizontal ion-align-items-center ion-justify-content-center'>
        <IonGrid class='ion-no-padding ion-margin-end'>
          <IonRow class='ion-justify-content-center'>
            <img src={"https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_person_people_avatar_white_tone_icon_159365.png"} width={action == "add" ? 90 : 150} />
          </IonRow>
          <IonItem lines='none'>
            <Field
              value={formData.name}
              label={t('DATA.NAME.LABEL')}
              errorText={t('DATA.NAME.ERROR')}
              placeholder={t('DATA.NAME.PLACEHOLDER')}
              type="text"
              validationFn={(e) => lengthValidation(8, e)}
              onIonInput={(e) => setFormData({ ...formData, name: e.detail.value || '' })}
            />
          </IonItem>
          {action == "add" &&
            <IonItem lines='none'>
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
          }
          <IonItem lines='none'>
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
              label={t('DATA.BIRTHDAY.LABEL')}
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
              label={t('DATA.TELEPHONE.LABEL')}
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
          {auth.user?.role === Role.administrador && !isMobile &&
            <IonItem lines='none'>
              <IonSegment mode="ios" value={formData?.role} onIonChange={(e) => formData && e.detail.value && setFormData({ ...formData, role: e.detail.value as Role })}>
                {Object.values(Role).map((value, index) =>
                  <IonSegmentButton key={"role" + index} value={value}>
                    <IonLabel>{t("ROLE." + value.toUpperCase())}</IonLabel>
                  </IonSegmentButton>)}
              </IonSegment>
            </IonItem>}
          <div className='ion-margin-start'>
            {action == "add" ?
              <IonButton disabled={!edited || !isFormValid} expand="block" onClick={guardarCambios}>
                {t('ACTIONS.CREATE')}
              </IonButton>
              :
              <IonButton disabled={!edited || !isFormValid} expand="block" onClick={guardarCambios}>
                {t('ACTIONS.SAVE')}
              </IonButton>}
          </div>
        </IonGrid>
      </IonRow>
    </Modal>
  )
}