import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useAuth } from '@contexts/AuthContexts';
import { useScreen } from '@hooks/useScreen';
import { IonAlert, IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonIcon, IonItem, IonText } from '@ionic/react';
import { Role, User } from '@models/User';
import { formatDate } from '@utils/Utils';
import { pencilOutline, trashOutline } from 'ionicons/icons';
import { deleteUser } from '@apis/adminUserApi';
import { UserModal } from '@search-user/Edit Modal/UserModal';

export const UserItem : React.FC<{ user: User}> = ({ user }) => {
    const { t } = useTranslation(); //Hook to change the translation without refreshing the page
    const auth = useAuth(); //Context of the user
    const { isMobile } = useScreen(); //Hook to have data of screen dimensions
    const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  return (
    <IonItem id="card-search" lines="none">
      <IonCard class="ion-no-margin">
        <IonCardTitle>{user.name}</IonCardTitle>
        <IonCardSubtitle>
          <IonText className="ion-margin-left">{user.email}</IonText>
          <IonText className="ion-margin-left">{formatDate(user.birthday||null)}</IonText>
        </IonCardSubtitle>
        <IonCardContent class="ion-no-padding">
            <div hidden={!(auth.user?.role === Role.administrador && !isMobile)}>
              <IonButton color={'danger'} onClick={() => user._id && setShowDeleteAlert(true)} >
                <IonIcon icon={trashOutline} />
                {t('delete')}
              </IonButton>
              <IonButton id={user._id}>
                <IonIcon icon={pencilOutline} />
                {t('edit')}
              </IonButton>
            </div>
          <IonButton routerLink={`/admin/user/${user._id}`}>{t('show.info')}</IonButton>
        </IonCardContent>
      </IonCard>
      <UserModal user={user} action='edit'/>
      <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={()=>setShowDeleteAlert(false)}
          header="Eliminar cuenta"
          message="Estás seguro que desear eliminar permanentemente esta cuenta, no podrás recuperar la cuenta"
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: ()=>setShowDeleteAlert(false),
            },
            {
              text: 'Eliminar',
              handler: ()=>{ user._id && deleteUser(user._id).then(()=>window.location.reload())},
            },
          ]}
        />
    </IonItem>
  )
}
