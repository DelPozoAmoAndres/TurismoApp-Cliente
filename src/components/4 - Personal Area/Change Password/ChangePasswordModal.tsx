import React, { useRef } from 'react'
/* Ionic components */
import { IonButton, IonGrid, IonIcon, IonInput, IonItem, IonRow } from '@ionic/react'
import { shieldOutline } from 'ionicons/icons'
/* Components */
import { Modal } from '@shared/Modal'
/* Hooks */
import { useChangePassword } from '@hooks/useChangePassword'
/* i18n */
import { useTranslation } from 'react-i18next'

import "./ChangePasswordModal.css"

export const ChangePasswordModal: React.FC = () => {
    const modal = useRef<HTMLIonModalElement>(null)
    const { check, confirmPassword, oldPassword, password, setConfirmPassword, setOldPassword, setPassword } = useChangePassword();
    const { t } = useTranslation();
    return (
        <Modal id="modal-change-password" tittle={t("change.password.title")} trigger='password-change-modal' minWidthAndroid={550} minWidthIos={492} modal={modal} >
            <IonRow class='ion-justify-content-center'>
                <IonIcon icon={shieldOutline} style={{ fontSize: "128px" }} />
            </IonRow>
            <IonGrid class='ion-no-padding ion-margin-end'>
                <IonItem>
                    <IonInput
                        value={oldPassword}
                        label="Contraseña actual"
                        labelPlacement="stacked"
                        onIonInput={(e) => e.detail.value && setOldPassword(e.detail.value)}
                    ></IonInput>
                </IonItem>
                <IonItem>
                    <IonInput
                        value={password}
                        label="Nueva contraseña"
                        labelPlacement="stacked"
                        onIonInput={(e) => e.detail.value && setPassword(e.detail.value)}
                    ></IonInput>
                </IonItem>
                <IonItem>
                    <IonInput
                        value={confirmPassword}
                        label="Confirmacion de nueva contraseña"
                        labelPlacement="stacked"
                        onIonInput={(e) => e.detail.value && setConfirmPassword(e.detail.value)}
                    ></IonInput>
                </IonItem>
                <div className='ion-margin-start'>
                    <IonButton expand="block" onClick={check}>
                        Cambiar
                    </IonButton>
                </div>
            </IonGrid>
        </Modal>
    )
}
