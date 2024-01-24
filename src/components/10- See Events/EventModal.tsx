import React, { useEffect, useRef, useState } from 'react';
import { Modal } from '@shared/Modal';
import { useTranslation } from 'react-i18next';
import { IonAlert, IonButton, IonDatetime, IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption } from '@ionic/react';
import { Event } from '@models/Activity';
import { useEdit } from '@hooks/useEdit';
import { filterPropertiesNotNull, formatDate } from '@utils/Utils';
import { Role, User } from '@models/User';
import { getUserList } from '@apis/adminUserApi';
import { createEvent } from '@apis/adminActivityApi';
import { useLanguage } from '@hooks/useLanguage';
import "./EventModal.css";

export const EventModal: React.FC<{ activityId: string, event: Event, action: "add" | "edit" }> = ({ activityId, event, action }) => {
    const { t } = useTranslation();
    const { formData, setFormData, setShowAlert, showAlert} = useEdit(event, (event: Event) => { console.log(event) });
    const [repeatType, setRepeatType] = useState<string>('none');
    const [repeatDays, setRepeatDays] = useState<string | string[]>([]);
    const [repeatStartDate, setRepeatStartDate] = useState<string | null>(null);
    const [repeatEndDate, setRepeatEndDate] = useState<string | null>(null);
    const [time, setTime] = useState<string | null>(null);
    const modal = useRef<HTMLIonModalElement>(null);
    const { defaultLanguage } = useLanguage();

    const [guias, setGuias] = useState<User[]>([]);
    useEffect(() => {
        getUserList('', { role: Role.guía }).then((guias) => setGuias(guias));
    }, []);

    const handleAddEvent = () => {
        formData && createEvent(
            activityId,
            formData,
            filterPropertiesNotNull({
                repeatDays,
                repeatType,
                repeatStartDate,
                repeatEndDate,
                time,
            })
        );
    };

    const handleRepeatTypeChange = (e: CustomEvent) => {
        const type = e.detail.value;
        setRepeatType(type);
        setRepeatDays([]);
        setRepeatStartDate('');
        setRepeatEndDate('');
    };

    const handleRepeatDaysChange = (e: CustomEvent) => {
        const days = e.detail.value;
        setRepeatDays(days);
    };


    return (
        <Modal id='modal-event-edit' trigger={event?._id || "add"}  tittle={t("event." + action + ".title")} modal={modal} >
            <IonList class='ion-no-padding ion-margin'>
                <IonItem>
                    <IonLabel position="stacked">Precio</IonLabel>
                    <IonInput
                        value={formData?.price.toString()}
                        onIonChange={(e) => formData && setFormData({ ...formData, price: Number(e.detail.value) })}
                    ></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Número de plazas</IonLabel>
                    <IonInput
                        value={formData?.seats.toString()}
                        onIonChange={(e) => formData && setFormData({ ...formData, seats: Number(e.detail.value) })}
                    ></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Guía asignado</IonLabel>
                    <IonSelect value={formData?.guide} onIonChange={(e) => formData && setFormData({ ...formData, guide: e.detail.value })}>
                        {guias?.map((guia) => (
                            <IonSelectOption key={guia._id} value={guia._id}>
                                {guia.name}
                            </IonSelectOption>
                        ))}
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Repetir evento</IonLabel>
                    <IonSelect value={repeatType} onIonChange={handleRepeatTypeChange}>
                        <IonSelectOption value="none">No repetir</IonSelectOption>
                        <IonSelectOption value="days">Días específicos</IonSelectOption>
                        <IonSelectOption value="range">Rango de fechas</IonSelectOption>
                    </IonSelect>
                </IonItem>
                {repeatType === 'days' && (
                    <>
                        <IonItem>
                            <IonInput value={time} type="time" onIonChange={(e) => setTime(e.detail.value || null)} />
                        </IonItem>
                        <IonItem>
                            <IonDatetime
                                locale={defaultLanguage.code}
                                value={repeatDays}
                                presentation="date"
                                multiple
                                onIonChange={(e) => e.detail.value && setRepeatDays(e.detail.value)}
                            />
                        </IonItem>
                    </>
                )}
                {repeatType === 'range' && (
                    <>
                        <IonItem>
                            <IonInput value={time} type="time" onIonChange={(e) => setTime(e.detail.value || null)} />
                        </IonItem>
                        <IonItem>
                            <IonLabel>Días de la semana</IonLabel>
                            <IonSelect multiple value={repeatDays} onIonChange={handleRepeatDaysChange}>
                                <IonSelectOption value={1}>Lunes</IonSelectOption>
                                <IonSelectOption value={2}>Martes</IonSelectOption>
                                <IonSelectOption value={3}>Miércoles</IonSelectOption>
                                <IonSelectOption value={4}>Jueves</IonSelectOption>
                                <IonSelectOption value={5}>Viernes</IonSelectOption>
                                <IonSelectOption value={6}>Sábado</IonSelectOption>
                                <IonSelectOption value={0}>Domingo</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="stacked">Fecha de inicio</IonLabel>
                            <IonInput
                                type="date"
                                placeholder="Seleccione una fecha de inicio"
                                value={repeatStartDate}
                                onIonChange={(e) => setRepeatStartDate(e.detail.value || null)}
                            ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="stacked">Fecha de fin</IonLabel>
                            <IonInput
                                type="date"
                                placeholder="Seleccione una fecha de fin"
                                value={repeatEndDate}
                                onIonChange={(e) => setRepeatEndDate(e.detail.value || null)}
                            ></IonInput>
                        </IonItem>
                    </>
                )}
                {repeatType !== 'days' && repeatType !== 'range' && (
                    <IonItem>
                        <IonLabel position="stacked">Día</IonLabel>
                        <IonInput
                            type="datetime-local"
                            value={formData && formatDate(formData?.date, true)}
                            onIonChange={(e) => {
                                formData &&
                                setFormData({
                                    ...formData,
                                    date: new Date(e.detail.value || ''),
                                });
                            }}
                        ></IonInput>
                    </IonItem>
                )}
                <IonButton expand="block" onClick={handleAddEvent}>
                    Añadir Evento
                </IonButton>
            </IonList>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header="Actividad actualizada"
                message="Los cambios se han guardado correctamente."
                buttons={['OK']}
            />
        </Modal >
    )
}
