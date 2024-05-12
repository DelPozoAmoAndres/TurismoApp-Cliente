import React, { useState } from 'react';
/* Ionic components */
import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonButton, IonIcon, IonText, IonAlert, IonRow } from '@ionic/react';
import { star } from 'ionicons/icons';
/* Styles */
import './ActivityItem.css';
/* Models */
import { Activity } from '@models/Activity';
/* i18n */
import { useTranslation } from 'react-i18next';
/* Hooks */
/* Apis */
import { deleteActivity } from '@apis/adminActivityApi';
import { IonicReactProps } from '@ionic/react/dist/types/components/IonicReactProps';
import { useLanguage } from '@hooks/useLanguage';

export const ActivityItem: React.FC<{ activity: Activity, style?: IonicReactProps["style"] }> = ({ activity, style = {} }) => {
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const { defaultLanguage } = useLanguage();

  return (
    <IonRow id="card-search" style={style}>
      <IonCard class="ion-no-margin" mode="ios" style={{ backgroundImage: 'url(' + activity.images[0] + ')', }}>
      </IonCard>
      <IonCard class="ion-no-margin card-text" color={"light"}>
        <IonCardTitle>{activity.name}</IonCardTitle>
        <IonCardSubtitle>
          <IonText color={'tertiary'} className="ion-margin-left">{activity.location}</IonText>
        </IonCardSubtitle>
        {(activity?.reviews?.length || 0) > 0 && <IonText class="ion-no-margin ion-align-items-center">
          <IonIcon icon={star} color="primary" />
          {activity?.reviews?.reduce((acc, review) => acc + review.score, 0)}/5 ({activity?.reviews?.length})
        </IonText>}
        {<IonText>
          <p>{activity.description && activity.description[defaultLanguage.code]}</p>
        </IonText>}
        <IonCardContent class="ion-no-padding" style={{ position: "absolute", bottom: 0 }}>
          <IonText color="tertiary">
            <strong>
              {activity?.events
                ? t('FROM') + " " + Math.min(...activity.events.map((e) => e.price)).toString() + "€"
                : t('sold.out')}
            </strong>
          </IonText>
          <IonButton class="main-button" routerLink={`/activity/${activity._id}`}>{t('SHOW.INFO')}</IonButton>
        </IonCardContent>
      </IonCard>
      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={() => setShowDeleteAlert(false)}
        header="Eliminar cuenta"
        message="Estás seguro que desear eliminar permanentemente esta cuenta, no podrás recuperar la cuenta"
        buttons={[
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => setShowDeleteAlert(false),
          },
          {
            text: 'Eliminar',
            handler: () => { activity._id && deleteActivity(activity._id).then(() => window.location.reload()) },
          },
        ]}
      />
    </IonRow>
  );
};
