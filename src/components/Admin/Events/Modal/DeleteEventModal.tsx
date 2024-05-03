import React, { useState, useRef } from 'react';
import { IonButton, IonCol, IonDatetime, IonIcon, IonItemDivider, IonLabel, IonList, IonRow, IonToggle } from '@ionic/react';
import { Modal } from '@shared/Modal'; // Importa tu modal
import { useTranslation } from 'react-i18next';
import { banOutline } from 'ionicons/icons';
import './DeleteEventModal.css';
import { deleteEvents } from '@apis/eventsApi';
import { RecurrenceEventParams } from '@models/RecurrenceEventParams';

const DeleteEventModal: React.FC<{ eventId: string | undefined, update?: () => void }> = ({ eventId, update }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [deleteRepeated, setDeleteRepeated] = useState(false);
    const modalRef = useRef<HTMLIonModalElement>(null);
    const { t } = useTranslation();
    const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
    const [recurrentParams, setRecurrentParams] = useState<RecurrenceEventParams>({ recurrenceDays: [], startDate: new Date(), endDate: new Date() });

    const toggleDay = (day: number) => {
        const recurrenceDays = recurrentParams.recurrenceDays.includes(day)
            ? recurrentParams.recurrenceDays.filter(d => d !== day)
            : [...recurrentParams.recurrenceDays, day]
        const newRecurrentParams = { ...recurrentParams, recurrenceDays };
        setRecurrentParams(newRecurrentParams);
    };

    const handleDelete = () => {
        modalRef.current?.dismiss();
        eventId && deleteEvents(eventId, recurrentParams).then(() => update && update());
    };

    const daySelectionButtons = () => (
        deleteRepeated && daysOfWeek.map((day, index) => (
            <IonButton
                key={day}
                style={{ padding: 0 }}
                fill={recurrentParams?.recurrenceDays.includes(index) ? 'solid' : 'outline'}
                onClick={() => toggleDay(index)}>
                {day}
            </IonButton>
        ))
    );

    const setDayRange = (value: string, property: "startDate" | "endDate") => {
        const newRecurrentParams = { ...recurrentParams, [property]: new Date(value) };
        setRecurrentParams(newRecurrentParams);
    }

    return (
        <>
            <a >
                <IonIcon icon={banOutline} size="large" style={{ cursor: "pointer" }} onClick={() => setIsOpen(true)} />
            </a>
            <Modal
                id="delete-event-modal"
                title={t('Eliminar Evento')}
                modal={modalRef}
                isOpen={isOpen}
                setOpen={setIsOpen}
                height={deleteRepeated ? "560px" : "150px"}>
                <IonList style={{ marginInline: "5px" }}>
                    <IonRow class="ion-no-margin ion-margin-horizontal ion-justify-content-between ion-align-center">
                        <IonLabel>{t('Eliminar evento periódico')}</IonLabel>
                        <IonToggle checked={deleteRepeated} onIonChange={e => setDeleteRepeated(e.detail.checked)} />
                    </IonRow>
                    <div hidden={!deleteRepeated}>
                        <IonItemDivider class='ion-no-margin' style={{ minHeight: "5px" }} />
                        <IonRow class='ion-margin-top ion-margin-horizontal'>
                            Al eliminar este evento, también se eliminarán todos los eventos futuros con el mismo patrón de hora, guía, idioma y precio.<br />
                            <strong className='ion-margin-top'>Selecciona los días de la semana en los que quieres eliminar el evento.</strong>
                        </IonRow>
                        <IonRow class='ion-justify-content-around ion-margin '>
                            {daySelectionButtons()}
                        </IonRow>
                        <IonRow class='ion-margin-horizontal'>
                            <strong >Selecciona el rango de fechas entre los que quieres aplicar la eliminación</strong>
                        </IonRow>
                        <IonRow >
                            <IonCol size="6">
                                <IonDatetime className='small-datetime' preferWheel={true} presentation='date' size="fixed" min={new Date().toISOString()} value={recurrentParams.startDate.toISOString()} onIonChange={(e) => e.detail.value && setDayRange(String(e.detail.value), "startDate")} />
                            </IonCol>
                            <IonCol size="6">
                                <IonDatetime className='small-datetime' preferWheel={true} presentation='date' min={recurrentParams.startDate.toISOString()} value={recurrentParams.endDate.toISOString()} onIonChange={(e) => e.detail.value && setDayRange(String(e.detail.value), "endDate")} />
                            </IonCol>
                        </IonRow>
                    </div>
                    <IonRow class='ion-justify-content-end'>
                        <IonButton onClick={() => setIsOpen(false)}>{t('Cancelar')}</IonButton>
                        <IonButton onClick={handleDelete}>{t('Eliminar')}</IonButton>
                    </IonRow>
                </IonList>
            </Modal>
        </>
    );
};

export default DeleteEventModal;
