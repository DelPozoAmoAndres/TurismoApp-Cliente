import React from 'react';
import { IonButton, IonIcon, IonNavLink } from '@ionic/react';
import { useAuth } from '../contexts/AuthContexts';
import { Role } from '../models/User';
import { useNavButtonProps } from '../hooks/useNavButtonProps';
import { useScreen } from '../hooks/useScreen';

interface ButtonProps {
  mode?: 'ios' | 'md' | undefined;
  icon: string;
  text: string;
  routeLink?: string;
  role?: Role | null;
  id?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ mode, icon, text, role, routeLink="", id, onClick }) => {
  const { props } = useNavButtonProps(routeLink); // Hook to mark as selected the navlink
  const auth = useAuth(); //Context of user
  const routeProps = routeLink?{routerLink: routeLink}:{}
  const { isMobile } = useScreen(); //
  return (
    <IonNavLink
      hidden={isMobile || !((auth.user && role === null) || auth.user?.role === role || (role === undefined && auth.token === null))}
    >
      <IonButton onClick={onClick} routerDirection='root' {...props} mode={mode || 'ios'} {...routeProps} id={id}>
        <IonIcon icon={icon} />
        <p>{text}</p>
      </IonButton>
    </IonNavLink>
  );
};
