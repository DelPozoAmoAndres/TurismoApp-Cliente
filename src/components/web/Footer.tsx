import React from 'react';
import { IonFooter, IonToolbar, IonGrid, IonRow, IonCol, IonText } from '@ionic/react';
import DownloadApp from '@components/1 - Home/DownloadApp';

const Footer: React.FC = () => {
  return (
    <IonFooter>
      <IonToolbar color="tertiary">
        <div className="limits-content">
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonText color="light">
                  <h3>Contacto</h3>
                  <p>Email: contacto@turismoasturias.com</p>
                  <p>Teléfono: +34 123 456 789</p>
                </IonText>
              </IonCol>
              <IonCol>
                <DownloadApp />
              </IonCol>
              {/* <IonCol>
                <IonText color="light" class='ion-text-center'>
                  <h3>Enlaces Útiles</h3>
                  <p><a href="/tours">Tours</a></p>
                  <p><a href="/actividades">Actividades</a></p>
                  <p><a href="/ayuda">Ayuda</a></p>
                </IonText>
              </IonCol>
              <IonCol>
                <IonText color="light" class='ion-text-right'>
                  <h3>Síguenos</h3>
                  <p><a href="https://www.facebook.com/">Facebook</a></p>
                  <p><a href="https://www.instagram.com/">Instagram</a></p>
                  <p><a href="https://www.twitter.com/">Twitter</a></p>
                </IonText>
              </IonCol> */}
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonText color="light" className="ion-text-center">
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