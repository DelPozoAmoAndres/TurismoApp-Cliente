import React, { useState } from 'react';
/* Ionic components */
import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonButton, IonIcon, IonItem, IonText, IonAlert, IonCol } from '@ionic/react';
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
import { ActivityModal } from '@components/2 - Search Activity/Modal/ActivityModal';
import { IonicReactProps } from '@ionic/react/dist/types/components/IonicReactProps';

export const ActivityItem: React.FC<{ activity: Activity, style?: IonicReactProps["style"] }> = ({ activity, style = {} }) => {
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const auth = useAuth(); //Context of the user
  const { isMobile } = useScreen(); //Hook to have data of screen dimensions
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);

  return (
    <IonItem id="card-search" lines="none" style={style}>
      <IonCard class="ion-no-margin" mode="ios" style={{ backgroundImage: 'url(' + activity.images[0] + ')', }}>
      </IonCard>
      <IonCard class="ion-no-margin" color={"light"}>
        <IonCardTitle>{activity.name}</IonCardTitle>
        <IonCardSubtitle>
          <IonText className="ion-margin-left">{activity.location}</IonText>
        </IonCardSubtitle>
        <IonText class="ion-no-margin ion-align-items-center">
          <IonIcon icon={star} color="primary" />
          3/5 (323)
        </IonText>
        {<IonText>
          <p>{activity.description}</p>
        </IonText>}
        <IonCardContent class="ion-no-padding" style={{ position: "absolute", bottom: 0, width: "90%" }}>
          <div hidden={!(auth.user?.role === Role.administrador && !isMobile)}>
            <IonButton color={'danger'} onClick={() => activity._id && setShowDeleteAlert(true)} >
              <IonIcon icon={trashOutline} />
              {t('delete')}
            </IonButton>
            <IonButton id={activity._id}>
              <IonIcon icon={pencilOutline} />
              {t('edit')}
            </IonButton>
          </div>
          <IonText hidden={auth.user?.role === Role.administrador && !isMobile}>
            <strong>
              {activity?.events && t('from') + activity?.events && activity.events.length > 0
                ? t('from') + " " + Math.min(...activity.events.map((e) => e.price)).toString()
                : t('sold.out')}
            </strong>
          </IonText>
          <IonButton routerLink={`/activity/${activity._id}`}>{t('show.info')}</IonButton>
        </IonCardContent>
      </IonCard>
      {auth.user?.role == Role.administrador && <ActivityModal activity={activity} action="edit" />}
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
    </IonItem>
  );
};
