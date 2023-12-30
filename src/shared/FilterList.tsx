import { useScreen } from '@hooks/useScreen';
import { IonButton, IonIcon, IonList, IonRow } from '@ionic/react';
import { filterOutline } from 'ionicons/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    children: React.ReactNode;
    onConfirm?: () => void;
    onClear?: () => void;
    newFilters?: boolean;
}

const FilterList: React.FC<Props> = ({ children, onConfirm, onClear, newFilters }) => {
    const {isMobile } = useScreen(); //Hook to have data of screen dimensions
    const { t } = useTranslation(); //Hook to change the translation without refreshing the page
    return (
        <IonList class="ion-padding" style={{ width: isMobile ? "100%" : '360px' }}>
            {!isMobile && (
                <IonRow class="ion-align-center">
                    <h2>
                        <IonIcon icon={filterOutline} />
                        {' '}
                        {t('filters.title')}
                    </h2>
                </IonRow>
            )}
            {children}
            <div className=" ion-no-padding">
                {newFilters && (
                    <IonButton style={{ width: '100%' }} expand="block" onClick={onClear}>
                        {t('filters.delete')}
                    </IonButton>
                )}
                <IonButton expand="block" style={{ width: '100%' }} onClick={onConfirm}>
                    {t('filters.apply')}
                </IonButton>
            </div>
        </IonList>
    );
}
// style={{ position: '-webkit-sticky', bottom: 0, width: '90%', zIndex:1000, margin:'auto' }}

export default FilterList;