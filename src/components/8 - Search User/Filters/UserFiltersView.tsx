import { IonButton, IonCheckbox, IonCol, IonGrid, IonIcon, IonLabel, IonList, IonRow } from '@ionic/react'
import React from 'react'
import { Role, UserFilter } from '@models/User'
import { useTranslation } from 'react-i18next'
import { useScreen } from '@hooks/useScreen'
import { filterOutline } from 'ionicons/icons'
import { useFilters } from '@hooks/useFilters'

export const UserFiltersView : React.FC<{
    applyFilters: (arg0: Record<string, unknown>) => void;
    filters?: UserFilter;
  }> = ({ applyFilters, filters }) => {
    const {t} = useTranslation();
    const {width,isMobile} = useScreen();
    const { filtersToApply, newFilters, confirmFilters, handleFilters, clearFilters } = useFilters(applyFilters, filters); // Hook to handle the filters
  return (
    <>
      <IonList class="ion-padding" style={{ width: width / 4, height:"90%" }}>
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
              <strong>{t('role')}</strong>
            </IonLabel>
          </IonRow>
          <IonRow>
          {Object.values(Role).map((role, index) => (
            <IonGrid class="ion-margin-bottom ion-margin-start" key={'Filter' + index}>
              <IonCheckbox
                checked={filtersToApply.role === role}
                onIonChange={(e) => handleFilters(e.detail.checked ? role : null, 'role')}
              >
                {t('role.' + role)}
              </IonCheckbox>
            </IonGrid>
          ))}
          </IonRow>
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
  )
}
