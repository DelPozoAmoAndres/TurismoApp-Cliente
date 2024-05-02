import React from 'react';
/* Ionic components */
import { IonCheckbox, IonCol, IonLabel, IonRange, IonRow } from '@ionic/react';
/* Hooks */
import { useFilters } from '@hooks/useFilters';
/* Models */
import { ActivityFilter, ActivityState } from '@models/Activity';
/* i18n */
import { useTranslation } from 'react-i18next';
import FilterList from '@shared/FilterList';
import { useAuth } from '@contexts/AuthContexts';
import { Role } from '@models/User';
import { useLanguage } from '@hooks/useLanguage';
import DateFilter from './DateFilter';
import { useScreen } from '@hooks/useScreen';

export const ActivityFiltersView: React.FC<{
  applyFilters: (arg0: ActivityFilter) => void;
  filters?: ActivityFilter;
}> = ({ applyFilters, filters }) => {
  const { filtersToApply, newFilters, confirmFilters, handleFilters, clearFilters } = useFilters(applyFilters, filters); // Hook to handle the filters
  const {isMobile} = useScreen(); //Hook to have data of screen dimensions
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const { languages } = useLanguage();
  const auth = useAuth();

  return (
    <FilterList onConfirm={confirmFilters} onClear={clearFilters} newFilters={newFilters}>
      <IonCol>
        <DateFilter handleFilters={handleFilters} filtersToApply={filtersToApply} />
        <IonRow>
          <IonLabel>
            <strong>{t('filters.max.price')}:</strong> {filtersToApply.precio ? Number(filtersToApply.precio) + "€" : "∞"}
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
            <strong>{t('filters.max.duration')}:</strong> {filtersToApply.duration ? Number(filtersToApply.duration) + " " + t('hours') : "∞"}
          </IonLabel>
        </IonRow>
        <IonRow class='ion-margin-left'>
          <IonRange min={0} max={24} pin={true} value={filtersToApply.duration ? Number(filtersToApply.duration) : 0} ticks={true}
            onIonChange={(e) => (e.detail.value == 0 ? handleFilters(null, 'duration') : handleFilters(e.detail.value, 'duration'))}
            class='ion-margin-left ion-margin-right'
          ></IonRange>
        </IonRow>
        <IonRow>
          <IonLabel>
            <strong>{t('filters.min.score')}:</strong> {filtersToApply.score ? Number(filtersToApply.score) : "0"}
          </IonLabel>
        </IonRow>
        <IonRow class='ion-margin-left'>
          <IonRange min={0} max={5} pin={true} snaps value={filtersToApply.score ? Number(filtersToApply.score) : 0} ticks={true}
            onIonChange={(e) => (e.detail.value == 0 ? handleFilters(null, 'score') : handleFilters(e.detail.value, 'score'))}
            class='ion-margin-left ion-margin-right'
          ></IonRange>
        </IonRow>
        {/* <IonRow class="ion-margin-bottom">
          <IonCheckbox
            checked={filtersToApply.petsPermited ? Boolean(filtersToApply.petsPermited) : false}
            onIonChange={(e) => handleFilters(e.detail.checked ? true : null, 'petsPermited')}
            style={{width : "100%"}}
          >
            <span><strong>{t('filters.pets.friendly')}</strong></span>
          </IonCheckbox>
        </IonRow> */}
        <IonRow class="ion-margin-bottom">
          <IonLabel>
            <strong>{t('filters.language')}</strong>
          </IonLabel>
        </IonRow>
        <IonRow class="ion-margin-bottom" style={{gap:"7px", flexDirection:isMobile?"column":"row", justifyContent:"space-between"}}>
        {Object.values(languages).map((language, index) => (
            <IonCheckbox key={'Filter' + index}
              checked={filtersToApply.language === language.name}
              onIonChange={(e) => handleFilters(e.detail.checked ? language.name : null, 'language')}
              color={'primary'}
            >
              <span style={{ textTransform: 'capitalize' }}>{language.name}</span>
            </IonCheckbox>  
        ))}
        </IonRow>
        {auth.user?.role === Role.administrador &&
          <>
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
                  color={'primary'}
                >
                  {t('filters.state.' + state)}
                </IonCheckbox>
              </IonRow>
            ))}
          </>
        }
      </IonCol>
    </FilterList >
  );
};
