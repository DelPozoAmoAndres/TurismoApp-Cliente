import React, { useState } from 'react';
/* Ionic components */
import { IonGrid, IonRow } from '@ionic/react';
/* Hooks */
import { useCategory } from '@hooks/useCategory';
/* Styles */
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
/* Components */
import { ActivityItem } from '@components/2 - Search Activity/List/ActivityItem';

export const ActivityCardList: React.FC = () => {
  const { categories } = useCategory(); //List of activities grouped by category
  const [filtro] = useState<'populares' | 'montaña' | 'playa'>('populares'); // Variable to change between the 3 lists of activities

  return (
    <IonGrid class="ion-no-padding ion-margin-top limits-content" >
      <IonRow class="grid-container">
        {/* <strong className="ion-no-margin">{t('welcome.categories.title')}</strong> */}
        <h2> <strong className="chosen-title">Los <span className="plus">+</span><span className="highlight">Elegidos</span></strong></h2>
        {categories[filtro].map((activity, index) => (
          <>
          <ActivityItem key={index} activity={activity} />
          {index == 0 && <ActivityItem key={index+100} activity={activity} />}
          </>
        ))}
        {/* <Swiper id="categories" slidesPerView={(((width + 10) / (width - 16)) * width) / 115} spaceBetween={8}> 
          <SwiperSlide>
            <IonButton color={filtro != 'populares' ? 'secondary' : 'primary'} onClick={() => setFiltro('populares')}>
              {t('welcome.categories.popular')}
            </IonButton>
          </SwiperSlide>
          <SwiperSlide>
            <IonButton color={filtro != 'montaña' ? 'secondary' : 'primary'} onClick={() => setFiltro('montaña')}>
              {t('welcome.categories.mountain')}
            </IonButton>
          </SwiperSlide>
          <SwiperSlide>
            <IonButton color={filtro != 'playa' ? 'secondary' : 'primary'} onClick={() => setFiltro('playa')}>
              {t('welcome.categories.beach')}
            </IonButton>
          </SwiperSlide>
          <SwiperSlide>
            <IonButton color={filtro != 'playa' ? 'secondary' : 'primary'} onClick={() => setFiltro('playa')}>
              {t('welcome.categories.beach')}
            </IonButton>
          </SwiperSlide>
        </Swiper> */}
        {/* <Swiper
          freeMode={{enabled: true, momentum:false}}
          id="cards-home"
          // slidesPerView={(((width + 10) / (width - 16)) * width) / 250}
          spaceBetween={10}
          modules={[FreeMode]}
          // keyboard={{ enabled: true }}
          // navigation={browsingWeb && !isMobile}
        >
          {categories[filtro].map((activity, index) => (
            <SwiperSlide key={index}>
              <ActivityCard activity={activity} />
            </SwiperSlide>
          ))}
          {categories[filtro].map((activity, index) => (
            <SwiperSlide key={index}>
              <ActivityCard activity={activity} />
            </SwiperSlide>
          ))}
        </Swiper> */}

      </IonRow>
    </IonGrid>
  );
};
