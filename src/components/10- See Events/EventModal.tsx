import React, { useEffect, useRef, useState } from 'react';
import { Modal } from '@shared/Modal';
import { useTranslation } from 'react-i18next';
import { IonAlert, IonButton, IonDatetime, IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption } from '@ionic/react';
import { Activity, Event } from '@models/Activity';
import { useEdit } from '@hooks/useEdit';
import { filterPropertiesNotNull, formatDate, formatTime } from '@utils/Utils';
import { Role, User } from '@models/User';
import { checkWorkers, getUserList } from '@apis/adminUserApi';
import { createEvent } from '@apis/adminActivityApi';
import { useLanguage } from '@hooks/useLanguage';
import "./EventModal.css";
import { getActivityFromEvent, getActivityList } from '@apis/activityApi';

export const EventModal: React.FC<{ activity?: string, event: Event, action: "add" | "edit" }> = ({ activity, event, action }) => {
    const { t } = useTranslation();
    const { formData, setFormData, setShowAlert, showAlert } = useEdit(event, (event: Event) => { console.log(event) });
    const [activityId, setActivityId] = useState<string | undefined>(activity);
    const [activityName, setActivityName] = useState<string>("");
    const [activityList, setActivityList] = useState<Activity[]>([]);
    const [repeatType, setRepeatType] = useState<string>('none');
    const [repeatDays, setRepeatDays] = useState<string | string[]>([]);
    const [repeatStartDate, setRepeatStartDate] = useState<string | null>(null);
    const [repeatEndDate, setRepeatEndDate] = useState<string | null>(null);
    const [time, setTime] = useState<string | null>(null);
    const modal = useRef<HTMLIonModalElement>(null);
    const { defaultLanguage } = useLanguage();

    const [guias, setGuias] = useState<User[]>([]);
    useEffect(() => {
        if(action === "edit" && event._id) {
            getActivityFromEvent(event._id).then((activity) => {
                setActivityId(activity ? activity._id : undefined);
                setActivityName(activity ? activity.name : "");
            })
        }
        else if(action=="add") {
            getActivityList("", {}).then((activities) => {setActivityList(activities);console.log("hola")});
        }
    }, [modal]);

    const handleAddEvent = () => {
        formData && activityId && createEvent(
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

    useEffect(() => {
        console.log(time)
       !event._id && checkWorkers({
            repeatType: repeatType.toString() ,
            repeatDays: repeatDays ? repeatDays.toString() : null,
            repeatStartDate: repeatStartDate ? formatDate(new Date( repeatStartDate)):null ,
            repeatEndDate: repeatEndDate ? formatDate(new Date(repeatEndDate)):null ,
            time: time ,
            date: formData?.date ? formatDate(formData?.date,true):null ,
        }).then((workers: User[]) => {
            if(workers == guias) return; 
            setGuias(workers); 
            formData && setFormData({ ...formData, guide: (workers?.length > 0 ? workers[0]._id : "") || "" }); 
        });
    }, [repeatType, repeatDays, repeatStartDate, repeatEndDate, time]);

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
        <Modal id={'modal-event-' + action} trigger={event?._id || "modal-event-add"} tittle={t("event." + action + ".title")} modal={modal} >
            <IonList class='ion-no-padding ion-margin'>
                {activityList.length > 0
                    ? <IonSelect onIonChange={(e) => e.detail && setActivityId(e.detail.value)}>
                        {activityList.map((activity) => (
                            <IonSelectOption key={activity._id} value={activity._id}>
                                {activity.name}
                            </IonSelectOption>
                        ))}
                    </IonSelect>
                    : <IonItem>
                        <IonLabel>{activityName} - {activityId}</IonLabel>
                    </IonItem>
                }
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
                {action == "add" && <IonItem>
                    <IonLabel position="stacked">Repetir evento</IonLabel>
                    <IonSelect value={repeatType} onIonChange={handleRepeatTypeChange}>
                        <IonSelectOption value="none">No repetir</IonSelectOption>
                        <IonSelectOption value="days">Días específicos</IonSelectOption>
                        <IonSelectOption value="range">Rango de fechas</IonSelectOption>
                    </IonSelect>
                </IonItem>
                }
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
                <IonButton expand="block" onClick={handleAddEvent} disabled={formData?.guide==="" || formData?.guide===undefined} aria-label={formData?.guide}>
                    {action}.event
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
