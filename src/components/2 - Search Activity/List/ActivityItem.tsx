import React, { useState } from 'react';
/* Ionic components */
import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonButton, IonIcon, IonItem, IonText, IonAlert, IonContent, IonRow } from '@ionic/react';
import { pencilOutline, star, trashOutline } from 'ionicons/icons';
/* Styles */
import './ActivityItem.css';
/* Models */
import { Activity } from '@models/Activity';
import { Role } from '@models/User';
/* i18n */
import { useTranslation } from 'react-i18next';
import { useAuth } from '@contexts/AuthContexts';
/* Hooks */
import { useScreen } from '@hooks/useScreen';
/* Apis */
import { deleteActivity } from '@apis/adminActivityApi';
import { ActivityModal } from '@components/Admin/Activities/Modal/ActivityModal';
import { IonicReactProps } from '@ionic/react/dist/types/components/IonicReactProps';
import { useLanguage } from '@hooks/useLanguage';

export const ActivityItem: React.FC<{ activity: Activity, style?: IonicReactProps["style"] }> = ({ activity, style = {} }) => {
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const auth = useAuth(); //Context of the user
  const { isMobile } = useScreen(); //Hook to have data of screen dimensions
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
        {(activity?.reviews?.length || 0 ) > 0 && <IonText class="ion-no-margin ion-align-items-center">
          <IonIcon icon={star} color="primary" />
          {activity?.reviews?.reduce((acc, review) => acc + review.score, 0)}/5 ({activity?.reviews?.length})
        </IonText>}
        {<IonText>
          <p>{activity.description[defaultLanguage.code]}</p>
        </IonText>}
        <IonCardContent class="ion-no-padding" style={{ position: "absolute", bottom: 0}}>
          <IonText color="tertiary"> 
            <strong>
              {activity?.events && t('from') + activity?.events && activity.events.length > 0
                ? t('from') + " " + Math.min(...activity.events.map((e) => e.price)).toString()+"€"
                : t('sold.out')}
            </strong>
          </IonText>
          <IonButton class="main-button" routerLink={`/activity/${activity._id}`}>{t('show.info')}</IonButton>
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
