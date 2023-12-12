import React from 'react';
import { IonSpinner } from '@ionic/react';
import './Spinner.css';

interface SpinnerProps {
  message?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ message }) => {
  return (
    <div className="spinner-container">
      <IonSpinner />
      {message && <div className="spinner-message">{message}</div>}
    </div>
  );
};

export default Spinner;
