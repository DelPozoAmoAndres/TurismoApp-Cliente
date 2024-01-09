import React, { useState, useRef } from 'react';
import { IonButton, IonCheckbox, IonCol, IonDatetime, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonRow, IonToggle } from '@ionic/react';
import { Modal } from '@shared/Modal'; // Importa tu modal
import { useTranslation } from 'react-i18next';
import { trashOutline } from 'ionicons/icons';
import './DeleteEventModal.css';

const DeleteEventModal: React.FC<{ eventId: string | undefined, onDelete: (selectedDays: string[]) => void }> = ({ eventId, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [deleteRepeated, setDeleteRepeated] = useState(false);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const modalRef = useRef<HTMLIonModalElement>(null);
    const { t } = useTranslation();
    const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

    const toggleDay = (day: string) => {
        setSelectedDays(selectedDays.includes(day) ? selectedDays.filter(d => d !== day) : [...selectedDays, day]);
    };

    const handleDelete = () => {
        setIsOpen(false);
        onDelete(deleteRepeated ? selectedDays : []);
    };

    const daySelectionButtons = () => (
        deleteRepeated && daysOfWeek.map(day => (
            <IonButton
                key={day}
                style={{ padding: 0 }}
                fill={selectedDays.includes(day) ? 'solid' : 'outline'}
                onClick={() => toggleDay(day)}>
                {day}
            </IonButton>
        ))
    );

    return (
        <>
            <IonButton color={'danger'} expand="block" onClick={() => setIsOpen(true)}>
                <IonIcon icon={trashOutline} />
                {t('Borrar')}
            </IonButton>
            <Modal
                id="delete-event-modal"
                tittle={t('Eliminar Evento')}
                modal={modalRef}
                isOpen={isOpen}
                setOpen={setIsOpen}
                height={deleteRepeated?"560px":"150px"}>
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
                                <IonDatetime className='small-datetime' preferWheel={true} presentation='date' size="fixed" min={new Date().toISOString()}/>
                            </IonCol>
                            <IonCol size="6">
                                <IonDatetime className='small-datetime' preferWheel={true} presentation='date' min={new Date().toISOString()}/>
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
