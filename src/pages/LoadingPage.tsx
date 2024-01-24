import React, { useEffect, useState } from 'react';
import { IonContent, IonSpinner } from '@ionic/react';
import { useScreen } from '../hooks/useScreen';
import GenericAppLayout from '@components/app/layouts/GenericAppLayout';

const LoadingPage: React.FC = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const { browsingWeb } = useScreen();
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const content = (
    <IonContent>
      {showSpinner ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <IonSpinner />
        </div>
      ) : null}
    </IonContent>
  );
  return !browsingWeb ? <GenericAppLayout>{content}</GenericAppLayout> : <>{content}</>;
};

export default LoadingPage;
