import React from 'react';
import { IonButton, IonIcon, IonText } from '@ionic/react';
import { logoAppleAppstore, logoGooglePlaystore } from 'ionicons/icons';

import './DownloadApp.css';

const DownloadApp: React.FC = () => {
    return (
        <div className="download-section">
            <IonText>
                <h3>Descarga Nuestra App</h3>
                <p>¡Lleva a Asturias en tu bolsillo! Descarga la aplicación para tener acceso a todas nuestras actividades estés donde estés.</p>
            </IonText>
            <div className="download-buttons">
                <IonButton href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                    <IonIcon icon={logoAppleAppstore} />
                    App para IOS
                </IonButton>
                <IonButton href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" >
                    <IonIcon icon={logoGooglePlaystore} />
                    App para Android
                </IonButton>
            </div>
        </div>
    );
};

export default DownloadApp;
