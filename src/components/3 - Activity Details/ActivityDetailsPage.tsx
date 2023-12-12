import React from 'react';
import { RouteComponentProps } from 'react-router';
/* Ionic components */
import {
  IonButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonAlert,
  IonRow,
  IonCard,
} from '@ionic/react';
import { shareSocialOutline } from 'ionicons/icons';
/* Hooks */
import { useScreen } from '@hooks/useScreen';
import { useActivityData } from '@hooks/useActivityData';
import { useShare } from '@hooks/useShare';
/* Components */
import { ActivityInfo } from '@activity-details/ActivityInfo';
import { ActivityReviews } from '@activity-details/Reviews/ActivityReviews';
import { ActivityAvailability } from '@activity-details/Modal Availability/ActivityAvailability';
/* i18n */
import { useTranslation } from 'react-i18next';
import { AppPage } from '@pages/AppPage';
/* Carousel */
import { Keyboard, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
/* Styles */
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './ActivityDetailsPage.css';
import LoadingPage from '@pages/LoadingPage';
import PageTemplate from '@components/web/PageTemplate';

type ActivityDetailsProps = RouteComponentProps<{ id: string }>;

const ActivityDetailsPage: React.FC<ActivityDetailsProps> = ({ match }) => {
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const { browsingWeb } = useScreen(); //Hook to have data of screen dimensions
  const { activityData } = useActivityData(match.params.id); //Hook to have all the data of an activity
  const { shareActivity, showAlert, setShowAlert } = useShare(match.params.id); //Hook to share a link to the activity

  const header = (
    <IonHeader mode="ios" collapse="fade" class="ion-no-border sticky">
      <IonToolbar>
        {/* Back button */}
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" text={t('go.back')} />
        </IonButtons>
        {/* Share button */}
        <IonButtons slot="end" onClick={async () => await shareActivity()}>
          <IonButton>
            {t('share')}
            <IonIcon slot="end" icon={shareSocialOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );

  const content = activityData ? (
    <>
      <ActivityAvailability activityId={match.params.id} />
      {!browsingWeb && header}
      <IonRow class="ion-justify-content-center ion-margin-top limits-content">
        <section id="activity-section-info" className="ion-margin-horizontal">
          <IonCard id="activity-image-card" class="ion-no-margin" mode="ios">
            <Swiper
              pagination={{ type: 'fraction' }}
              keyboard={{ enabled: true }}
              navigation={true}
              modules={[Pagination, Navigation, Keyboard]}
              loop
            >
              {activityData?.images?.map((imgUrl, index) => (
                <SwiperSlide key={'image' + index}>
                  <img src={imgUrl || "https://imagenes.elpais.com/resizer/2kZjFxiNoG3Pvq9dbeHPTe7aiXc=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/RWF77A5EQGZX4QA2ABH76KQAZE.jpg"} className='img' />
                </SwiperSlide>
              ))}
            </Swiper>
          </IonCard>
          <ActivityInfo activityData={activityData} share={shareActivity} />
        </section>
        {activityData?._id && <ActivityReviews activityId={activityData._id} />}
      </IonRow>

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={t('alert.title.error') || 'Error'}
        message={t('alert.message.share.error') || ''}
        buttons={[
          {
            text: t('close'),
            role: 'cancel',
            handler: () => setShowAlert(false),
          },
        ]}
      />
    </>
  ) : (
    <LoadingPage />
  );

  return !browsingWeb ? (
    <AppPage>
      {content}
    </AppPage>
  ) : (
    <PageTemplate>{content}</PageTemplate>
  );
};

export default ActivityDetailsPage;
