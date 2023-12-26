import { useScreen } from '@hooks/useScreen';
import { IonButton, IonDatetime, IonDatetimeButton, IonIcon, IonLabel, IonModal, IonRow } from '@ionic/react';
import { formatDate } from '@utils/Utils';
import { use } from 'i18next';
import { filter, trashBinOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    handleFilters: (value: any, filter: string) => unknown;
    filtersToApply?: Record<string, unknown>;
}

const DateFilter: React.FC<Props> = ({ handleFilters,filtersToApply }) => {
    const [showDate, setShowDate] = useState(false);
    const {isMobile} = useScreen();
    const { t } = useTranslation();

    const getDate = (date : string) : string | undefined =>{
        if(filtersToApply && filtersToApply[date]!==null && filtersToApply[date]!==undefined){
            console.log(date,filtersToApply[date])
            return String(filtersToApply[date])
        }
        return undefined
    }

    const getLimitDate = (date : string) : string | undefined =>{
        if(filtersToApply && filtersToApply[date]!==null && filtersToApply[date]!==undefined){
            return String(filtersToApply[date])
        }
        else if(date==='originDate'){
            return new Date(Date.now()).toISOString()
        }
        return undefined
    }

    useEffect(() => {
        if(filtersToApply && filtersToApply.originDate==null && filtersToApply.endDate==null && showDate){
            setShowDate(false)
        }
    }, [filtersToApply]);

    useEffect(() => {
        if(filtersToApply && filtersToApply.originDate!=null && filtersToApply.endDate!=null && !showDate){
            setShowDate(true)
        }
    },[showDate,filtersToApply]);

    return (
        <>
            <IonRow>
                <IonModal keepContentsMounted={true}>
                    <IonDatetime presentation='date' id="datetimeOrigin" showDefaultButtons value={getDate('originDate')}  onIonChange={e=>handleFilters(formatDate(new Date(String(e.detail.value))), 'originDate')} min={new Date(Date.now()).toISOString()} max={getLimitDate('endDate')}></IonDatetime>
                </IonModal>
                <IonModal keepContentsMounted={true}>
                    <IonDatetime presentation='date' id="datetimeEnd" showDefaultButtons value={getDate('endDate')} onIonChange={e=>handleFilters(formatDate(new Date(String(e.detail.value))), 'endDate')} min={getLimitDate('originDate')}></IonDatetime>
                </IonModal>
                <IonRow class="ion-align-items-center ion-justify-content-between" style={{width:"100%"}}>
                    <IonLabel>
                        <strong>{t('filters.date')}:</strong>
                    </IonLabel>
                    {!showDate && <IonButton color="primary" onClick={() => setShowDate(true)}>Añadir dates</IonButton>}
                </IonRow>
            </IonRow>
            {showDate &&
                <IonRow class="ion-margin-bottom ion-align-items-center ion-margin-top" style={{ backgroundColor: "var(--ion-color-step-300, #edeef0)", minHeight: "45px", width: "clamp(200px,100%,350px)", borderRadius: 20, fontSize:"clamp(12px, 5vw, 1em)"}}>
                    <IonDatetimeButton datetime="datetimeOrigin" style={{width:"clamp(90px,38%,133px)", marginLeft:isMobile&&"5px"}}></IonDatetimeButton>
                    <span> - </span>
                    <IonDatetimeButton datetime="datetimeEnd" style={{width:"clamp(90px,38%,133px)", marginLeft:isMobile&&"5px"}}></IonDatetimeButton>
                    <IonButton color="danger" onClick={() => { handleFilters(null, 'originDate endDate'); setShowDate(false) }} style={{padding: "0", margin: "0", width: "clamp(40px,5vw,15%)" }}>
                        <IonIcon icon={trashBinOutline} style={{fontSize:"64px"}}/>
                    </IonButton>
                </IonRow>
            }
        </>
    );
}

export default DateFilter;