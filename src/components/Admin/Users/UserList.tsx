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
import { Role, User, UserFilter } from '@models/User'; // Importa el modelo de usuario
import { getUserList } from '@apis/adminUserApi';
import { searchValidation } from '@utils/Validations';

type UserListProps = RouteComponentProps;

const UserList: React.FC<UserListProps> = ({ history }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<UserFilter>({
    country: null,
    role: null,
  });
  const [searchText, setSearchText] = useState<string>('a');

  // Aquí deberías obtener la lista de usuarios desde tu fuente de datos
  useEffect(() => {
    search(searchText, filters);
  }, [searchText, filters]);

  const search = (searchText: string, filters: UserFilter) => {
    if (searchValidation(searchText)) getUserList(searchText, filters).then((users) => setUsers(users));
  };

  const handleSearch = (e: CustomEvent) => {
    setSearchText(String(e.detail.value));
  };

  const handleViewDetails = (email: string | undefined) => {
    // Redirige a la página de detalles del usuario
    history.push(`/admin/user/details/${email}`);
  };

  const handleFilter = (e: CustomEvent, filterName: string) => {
    const filtersCopy = { ...filters, [filterName]: e.detail.value };
    setFilters(filtersCopy);
  };

  // Obtiene los valores únicos de roles para generar las opciones del desplegable
  const roles = Object.values(Role);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar mode="ios">
          <IonTitle>Listado de Usuarios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonSearchbar placeholder="Buscar usuarios" onIonChange={handleSearch}></IonSearchbar>
        </IonItem>
        <IonItem>
          <IonSelect
            value={filters.role}
            placeholder="Filtrar por rol"
            onIonChange={(e) => handleFilter(e, 'role')}
            label="Role"
            labelPlacement="floating"
          >
            <IonSelectOption value={null}>Todos los roles</IonSelectOption>
            {roles.map((role) => (
              <IonSelectOption key={role} value={role}>
                {role}
              </IonSelectOption>
            ))}
          </IonSelect>
          <IonInput
            value={filters.country}
            placeholder="Introduce el país"
            onIonChange={(e) => handleFilter(e, 'country')}
            label="País"
            labelPlacement="floating"
          />
        </IonItem>
        <IonList>
          {users.map((user) => (
            <IonItem key={user.email}>
              <IonLabel>{user.name}</IonLabel>
              <IonButton onClick={() => handleViewDetails(user.email)} slot="end">
                Ver Detalles
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default UserList;
