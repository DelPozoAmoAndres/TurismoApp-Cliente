import React from 'react';
import { RouteComponentProps } from 'react-router';
/* Ionic components */
import {
  IonAlert,
  IonRow,
  IonCard
} from '@ionic/react';
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
/* Carousel */
import { Keyboard, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
/* Styles */
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import 'swiper/css/keyboard';
import './ActivityDetailsPage.css';
import LoadingPage from '@pages/LoadingPage';
import BackShareAppLayout from '@components/app/layouts/BackShareAppLayout';
import TwoColumnTwoRowsWebLayout from '@components/web/layouts/TwoColumnTwoRowsWebLayout';

type ActivityDetailsProps = RouteComponentProps<{ id: string }>;

const ActivityDetailsPage: React.FC<ActivityDetailsProps> = ({ match }) => {
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const { browsingWeb } = useScreen(); //Hook to have data of screen dimensions
  const { activityData } = useActivityData(match.params.id); //Hook to have all the data of an activity
  const { shareActivity, showAlert, setShowAlert } = useShare(match.params.id); //Hook to share a link to the activity

  const leftContent = () => activityData && activityData._id && (
    <>
      <IonRow class="ion-justify-content-center ion-margin-top">
        <section id="activity-section-info" className="ion-margin-horizontal">
          <IonCard id="activity-image-card" mode="ios">
            <Swiper
              pagination={{ type: 'fraction' }}
              keyboard={{ enabled: true }}
              navigation={true}
              modules={[Pagination, Navigation, Keyboard]}
              loop
            >
              {activityData.images?.map((imgUrl, index) => (
                <SwiperSlide key={'image' + index} style={{ "minWidth": "100%" }}>
                  <img src={imgUrl || "https://imagenes.elpais.com/resizer/2kZjFxiNoG3Pvq9dbeHPTe7aiXc=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/RWF77A5EQGZX4QA2ABH76KQAZE.jpg"} className='img' />
                </SwiperSlide>
              ))}
            </Swiper>
          </IonCard>
        </section>
      </IonRow>
      <IonRow>{content()}</IonRow>
      <ActivityAvailability activityId={match.params.id} />
    </>
  )

  const content = () => activityData && activityData._id ? (
    <>
      <ActivityInfo activityData={activityData} share={shareActivity} />
      {!browsingWeb && <ActivityReviews activityId={activityData._id} />}
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={t('alert.title.error') || 'Error'}
        message={t('alert.message.share.error') || ''}
        buttons={[
          {
            text: t('ACTIONS.CLOSE'),
            role: 'cancel',
            handler: () => setShowAlert(false),
          },
        ]}
      />
    </>
  ) : (
    <LoadingPage />
  );

  const bottomContent = activityData && activityData._id && (
    <ActivityReviews activityId={activityData._id} />
  );

  return !browsingWeb ? <BackShareAppLayout onShareClick={shareActivity}> {leftContent()} </BackShareAppLayout> : <TwoColumnTwoRowsWebLayout leftContent={leftContent}>{bottomContent}</TwoColumnTwoRowsWebLayout>;
};

export default ActivityDetailsPage;
