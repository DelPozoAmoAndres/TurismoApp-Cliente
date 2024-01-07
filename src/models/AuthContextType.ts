import { RegisterFormData, User } from './User';

export interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  deleteAccount: () => void;
  register: (formData: RegisterFormData) => void;
  setShowLoginModal: (show: boolean) => void;
  showLoginModal: boolean;
}
