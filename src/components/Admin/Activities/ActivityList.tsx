import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonSearchbar,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonInput,
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { searchValidation } from '@utils/Validations';
import { Activity, ActivityFilter, ActivityState } from '@models/Activity';
import { getActivityList } from '@apis/activityApi';

const ActivityList: React.FC<RouteComponentProps> = ({ history }) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filters, setFilters] = useState<ActivityFilter>({ });
  const [searchText, setSearchText] = useState<string>('a');

  // Aquí deberías obtener la lista de usuarios desde tu fuente de datos
  useEffect(() => {
    search(searchText, filters);
  }, [searchText, filters]);

  const search = (searchText: string, filters: ActivityFilter) => {
    if (searchValidation(searchText)) getActivityList(searchText, filters).then((activities) => setActivities(activities));
  };

  const handleSearch = (e: CustomEvent) => {
    setSearchText(e.detail.value);
  };

  const handleViewDetails = (id: string | undefined) => {
    // Redirige a la página de detalles del usuario
    history.push(`/admin/activity/${id}`);
  };

  const handleFilter = (e: CustomEvent, filterName: string) => {
    const filtersCopy = { ...filters, [filterName]: e.detail.value };
    setFilters(filtersCopy);
  };

  // Obtiene los valores únicos de roles para generar las opciones del desplegable
  const states = Object.values(ActivityState);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar mode="ios">
          <IonTitle>Listado de Actividades</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonSearchbar placeholder="Buscar Actividades" onIonChange={handleSearch}></IonSearchbar>
        </IonItem>
        <IonItem>
          <IonSelect
            value={filters.state}
            placeholder="Filtrar por estado"
            onIonChange={(e) => handleFilter(e, 'state')}
            label="Estado"
            labelPlacement="floating"
          >
            <IonSelectOption value={null}>Todos los estados</IonSelectOption>
            {states.map((state) => (
              <IonSelectOption key={state} value={state}>
                {state}
              </IonSelectOption>
            ))}
          </IonSelect>
          <IonInput
            type="number"
            value={filters.duration ? String(filters.duration) : ''}
            placeholder="Introduce la duración maxima"
            onIonChange={(e) => handleFilter(e, 'duration')}
            label="Duración máx"
            labelPlacement="floating"
          />
        </IonItem>
        <IonList>
          {activities.map((activity) => (
            <IonItem key={activity._id}>
              <IonLabel>{activity.name}</IonLabel>
              <IonButton onClick={() => handleViewDetails(activity._id)} slot="end">
                Ver Detalles
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ActivityList;
