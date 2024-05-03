import Footer from "@components/web/Footer";
import { Header } from "@components/web/Header";
import React, { useEffect, useState } from "react";
import AppMenu from "../AppMenu";
import { IonButton, IonContent, IonDatetime, IonIcon, IonList, IonPage } from "@ionic/react";
import "./SearchWebLayout.css";
import { useScreen } from "@hooks/useScreen";
import { formatDate } from "@utils/Utils";
import { Modal } from "@shared/Modal";
import { calendarOutline } from "ionicons/icons";

interface Props {
    highlightedDates: { date: string; textColor: string; backgroundColor: string }[];
    children: React.ReactNode;
    header: React.ReactNode;
    getItemList?: (arg: Date) => void;
    setDate?: (arg: Date) => void;
}

const ScheduleWebLayout: React.FC<Props> = ({ highlightedDates, children, header, getItemList, setDate }) => {
    const { isMobile } = useScreen(); //Hook to have data of screen dimensions
    const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
    const modal = React.useRef<HTMLIonModalElement>(null);
    const [showModal, setShowModal] = useState(false);

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
            <Modal id="dateTimeOrigin" modal={modal} title='OriginDate' isOpen={showModal} setOpen={setShowModal} minHeightAndroid={100} minHeightIos={780}>
                {leftContent()}
            </Modal>
            <IonButton class="outlined" onClick={() => setShowModal(true)}><IonIcon icon={calendarOutline} class='ion-margin-end' />{formatDate(selectedDate)}</IonButton>
        </>
    );

    return (
        <>
            <AppMenu />
            <IonPage id="pageWeb" >
                <IonContent>
                    <div className="search-web">
                        <header><Header /></header>
                        <main>
                            {!isMobile && <div className="sticky">
                                {leftContent()}
                            </div>}
                            <IonList id="event-list" class={isMobile ? 'ion-margin' : ''}>
                                <div className="grid">
                                    {header}
                                    {isMobile && mobileContent()}
                                </div>
                                {children}
                            </IonList>
                        </main>
                        <footer><Footer /></footer>
                    </div>
                </IonContent >
            </IonPage >
        </>
    );
}
export default ScheduleWebLayout;