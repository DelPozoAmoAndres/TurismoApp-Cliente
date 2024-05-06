import React from 'react';
/* Ionic components */
import { IonCheckbox, IonCol, IonIcon, IonLabel, IonRange, IonRow } from '@ionic/react';
/* Hooks */
import { useFilters } from '@hooks/useFilters';
/* Models */
import { ActivityFilter } from '@models/Activity';
/* i18n */
import { useTranslation } from 'react-i18next';
import FilterList from '@shared/FilterList';
import { useLanguage } from '@hooks/useLanguage';
import DateFilter from './DateFilter';
import { useScreen } from '@hooks/useScreen';
import { addOutline, removeOutline } from 'ionicons/icons';

export const ActivityFiltersView: React.FC<{
  applyFilters: (arg0: ActivityFilter) => void;
  filters?: ActivityFilter;
  defaultFilters: ActivityFilter;
}> = ({ applyFilters, filters, defaultFilters }) => {
  const { languages } = useLanguage();
  const { filtersToApply, newFilters, confirmFilters, handleFilters, clearFilters } = useFilters(applyFilters, defaultFilters, filters); // Hook to handle the filters
  const { isMobile } = useScreen(); //Hook to have data of screen dimensions
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page

  return (
    <FilterList onConfirm={confirmFilters} onClear={clearFilters} newFilters={newFilters}>
      <IonCol>
        <DateFilter handleFilters={handleFilters} filtersToApply={filtersToApply} />
        <IonRow class='ion-align-items-center ion-margin-vertical ion-justify-content-between' style={{ gap: 10 }}>
          <IonLabel>
            <strong>{t('filters.participants')}:</strong>
          </IonLabel>
          <div className='numPersons' >
            <IonIcon icon={removeOutline} style={{ background: filtersToApply.numPersons == 1 ? "var(--ion--color--background)" : "var(--ion-color-primary)" }} onClick={() => Number(filtersToApply.numPersons) > 1 && handleFilters(Number(filtersToApply.numPersons) - 1, 'numPersons')} />
            <IonLabel style={{ margin: '0 20px' }}>{filtersToApply.numPersons ? Number(filtersToApply.numPersons) : 1}</IonLabel>
            <IonIcon icon={addOutline} style={{ background: "var(--ion-color-primary)" }} onClick={() => handleFilters(Number(filtersToApply.numPersons) + 1, 'numPersons')} />
          </div>
        </IonRow>
        <IonRow>
          <IonLabel>
            <strong>{t('filters.max.price')}:</strong> {(filtersToApply.price ? Number(filtersToApply.price) : Number(defaultFilters.price)) + "€"}
          </IonLabel>
        </IonRow>
        <IonRow>
          <IonRange
            min={1}
            max={defaultFilters.price ? defaultFilters.price : 0}
            value={filtersToApply.price ? Number(filtersToApply.price) : defaultFilters.price}
            pin={true}
            ticks={true}
            onIonChange={(e) => (handleFilters(e.detail.value, 'price'))}
          ></IonRange>
        </IonRow>
        <IonRow class='ion-align-items-center ion-margin-vertical ion-justify-content-between' style={{ gap: 10 }}>
          <IonLabel>
            <strong>{t('filters.min.score')}:</strong>
          </IonLabel>
          <div className='numPersons' >
            <IonIcon icon={removeOutline} style={{ background: Number(filtersToApply.minScore) == 0 || Number.isNaN(Number(filtersToApply.minScore)) ? "var(--ion--color--background)" : "var(--ion-color-primary)" }} onClick={() => Number(filtersToApply.minScore) > 0 && handleFilters(Number(filtersToApply.minScore) == 1 ? null : Number(filtersToApply.minScore) - 1, 'minScore')} />
            <IonLabel style={{ margin: '0 20px' }}>{filtersToApply.minScore ? Number(filtersToApply.minScore) : 0}</IonLabel>
            <IonIcon icon={addOutline} style={{ background: "var(--ion-color-primary)" }} onClick={() => handleFilters(Number.isNaN(Number(filtersToApply.minScore)) ? 1 : Number(filtersToApply.minScore) + 1, 'minScore')} />
          </div>
        </IonRow>
        <IonRow class="ion-margin-bottom">
          <IonLabel>
            <strong>{t('filters.language')}</strong>
          </IonLabel>
        </IonRow>
        <IonRow class="ion-margin-bottom" style={{ gap: "7px", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between" }}>
          {Object.values(languages).map((language, index) => (
            <IonCheckbox key={'Filter' + index}
              checked={filtersToApply.language && (filtersToApply.language as Set<string>).has(language.code) ? true : false}
              onIonChange={() => handleFilters(language.code, 'language', 'multiple')}
              color={'primary'}
            >
              <span style={{ textTransform: 'capitalize' }}>{language.name}</span>
            </IonCheckbox>
          ))}
        </IonRow>
      </IonCol>
    </FilterList >
  );
};
