import React, { FormEvent, useRef, useState } from 'react';
import { IonPage, IonContent, IonItem, IonButton, IonAlert, IonHeader, IonToolbar, IonTitle, IonCheckbox } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import Spinner from '@shared/Spinner';
import { Field } from '@shared/Field';
import { lengthValidation } from '@utils/Validations';
import { Activity, ActivityState } from '@models/Activity';
import { createActivity } from '@apis/adminActivityApi';
import { AxiosError } from 'axios';

const CreateActivity: React.FC<RouteComponentProps> = ({ history }) => {
  const [formData, setFormData] = useState<Activity>(new Activity());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const page = useRef(null);

  const handleCreateActivity = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      setError(null);
      await createActivity(formData);
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error || error instanceof AxiosError) setError(error?.message ?? 'Ha habido un error en el servidor.');
    }
    setLoading(false);
    setShowAlert(true);
  };

  return (
    <IonPage ref={page}>
      <IonHeader>
        <IonToolbar mode="ios">
          <IonTitle>Añadir actividad</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleCreateActivity}>
          <IonItem lines="none">
            <Field
              label="Nombre"
              errorText="Introduce cadena con mas de 8 caracteres"
              placeholder="Introduzca un nombre"
              type="text"
              onIonInput={(e) => setFormData({ ...formData, name: e.detail.value })}
              validationFn={(e) => lengthValidation(8, e)}
              value={formData.name}
            />
          </IonItem>
          <IonItem lines="none">
            <Field
              label="Descripción"
              errorText="Introduzca una cadena con más de 20 caracteres"
              placeholder="Introduzca una descripcion"
              type="text"
              onIonInput={(e) => setFormData({ ...formData, description: e.detail.value })}
              validationFn={() => true}
              value={formData.description}
            />
          </IonItem>
          <IonItem lines="none">
            <Field
              label="Duración (minutos)"
              errorText="Introduzca una duración mayor de 0"
              placeholder="Introduzca una duración"
              type="number"
              onIonInput={(e) => setFormData({ ...formData, duration: Number(e.detail.value) })}
              validationFn={() => true}
              value={String(formData.duration)}
            />
          </IonItem>
          <IonItem lines="none">
            <Field
              label="Ubicación"
              errorText="Introduzca una cadena de más de 8 caracteres"
              placeholder="Introduzca la ubicación de la actividad"
              validationFn={() => true}
              type="text"
              onIonInput={(e) => {
                setFormData({ ...formData, location: e.detail.value });
              }}
              value={formData.location}
            />
          </IonItem>
          <IonItem lines="none">
            <IonCheckbox
              checked={formData?.petsPermited}
              value={formData?.petsPermited === false}
              labelPlacement="start"
              onIonChange={(e) =>
                formData &&
                setFormData({
                  ...formData,
                  petsPermited: Boolean(e.detail.value),
                })
              }
            >
              Mascotas permitidas
            </IonCheckbox>
          </IonItem>

          <IonItem lines="none">
            <Field
              label="Accesibilidad"
              errorText="Introduzca una cadena de más de 8 caracteres"
              placeholder="Introduzca una descripción de como es la accesibilidad"
              validationFn={() => true}
              type="text"
              onIonInput={(e) => {
                setFormData({ ...formData, accesibility: e.detail.value });
              }}
              value={formData.accesibility}
            />
          </IonItem>
          <IonItem lines="none">
            <Field
              label="Estado de la actividad"
              errorText="Esta contraseña no coincide con la del campo anterior"
              placeholder="Introduzca la misma contraseña"
              validationFn={() => true}
              type="text"
              onIonInput={(e) => {
                setFormData({ ...formData, state: e.detail.value });
              }}
              value={String(formData.state)}
            />
          </IonItem>
          <IonButton type="submit" expand="block">
            {loading ? <Spinner /> : 'Crear Actividad'}
          </IonButton>
        </form>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => {
            setShowAlert(false);
            error ?? history.push('/admin/dashboard');
          }}
          header={error ? 'Error' : 'Actividad creada'}
          message={error ?? 'La actividad ha sido registrada correctamente'}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default CreateActivity;
