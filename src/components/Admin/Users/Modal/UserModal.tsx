import React, { useRef } from 'react';
import { Role, User } from '@models/User';
import { useTranslation } from 'react-i18next';
import { useEdit } from '@hooks/useEdit';
import { Modal } from '@shared/Modal';
import { IonButton, IonGrid, IonInput, IonItem, IonLabel, IonRow, IonSegment, IonSegmentButton } from '@ionic/react';
import { formatDate } from '@utils/Utils';
import { editProfile } from '@apis/userApi';
import { editUser, registerUser } from '@apis/adminUserApi';
import { useAuth } from '@contexts/AuthContexts';

export const UserModal: React.FC<{ user: User, action: "add" | "edit", updateInfo: () => void }> = ({ user, action, updateInfo }) => {
  const { t } = useTranslation();
  const auth = useAuth();
  const modal = useRef<HTMLIonModalElement>(null);
  const closeModal = () => { modal.current?.dismiss(); updateInfo(); }
  const { formData, setFormData, guardarCambios, edited } = useEdit(user, action == "add" ? registerUser : (auth.user?.role == Role.administrador ? editUser : editProfile), closeModal);

  return (
    <Modal id={'modal-user-' + action} trigger={user?._id || "modal-user-add"} minHeightAndroid={500} minHeightIos={500} title={t("user." + action + ".title")} modal={modal} >
      <IonRow class='ion-margin-horizontal ion-align-items-center ion-justify-content-center'>
        <IonGrid class='ion-no-padding ion-margin-end'>
          <IonRow class='ion-justify-content-center'>
            <img src={"https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_person_people_avatar_white_tone_icon_159365.png"} width={action == "add" ? 90 : 150} />
          </IonRow>
          <IonItem>
            <IonInput
              value={formData?.name}
              label="Nombre"
              labelPlacement="stacked"
              onIonInput={(e) => formData && setFormData({ ...formData, name: e.detail.value || '' })}
            ></IonInput>
          </IonItem>
          {action == "add" &&
            <IonItem >
              <IonInput
                value={formData?.password}
                label="Password"
                labelPlacement="stacked"
                onIonInput={(e) => formData && setFormData({ ...formData, password: e.detail.value || '' })}
              ></IonInput>
            </IonItem>
          }
          <IonItem>
            <IonInput
              value={formData?.email}
              label="Email"
              labelPlacement="stacked"
              onIonInput={(e) => formData && setFormData({ ...formData, email: e.detail.value || '' })}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              value={formatDate(formData?.birthday || null)}
              label="Fecha de nacimiento"
              type='date'
              labelPlacement="stacked"
              onIonInput={(e) => formData && setFormData({ ...formData, birthday: e.detail.value ? new Date(e.detail.value) : null })}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              value={formData?.telephone}
              label="Telephone"
              type='tel'
              inputmode="numeric"
              labelPlacement="stacked"
              onIonInput={(e) => formData && setFormData({ ...formData, telephone: e.detail.value || '' })}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              value={formData?.country}
              label="Pais"
              labelPlacement="stacked"
              onIonInput={(e) => formData && setFormData({ ...formData, country: e.detail.value || '' })}
            ></IonInput>
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
              <IonButton disabled={!edited} expand="block" onClick={guardarCambios}>
                Crear usuario
              </IonButton>
              :
              <IonButton disabled={!edited} expand="block" onClick={guardarCambios}>
                Guardar cambios
              </IonButton>}
          </div>
        </IonGrid>
      </IonRow>
    </Modal>
  )
}