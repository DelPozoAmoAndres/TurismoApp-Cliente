import { useScreen } from '@hooks/useScreen';
import { IonDatetime, IonIcon, IonLabel, IonRow, IonText } from '@ionic/react';
import { Modal } from '@shared/Modal';
import { formatDate } from '@utils/Utils';
import { trashBinOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    handleFilters: (value: any, filter: string) => unknown;
    filtersToApply?: Record<string, unknown>;
}

const DateFilter: React.FC<Props> = ({ handleFilters, filtersToApply }) => {
    const [showDate, setShowDate] = useState(false);
    const { isMobile } = useScreen();
    const [showOrigin, setShowOrigin] = useState(false);
    const [showEnd, setShowEnd] = useState(false);
    const originModal = React.useRef<HTMLIonModalElement>(null);
    const endModal = React.useRef<HTMLIonModalElement>(null);
    const { t } = useTranslation();

    const getDate = (date: string): string | undefined => {
        if (filtersToApply && filtersToApply[date] !== null && filtersToApply[date] !== undefined) {
            return String(filtersToApply[date])
        }
        return undefined
    }

    const getLimitDate = (date: string): string | undefined => {
        if (filtersToApply && filtersToApply[date] !== null && filtersToApply[date] !== undefined) {
            return String(filtersToApply[date])
        }
        else if (date === 'originDate') {
            return new Date(Date.now()).toISOString()
        }
        return undefined
    }

    useEffect(() => {
        if (filtersToApply && filtersToApply.originDate == null && filtersToApply.endDate == null && showDate) {
            setShowDate(false)
        }
        // eslint-disable-next-line
    }, [filtersToApply]);

    useEffect(() => {
        if (filtersToApply && filtersToApply.originDate != null && filtersToApply.endDate != null && !showDate) {
            setShowDate(true)

        }
        //eslint-disable-next-line
    }, [filtersToApply]);

    return (
        <>
            <IonRow>
                <Modal id="dateTimeOrigin" modal={originModal} title='OriginDate' isOpen={showOrigin} setOpen={setShowOrigin} height={'500px'}>
                    <div style={{ width: "100%", height: isMobile ? "auto" : "90%", display: "flex", justifyContent: "center", marginTop: "10px" }}>
                        <IonDatetime
                            presentation='date'
                            id="datetimeOrigin"
                            showDefaultButtons
                            value={getDate('originDate')}
                            onIonChange={e => handleFilters(formatDate(new Date(String(e.detail.value))), 'originDate')}
                            min={new Date(Date.now()).toISOString()} max={getLimitDate('endDate')}
                            style={{ "--background": "var(--ion--color--background)", borderRadius: 20 }}
                        ></IonDatetime>
                    </div>
                </Modal >
                <Modal id="dateTimeEnd" modal={endModal} title='EndDate' isOpen={showEnd} setOpen={setShowEnd} height={'500px'}>
                    <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "10px" }}>
                        <IonDatetime
                            presentation='date'
                            id="datetimeEnd"
                            showDefaultButtons
                            value={getDate('endDate')}
                            onIonChange={e => handleFilters(formatDate(new Date(String(e.detail.value))), 'endDate')}
                            min={getLimitDate('originDate')}
                            style={{ "--background": "var(--ion--color--background)", borderRadius: 20 }}
                        ></IonDatetime>
                    </div>
                </Modal>
                <IonRow class="ion-align-items-center ion-justify-content-between" style={{ width: "100%" }}>
                    <IonLabel>
                        <strong>{t('filters.date')}:</strong>
                    </IonLabel>
                </IonRow>
            </IonRow>
            <IonRow class="ion-margin-bottom ion-align-items-center ion-margin-top" style={{ backgroundColor: "var(--ion--color--background)", minHeight: "45px", width: "clamp(20px,100%,350px)", borderRadius: 10, fontSize: "clamp(12px, 5vw, 1em)", textAlign: "center" }}>
                <IonLabel style={{ width: showDate ? "clamp(90px,40%,133px)" : "clamp(90px,45%,153px)", marginLeft: isMobile && "5px" }} onClick={() => setShowOrigin(true)}>{filtersToApply?.originDate ? getDate("originDate") : "Desde"}</IonLabel>
                <span> - </span>
                <IonLabel style={{ width: showDate ? "clamp(90px,40%,133px)" : "clamp(90px,45%,153px)", marginLeft: isMobile && "5px" }} onClick={() => setShowEnd(true)}>{filtersToApply?.endDate ? getDate("endDate") : "Hasta"}</IonLabel>
                {showDate &&
                    <IonText color="danger" onClick={() => { handleFilters(null, 'originDate endDate'); setShowDate(false) }} style={{ padding: "0", margin: "0", width: 'auto' }}>
                        <IonIcon icon={trashBinOutline} style={{ fontSize: "20px" }} />
                    </IonText>}
            </IonRow>
        </>
    );
}

export default DateFilter;