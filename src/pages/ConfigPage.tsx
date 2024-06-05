import GenericAppLayout from '@components/app/layouts/GenericAppLayout';
import { IonCol, IonGrid, IonIcon, IonList, IonRow, IonText } from '@ionic/react';
import DarkModeToggle from '@shared/DarkModeToggle';
import LanguageSelector from '@shared/LanguageSelector';
import { settingsOutline } from 'ionicons/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ConfigPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <GenericAppLayout>
            <IonList class='ion-margin'>
                <IonRow class='ion-justify-content-center'>
                    <IonIcon icon={settingsOutline} style={{ fontSize: "128px" }} />
                </IonRow>
                <h2 className={'ion-margin'} style={{ textAlign: "center" }}>{t('PROFILE.SETTINGS.TITLE')}</h2>
                <DarkModeToggle hidden={false} />
                <LanguageSelector hidden={false} />
            </IonList>
            <footer style={{ position: "fixed", bottom: "0", width: "100%", color: "var(--ion-color-dark)", backgroundColor: "var(--ion--color--background)" }}>
                <div className="limits-content">
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonText>
                                    <h3>{t('CONTACT.TITLE')}</h3>
                                    <p>{t('DATA.EMAIL.LABEL')}: info@astour.online</p>
                                    <p>{t('DATA.TELEPHONE.LABEL')}: +34 123 123 123</p>
                                </IonText>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="12">
                                <IonText className="ion-text-center">
                                    <small>&copy; {new Date().getFullYear()} {t('CONTACT.FOOTER')}</small>
                                </IonText>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            </footer>

        </GenericAppLayout>
    );
};

export default ConfigPage;