import React, { FormEvent, useContext, useRef, useState } from 'react';
import { IonPage, IonContent, IonItem, IonButton, IonAlert, IonHeader, IonToolbar, IonTitle, IonButtons } from '@ionic/react';
import { AuthContext } from '@contexts/AuthContexts';
import { RouteComponentProps } from 'react-router';
import Spinner from '@shared/Spinner';
import { Field } from '@shared/Field';
import { dateValidation, emailValidation, lengthValidation, telephoneValidation } from '@utils/Validations';
import { RegisterFormData } from '@models/User';
import { filterPropertiesNotNull, formatDate } from '@utils/Utils';
import { AxiosError } from 'axios';

const CreateUser: React.FC<RouteComponentProps> = ({ history }) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    telephone: '',
    email: '',
    birthday: null,
    country: null,
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const page = useRef(null);
  const auth = useContext(AuthContext);

  const handleRegister = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      setError(null);
      await auth.register(filterPropertiesNotNull(formData));
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
          <IonTitle>Dar de alta nuevos usuarios</IonTitle>
          <IonButtons slot="start">
            <IonButton mode="ios" onClick={() => history.push('/admin/dashboard')}>
              Cancelar
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleRegister}>
          <IonItem lines="none">
            <Field
              label="Nombre y apellidos"
              errorText="Introduce cadena con mas de 8 caracteres"
              placeholder="Introduzca su nombre y apellidos"
              type="text"
              onIonInput={(e) => setFormData({ ...formData, name: e.detail.value })}
              validationFn={(e) => lengthValidation(8, e)}
              value={formData.name}
            />
          </IonItem>
          <IonItem lines="none">
            <Field
              label="Correo electronico"
              errorText="Introduzca una cadena que tenga formato email"
              placeholder="Introduzca su correo electronico"
              type="email"
              onIonInput={(e) => setFormData({ ...formData, email: e.detail.value })}
              validationFn={emailValidation}
              value={formData.email}
            />
          </IonItem>
          <IonItem lines="none">
            <Field
              label="Teléfono (Opcional)"
              errorText="Introduzca un numero de telefono"
              placeholder="Introduzca su número de teléfono"
              type="tel"
              onIonInput={(e) => setFormData({ ...formData, telephone: e.detail.value })}
              validationFn={telephoneValidation}
              value={formData.telephone ?? ""}
            />
          </IonItem>
          <IonItem lines="none">
            <Field
              label="Fecha de nacimiento (Opcional)"
              errorText="Seleccione una fecha anterior a hoy"
              placeholder="Seleccione una fecha"
              validationFn={dateValidation}
              type="date"
              onIonInput={(e) => {
                setFormData({
                  ...formData,
                  birthday: new Date(e.detail.value),
                });
              }}
              value={formatDate(formData.birthday || null)}
            />
          </IonItem>
          <IonItem lines="none">
            <Field
              label="País (Opcional)"
              errorText="Introduzca un país valido"
              placeholder="Introduzca tu pais de nacionalidad"
              validationFn={() => true}
              type="text"
              onIonInput={(e) => {
                setFormData({ ...formData, country: e.detail.value });
              }}
              value={formData.country ? formData.country : ''}
            />
          </IonItem>

          <IonItem lines="none">
            <Field
              label="Contraseña"
              errorText="Introduzca una cadena de más de 8 caracteres"
              placeholder="Introduzca una contraseña"
              validationFn={() => true}
              type="password"
              onIonInput={(e) => {
                setFormData({ ...formData, password: e.detail.value });
              }}
              value={formData.password}
            />
          </IonItem>
          <IonItem lines="none">
            <Field
              label="Confirmar contraseña"
              errorText="Esta contraseña no coincide con la del campo anterior"
              placeholder="Introduzca la misma contraseña"
              validationFn={() => true}
              type="password"
              onIonInput={(e) => {
                setFormData({ ...formData, confirmPassword: e.detail.value });
              }}
              value={formData.confirmPassword}
            />
          </IonItem>
          <IonItem lines="none">
            <Field
              label="Role"
              errorText="Debe ser un role valido"
              placeholder="Introduzca el role"
              validationFn={() => true}
              type="text"
              onIonInput={(e) => {
                setFormData({ ...formData, role: e.detail.value });
              }}
              value={formData.role || ''}
            />
          </IonItem>
          <IonButton type="submit" expand="block">
            {loading ? <Spinner /> : 'Registrarse'}
          </IonButton>
        </form>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => {
            setShowAlert(false);
            error ?? history.push('/');
          }}
          header={error ? 'Error' : 'Cuenta creada'}
          message={error ?? 'La cuenta ha sido registrada correctamente. Inicando sesión automaticamente'}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default CreateUser;
