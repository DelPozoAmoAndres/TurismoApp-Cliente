import React from 'react';
import { IonFooter, IonToolbar, IonGrid, IonRow, IonCol, IonText } from '@ionic/react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <IonFooter>
      <IonToolbar>
        <div className="limits-content">
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonText>
                  <h3>{t('CONTACT.TITLE')}</h3>
                  <p>{t('DATA.EMAIL.LABEL')}: contacto@turismoasturias.com</p>
                  <p>{t('DATA.TELEPHONE.LABEL')}: +34 123 456 789</p>
                </IonText>
              </IonCol>
              {/* <IonCol>
                <DownloadApp />
              </IonCol> */}
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
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;