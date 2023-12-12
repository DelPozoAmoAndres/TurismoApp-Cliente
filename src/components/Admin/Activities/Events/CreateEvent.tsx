import React, { useEffect, useState } from 'react';
import { IonItem, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption, IonText, IonDatetime } from '@ionic/react';
import { Role, User } from '@models/User';
import { getUserList } from '@apis/adminUserApi';
import { Event } from '@models/Activity';
import { filterPropertiesNotNull, formatDate } from '@utils/Utils';
import { createEvent } from '@apis/adminActivityApi';
import { useLanguage } from '@hooks/useLanguage';

interface CreateEventProps {
  activityId: string;
}

const CreateEvent: React.FC<CreateEventProps> = ({ activityId }) => {
  const [formData, setFormData] = useState<Event>({
    seats: 0,
    bookedSeats: 0,
    guide: '',
    date: new Date(),
    price: 0,
    language: '',
  });
  const [guias, setGuias] = useState<User[]>([]);
  const [repeatType, setRepeatType] = useState<string>('none');
  const [repeatDays, setRepeatDays] = useState<string | string[]>([]);
  const [repeatStartDate, setRepeatStartDate] = useState<string | null>(null);
  const [repeatEndDate, setRepeatEndDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    getUserList('', { role: Role.guía }).then((guias) => setGuias(guias));
  }, []);

  const handleAddEvent = () => {
    createEvent(
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

  const { defaultLanguage } = useLanguage();

  return (
    <>
      <IonItem>
        <IonText>Añadir evento</IonText>
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Precio</IonLabel>
        <IonInput
          value={formData.price.toString()}
          onIonChange={(e) => setFormData({ ...formData, price: Number(e.detail.value) })}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Número de plazas</IonLabel>
        <IonInput
          value={formData.seats.toString()}
          onIonChange={(e) => setFormData({ ...formData, seats: Number(e.detail.value) })}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Guía asignado</IonLabel>
        <IonSelect value={formData.guide} onIonChange={(e) => setFormData({ ...formData, guide: e.detail.value })}>
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
            value={formatDate(formData?.date, true)}
            onIonChange={(e) => {
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
    </>
  );
};

export default CreateEvent;
