import React from 'react';
import { IonContent, IonButton, IonLabel, IonIcon, IonRow } from '@ionic/react';
import { list } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';

const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  return (
    <IonContent>
      <IonRow style={{ height: '100%', gap: '20px' }} class="ion-justify-content-center ion-align-items-center">
        <div>
          <IonButton routerLink="/admin/users" style={{ height: '200px', width: '500px' }}>
            <IonIcon slot="start" icon={list} style={{ fontSize: '128px' }} />
            <IonLabel>{t('adminDashboard.listUsers')}</IonLabel>
          </IonButton>
        </div>
        <IonButton routerLink="/buscar" style={{ height: '200px', width: '500px' }}>
          <IonIcon slot="start" icon={list} style={{ fontSize: '128px' }} />
          <IonLabel>Listar actividades</IonLabel>
        </IonButton>
      </IonRow>
    </IonContent>
  );
};

export default AdminDashboard;
