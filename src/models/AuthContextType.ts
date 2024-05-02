import { RegisterFormData, User } from './User';

export interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  deleteAccount: () =>  Promise<void>;
  register: (formData: RegisterFormData) =>  Promise<void>;
  setShowLoginModal: (show: boolean) => void;
  showLoginModal: boolean;
}
