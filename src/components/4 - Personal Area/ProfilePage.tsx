import { IonGrid, IonIcon, IonLabel, IonRow, IonSegment, IonSegmentButton, IonText } from '@ionic/react';
import { useRef, useState } from 'react';
import { PersonalData } from '@personal-area/Profile/PersonalData';
import { Account } from '@personal-area/Profile/Account';
import { useAuth } from '@contexts/AuthContexts';
import { useTranslation } from 'react-i18next';
import { formatDate } from '@utils/Utils';
import { bookOutline, shieldOutline } from 'ionicons/icons';
import { useScreen } from '@hooks/useScreen';
import GenericAppLayout from '@components/app/layouts/GenericAppLayout';
import React from 'react';
import CenteredLayout from '@components/web/layouts/CenteredLayout';
import { Modal } from '@shared/Modal';

const ProfilePage: React.FC = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<string | undefined>('personalData');
  const { width, browsingWeb, isMobile } = useScreen();
  const modal = useRef<HTMLIonModalElement>(null);

  const maxWidth = 755;
  const content = (
    <IonGrid style={{ height: "100%" }}>
      <IonRow class="ion-justify-content-center" >
        <section className='ion-margin-bottom'>
          <div style={{ width: isMobile ? "60vw" : "", margin: "auto" }}>
            <img
              src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_person_people_avatar_white_tone_icon_159365.png"
              width={isMobile ? "100%" : 250}
            />
            {/* {!browsingWeb && <IonIcon id="modal-contact" icon={informationCircleOutline} style={{ top: 30, position: "absolute", right: 20, fontSize: 40 }} />} */}
          </div>
          <IonRow>
            <h1>
              <strong>{auth.user?.name}</strong>
            </h1>
          </IonRow>
          <IonRow>
            <IonLabel>{t('PROFILE.ACCOUNT.CREATION')}:</IonLabel>
          </IonRow>
          <IonRow>
            <IonLabel>{formatDate(auth.user?.createdAt || null)}</IonLabel>
          </IonRow>
        </section >
        {width < maxWidth && (
          <IonSegment mode='ios' class='ion-margin-horizontal' value={selectedTab} onIonChange={(e) => setSelectedTab(e.detail.value)}>
            <IonSegmentButton value="personalData">
              <IonLabel>{t('PROFILE.DATA.TITLE')}</IonLabel>
              <IonIcon icon={bookOutline} />
            </IonSegmentButton>
            <IonSegmentButton value="account">
              <IonLabel>{t('PROFILE.ACCOUNT.TITLE')}</IonLabel>
              <IonIcon icon={shieldOutline} />
            </IonSegmentButton>
          </IonSegment>
        )}
        <section className="ion-margin-horizontal ion-margin-top" style={{ width: width < maxWidth ? '100%' : 500 }}>
          {(selectedTab == 'personalData' || width >= maxWidth) && <PersonalData />}
          {(selectedTab == 'account' || width >= maxWidth) && <Account />}
        </section>
      </IonRow>
      <Modal modal={modal} id="contact" trigger='modal-contact' title={t('CONTACT.TITLE')} height='180px'>
        <div style={{ display: "flex", gap: 10, flexDirection: "column", margin: 20 }}>
          <IonText>{t('DATA.EMAIL.LABEL')}: info@astour.online</IonText>
          <IonText>{t('DATA.TELEPHONE.LABEL')}: +34 123 123 123</IonText>
          <IonText className="ion-text-center">
            <small>&copy; {new Date().getFullYear()} {t('CONTACT.FOOTER')}</small>
          </IonText>
        </div>
      </Modal>
    </IonGrid >
  );
  return !browsingWeb ? <GenericAppLayout>{content}</GenericAppLayout> : <CenteredLayout>{content}</CenteredLayout>;
};

export default ProfilePage;
