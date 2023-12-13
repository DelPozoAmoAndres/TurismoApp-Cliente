import { IonGrid, IonIcon, IonLabel, IonRow, IonSegment, IonSegmentButton } from '@ionic/react';
import { useState } from 'react';
import { PersonalData } from '@personal-area/Profile/PersonalData';
import { Account } from '@personal-area/Profile/Account';
import { useAuth } from '@contexts/AuthContexts';
import { useTranslation } from 'react-i18next';
import { formatDate } from '@utils/Utils';
import { bookOutline, shieldOutline } from 'ionicons/icons';
import { useScreen } from '@hooks/useScreen';
import { AppPage } from '@pages/AppPage';
import React from 'react';
import GenericWebLayout from '@components/web/layouts/GenericWebLayout';

const ProfilePage: React.FC = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<string | undefined>('personalData');
  const { width, browsingWeb } = useScreen();

  const maxWidth = 755;
  const content = (
      <IonGrid>
        <IonRow class="ion-justify-content-center">
          <section className='ion-margin-bottom ion-padding-bottom'>
            <img
              src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_person_people_avatar_white_tone_icon_159365.png"
              width={width < 1000 ? 200 : 250}
            />
            <IonRow>
              <h1>
                <strong>{auth.user?.name}</strong>
              </h1>
            </IonRow>
            <IonRow>
              <IonLabel>{t('account.created.date')}:</IonLabel>
            </IonRow>
            <IonRow class='ion-margin-bottom ion-padding-bottom'>
              <IonLabel>{formatDate(auth.user?.createdAt || null)}</IonLabel>
            </IonRow>
          </section >
          {width < maxWidth && (
            <IonSegment mode='ios' value={selectedTab} onIonChange={(e) => setSelectedTab(e.detail.value)}>
              <IonSegmentButton value="personalData">
                <IonLabel>{t('personal.data.title.sort')}</IonLabel>
                <IonIcon icon={bookOutline} />
              </IonSegmentButton>
              <IonSegmentButton value="account">
                <IonLabel>{t('account.title')}</IonLabel>
                <IonIcon icon={shieldOutline} />
              </IonSegmentButton>
            </IonSegment>
          )}
          <section className="ion-margin-horizontal" style={{ width: width < maxWidth ? '100%' : 500 }}>
            {(selectedTab == 'personalData' || width >= maxWidth) && <PersonalData />}
            {(selectedTab == 'account' || width >= maxWidth) && <Account />}
          </section>
        </IonRow>
      </IonGrid>
  );
  return !browsingWeb ? <AppPage>{content}</AppPage> : <GenericWebLayout>{content}</GenericWebLayout>;
};

export default ProfilePage;
