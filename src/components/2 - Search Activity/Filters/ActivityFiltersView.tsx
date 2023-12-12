import React from 'react';
/* Ionic components */
import { IonButton, IonCheckbox, IonCol, IonIcon, IonLabel, IonList, IonRange, IonRow } from '@ionic/react';
import { filterOutline } from 'ionicons/icons';
/* Hooks */
import { useScreen } from '@hooks/useScreen';
import { useFilters } from '@hooks/useFilters';
/* Models */
import { ActivityFilter, ActivityState } from '@models/Activity';
/* i18n */
import { useTranslation } from 'react-i18next';

export const ActivityFiltersView: React.FC<{
  applyFilters: (arg0: ActivityFilter) => void;
  filters?: ActivityFilter;
}> = ({ applyFilters, filters }) => {
  const { filtersToApply, newFilters, confirmFilters, handleFilters, clearFilters } = useFilters(applyFilters, filters); // Hook to handle the filters
  const { width, isMobile } = useScreen(); //Hook to have data of screen dimensions
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page

  return (
    <>
      <IonList class="ion-padding" style={{ width:  isMobile?width: width / 4, height:"90%" }}>
        {!isMobile && (
          <IonRow class="ion-align-center">
            <h2>
              <IonIcon icon={filterOutline} />
              {' '}
              {t('filters.title')}
            </h2>
          </IonRow>
        )}
        <IonCol>
          <IonRow>
            <IonLabel>
              <strong>{t('filters.max.price')}:</strong> {filtersToApply.precio ? Number(filtersToApply.precio)+"€":"∞"}
            </IonLabel>
          </IonRow>
          <IonRow>
            <IonRange
              min={0}
              max={500}
              value={filtersToApply.precio ? Number(filtersToApply.precio) : 0}
              pin={true}
              ticks={true}
              onIonChange={(e) => (e.detail.value == 0 ? handleFilters(null, 'precio') : handleFilters(e.detail.value, 'precio'))}
            ></IonRange>
          </IonRow>
          <IonRow>
            <IonLabel>
              <strong>{t('filters.max.duration')}:</strong> {filtersToApply.duration ? Number(filtersToApply.duration)+" "+t('hours'):"∞"}
            </IonLabel>
          </IonRow>
          <IonRow>
            <IonRange
              min={0}
              max={24}
              pin={true}
              value={filtersToApply.duration ? Number(filtersToApply.duration) : 0}
              ticks={true}
              onIonChange={(e) => (e.detail.value == 0 ? handleFilters(null, 'duration') : handleFilters(e.detail.value, 'duration'))}
            ></IonRange>
          </IonRow>
          <IonRow class="ion-margin-bottom">
            <IonCheckbox
              checked={filtersToApply.petsPermited ? Boolean(filtersToApply.petsPermited) : false}
              onIonChange={(e) => handleFilters(e.detail.checked ? true : null, 'petsPermited')}
            >
              <strong>{t('filters.pets.friendly')}</strong>
            </IonCheckbox>
          </IonRow>
          <IonRow class="ion-margin-bottom">
            <IonLabel>
              <strong>{t('filters.state')}</strong>
            </IonLabel>
          </IonRow>
          {Object.values(ActivityState).map((state, index) => (
            <IonRow class="ion-margin-bottom ion-margin-start" key={'Filter' + index}>
              <IonCheckbox
                checked={filtersToApply.state === state}
                onIonChange={(e) => handleFilters(e.detail.checked ? state : null, 'state')}
              >
                {t('filters.state.' + state)}
              </IonCheckbox>
            </IonRow>
          ))}
          <div className=" ion-no-padding" style={{ position: 'fixed', bottom: 0, width: '90%', left: '5%' }}>
            {newFilters && (
              <IonButton style={{ width: '100%' }} expand="block" onClick={clearFilters}>
                {t('filters.delete')}
              </IonButton>
            )}
            <IonButton expand="block" style={{ width: '100%' }} onClick={confirmFilters}>
              {t('filters.apply')}
            </IonButton>
          </div>
        </IonCol>
      </IonList>
    </>
  );
};
