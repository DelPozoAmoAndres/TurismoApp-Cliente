import React, { useEffect, useRef } from 'react'
/* Ionic components */
import { IonButton, IonGrid, IonIcon, IonItem, IonRow } from '@ionic/react'
import { shieldOutline } from 'ionicons/icons'
/* Components */
import { Modal } from '@shared/Modal'
/* Hooks */
import { useChangePassword } from '@hooks/useChangePassword'
/* i18n */
import { useTranslation } from 'react-i18next'

import "./ChangePasswordModal.css"
import { Field } from '@shared/Field'
import { lengthValidation } from '@utils/Validations'

export const ChangePasswordModal: React.FC = () => {
    const modal = useRef<HTMLIonModalElement>(null)
    const { check, confirmPassword, oldPassword, password, setConfirmPassword, setOldPassword, setPassword } = useChangePassword();
    const { t } = useTranslation();

    const [isFormValid, setIsFormValid] = React.useState(false);

    useEffect(() => {
        setIsFormValid(
            lengthValidation(1, oldPassword) &&
            lengthValidation(8, password) &&
            password === confirmPassword
        );
    }, [oldPassword, password, confirmPassword]);

    return (
        <Modal id="modal-change-password" title={t("PROFILE.ACCOUNT.PASSWORD.CHANGE")} trigger='password-change-modal' minHeightAndroid={550} minHeightIos={492} modal={modal} >
            <IonRow class='ion-justify-content-center'>
                <IonIcon icon={shieldOutline} style={{ fontSize: "128px" }} />
            </IonRow>
            <IonGrid class='ion-no-padding ion-margin-end'>
                <IonItem lines='none'>
                    <Field
                        label={t('DATA.PASSWORD.CURRENT.LABEL')}
                        errorText={t('DATA.PASSWORD.ERROR')}
                        placeholder={t('DATA.PASSWORD.CURRENT.PLACEHOLDER')}
                        validationFn={(e) => lengthValidation(1, e)}
                        type="password"
                        onIonInput={(e) => {
                            setOldPassword(e.detail.value);
                        }}
                        value={oldPassword}
                    />
                </IonItem>
                <IonItem lines='none'>
                    <Field
                        label={t('DATA.PASSWORD.LABEL')}
                        errorText={t('DATA.PASSWORD.ERROR')}
                        placeholder={t('DATA.PASSWORD.PLACEHOLDER')}
                        validationFn={(e) => lengthValidation(8, e)}
                        type="password"
                        onIonInput={(e) => {
                            setPassword(e.detail.value);
                        }}
                        value={password}
                    />
                </IonItem>
                <IonItem lines='none'>
                    <Field
                        label={t('DATA.PASSWORD.CONFIRM.LABEL')}
                        errorText={t('DATA.PASSWORD.CONFIRM.ERROR')}
                        placeholder={t('DATA.PASSWORD.CONFIRM.PLACEHOLDER')}
                        validationFn={(e) => e === password}
                        type="password"
                        onIonInput={(e) => {
                            setConfirmPassword(e.detail.value);
                        }}
                        value={confirmPassword}
                    />
                </IonItem>
                <div className='ion-margin-start'>
                    <IonButton expand="block" disabled={!isFormValid} onClick={async () => { check().then((res: boolean) => { console.log(res, modal); if (res) modal.current?.dismiss() }) }}>
                        Cambiar
                    </IonButton>
                </div>
            </IonGrid>
        </Modal>
    )
}
