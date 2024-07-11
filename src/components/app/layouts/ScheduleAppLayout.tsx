import React, { useEffect, useState } from "react";
import { IonButton, IonContent, IonDatetime, IonHeader, IonIcon, IonList, IonPage } from "@ionic/react";
import "./ScheduleAppLayout.css";
import { useScreen } from "@hooks/useScreen";
import { formatDate } from "@utils/Utils";
import { Modal } from "@shared/Modal";
import { calendarOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";

interface Props {
    highlightedDates: { date: string; textColor: string; backgroundColor: string }[];
    children: React.ReactNode;
    header: React.ReactNode;
    getItemList?: (arg: Date) => void;
    setDate?: (arg: Date) => void;
}

const ScheduleAppLayout: React.FC<Props> = ({ highlightedDates, children, header, getItemList, setDate }) => {
    const { isMobile } = useScreen(); //Hook to have data of screen dimensions
    const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
    const modal = React.useRef<HTMLIonModalElement>(null);
    const [showModal, setShowModal] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        setDate != undefined && setDate(selectedDate);
        //eslint-disable-next-line
    }, [selectedDate]);

    useEffect(() => {
        getItemList !== undefined && getItemList(selectedDate);
        //eslint-disable-next-line
    }, [selectedDate]);

    const leftContent = () => (
        <IonDatetime
            style={{ margin: isMobile ? "auto" : "", marginTop: isMobile ? "auto" : '85px', marginLeft: isMobile ? "auto" : "20px", marginRight: isMobile ? "auto" : "20px", width: isMobile ? "100%" : "", "--background": "var(--ion--color--background)", borderRadius: 20 }}
            class='sticky'
            // min={new Date().toISOString()}
            highlightedDates={highlightedDates}
            value={formatDate(selectedDate)}
            onIonChange={e => e.detail.value && setSelectedDate(new Date(e.detail.value.toString()))}
            presentation='date'
            showDefaultButtons={isMobile} />
    )

    const mobileContent = () => (
        <>
            <Modal id="dateTimeOrigin" modal={modal} title={t('DASHBOARD.LIST.DATE')} isOpen={showModal} setOpen={setShowModal} height={'500px'}>
                {leftContent()}
            </Modal>
            <IonButton class="outlined" onClick={() => setShowModal(true)}><IonIcon icon={calendarOutline} class='ion-margin-end' />{formatDate(selectedDate)}</IonButton>
        </>
    );

    return (
        <>
            <IonPage id="app" >
                <IonHeader mode="ios" collapse="fade" class="ion-no-border sticky">
                    <div className="grid">
                        {header}
                        {mobileContent()}
                    </div>
                </IonHeader>
                <IonContent id="main-content">
                    <IonList id="event-list" class={isMobile ? 'ion-margin' : ''}>
                        {children}
                    </IonList>
                </IonContent >
            </IonPage >
        </>
    );
}
export default ScheduleAppLayout;