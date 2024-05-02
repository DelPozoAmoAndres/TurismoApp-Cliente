import React from 'react';
import { IonFooter, IonToolbar, IonGrid, IonRow, IonCol, IonText } from '@ionic/react';
import DownloadApp from '@components/1 - Home/DownloadApp';

const Footer: React.FC = () => {
  return (
    <IonFooter>
      <IonToolbar>
        <div className="limits-content">
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonText>
                  <h3>Contacto</h3>
                  <p>Email: contacto@turismoasturias.com</p>
                  <p>Teléfono: +34 123 456 789</p>
                </IonText>
              </IonCol>
              {/* <IonCol>
                <DownloadApp />
              </IonCol> */}
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonText  className="ion-text-center">
                  <small>&copy; {new Date().getFullYear()} Turismo Asturias. Todos los derechos reservados.</small>
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