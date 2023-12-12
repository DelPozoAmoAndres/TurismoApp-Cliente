import axios, { AxiosError, HttpStatusCode } from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContextType } from '@models/AuthContextType';
import { User } from '@models/User';
import { RegisterFormData } from '@models/User';
import { getItem, removeItem, setItem } from '@utils/Utils';
import Login from '@components/4 - Personal Area/Login/Login';

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: (arg0, arg1) => {
    console.log(arg0, arg1);
  },
  logout: () => {
    console.log('logout');
  },
  register: (arg0) => {
    console.log(arg0);
  },
  setShowLoginModal: (arg0) => {
    console.log(arg0);
  },
  showLoginModal: false,
});

export const useAuth = () => useContext(AuthContext);

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = (props) => {
  const [token, setToken] = useState<string | null>(getItem('token'));
  const [user, setUser] = useState<User | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const register = async (formData: RegisterFormData) => {
    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      throw new Error('Error de inicio de sesión. Las contraseñas no coinciden');
    }
    // Enviar la información de registro al servidor
    return axios
      .post(process.env.REACT_APP_API_URL + '/register', formData)
      .then((response) => {
        //Si se ha creado correctamente iniciar sesión automaticamente
        if (response.status !== HttpStatusCode.Ok) throw new Error(response.data.message);
        else login(formData.email, formData.password);
      })
      .catch((error) => {
        // Manejar errores de registro
        error = error?.response?.data?.message || error.message;
        throw new Error(error ?? 'Error desconocido en el registro');
      });
  };

  const login = async (email: string, password: string) => {
    if (getItem('i18nextLng') == null) throw new Error('Debes de activar las cookies para poder iniciar sesión');
    return axios
      .post(process.env.REACT_APP_API_URL + '/login', { email, password })
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          setUser(response.data.user);
          setToken(response.data.token);
          setItem('token', response.data.token);
        } else throw new Error(response.data.message);
      })
      .catch((error) => {
        // Manejar errores de inicio de sesión
        error = error?.response?.data?.message || error.message;
        throw new Error(error ?? 'Error de inicio de sesión. Por favor, comprueba tus credenciales e inténtalo de nuevo.');
      });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    removeItem('token');
  };

  useEffect(() => {
    const handleToken = () => {
      const token = getItem('token');
      setToken(token);
      if (token) {
        axios
          .get(process.env.REACT_APP_API_URL + '/user')
          .then((response) => {
            console.log(response);
            if (!response.data) logout();
            setUser(response.data);
          })
          .catch((e: AxiosError) => {
            if (e.response && e.response.status === HttpStatusCode.Unauthorized) {

              logout();
            }
          });
      } else {
        setUser(null);
      }
    };

    handleToken();

    window.addEventListener('storage', handleToken);
    return () => {
      window.removeEventListener('storage', handleToken);
    };
  }, [token]);

  return ( 
    <AuthContext.Provider value={{ user, token, login, logout, register, setShowLoginModal, showLoginModal }}>
      <Login />
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
