import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonInput,
  IonAlert,
  IonCheckbox,
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { getActivity } from '@apis/activityApi';
import { editActivity, deleteActivity } from '@apis/adminActivityApi';
import { Activity } from '@models/Activity';
import AddEvent from './Events/CreateEvent';

type ActivityDetailsProps = RouteComponentProps<{ id: string }>;

const ActivityDetails: React.FC<ActivityDetailsProps> = ({ match, history }) => {
  const [formData, setFormData] = useState<Activity | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [isEditModeActive, setEditModeActive] = useState<boolean>(false);
  // const [reservations, setReservations] = useState<any[]>([]);
  useEffect(() => {
    const id = match.params.id;
    getActivity(id).then((data: Activity) => {
      setFormData(data);
    });
    // getUserReservations(userId).then((data) => {
    //   setReservations(data);
    // });
  }, [match.params.id]);

  const guardarCambios = () => {
    if (formData) {
      editActivity(formData);
      setShowAlert(true);
      setEditModeActive(false);
    }
  };

  const handleAlertConfirm = () => {
    setShowAlert(false);
    formData?._id && deleteActivity(formData?._id);
    history.push('/admin/activities');
  };

  const handleAlertCancel = () => {
    setShowAlert(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Actividad</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem disabled={!isEditModeActive}>
            <IonInput
              value={formData?.name}
              label="Nombre"
              labelPlacement="stacked"
              onIonChange={(e) => formData && setFormData({ ...formData, name: e.detail.value || '' })}
            ></IonInput>
          </IonItem>
          <IonItem disabled={!isEditModeActive}>
            <IonInput
              value={formData?.description}
              label="Descripción"
              labelPlacement="stacked"
              onIonChange={(e) => formData && setFormData({ ...formData, description: e.detail.value || '' })}
            ></IonInput>
          </IonItem>
          <IonItem disabled={!isEditModeActive}>
            <IonInput
              value={formData?.accesibility}
              label="Accesibilidad"
              labelPlacement="stacked"
              onIonChange={(e) => formData && setFormData({ ...formData, accesibility: e.detail.value || '' })}
            ></IonInput>
          </IonItem>
          <IonItem disabled={!isEditModeActive}>
            <IonInput
              value={formData?.location}
              label="Ubicación"
              labelPlacement="stacked"
              onIonChange={(e) => formData && setFormData({ ...formData, location: e.detail.value || '' })}
            ></IonInput>
          </IonItem>
          <IonItem disabled={!isEditModeActive}>
            <IonInput
              value={formData?.duration}
              label="Duración (minutos)"
              labelPlacement="stacked"
              onIonChange={(e) => formData && setFormData({ ...formData, duration: Number(e.detail.value) })}
            ></IonInput>
          </IonItem>
          <IonItem disabled={!isEditModeActive}>
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
          {/* <IonItem disabled={!isEditModeActive}>
                        <IonInput  value={formData?.state!} label="Estado" labelPlacement='stacked' onIonChange={e => formData && setFormData({...formData, state: ActivityState[e.detail.value]})}></IonInput>
                    </IonItem> */}
          {isEditModeActive ? (
            <IonButton expand="block" onClick={guardarCambios}>
              Guardar cambios
            </IonButton>
          ) : (
            <IonButton expand="block" onClick={() => setEditModeActive(true)}>
              Editar actividad
            </IonButton>
          )}
          <IonButton expand="block" color="danger" onClick={() => setShowDeleteAlert(true)}>
            Borrar actividad
          </IonButton>
        </IonList>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Perfil actualizado"
          message="Los cambios se han guardado correctamente."
          buttons={['OK']}
        />
        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={handleAlertCancel}
          header="Eliminar cuenta"
          message="Estás seguro que desear eliminar permanentemente esta cuenta, no podrás recuperar la cuenta"
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: handleAlertCancel,
            },
            {
              text: 'Eliminar',
              handler: handleAlertConfirm,
            },
          ]}
        />
        <AddEvent activityId={match.params.id} />
      </IonContent>
    </IonPage>
  );
};

export default ActivityDetails;
