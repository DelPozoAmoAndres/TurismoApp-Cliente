import React from 'react';
import { RouteComponentProps } from 'react-router';
/* Ionic components */
import { IonGrid } from '@ionic/react';
/* Hooks */
import { useScreen } from '@hooks/useScreen';
/* Components */
import GenericAppLayout from '@components/app/layouts/GenericAppLayout';
import { OrderStep } from '@create-reservation/1 - Activity Data/OrderStep';
import { PersonalDataStep } from './2 - Personal Data And Payment/PersonalDataStep';
import { DiagramSteps } from '@create-reservation/0 - Steps bar/DiagramSteps';
/* Contexts */
import ReservationProvider, { ReservationContext } from '@contexts/ReservationContext';
import { ReservationStatusPage } from '@create-reservation/3 - Confirmation/ReservationStatusPage';
import GenericWebLayout from '@components/web/layouts/GenericWebLayout';

type ReservationProps = RouteComponentProps<{
  id: string;
}>;

const ReservationPage: React.FC<ReservationProps> = ({ match }) => {
  const { browsingWeb } = useScreen();
  const content = (
    <ReservationProvider activityId={match.params.id}>
      <ReservationContext.Consumer>
        {({ step }) => (
            <IonGrid class="ion-padding-horizontal" style={{ maxWidth: '500px' }}>
              <DiagramSteps />
              <section hidden={step !== 1} className="ion-text-center">
                <OrderStep />
              </section>
              <section hidden={step !== 2}>
                <PersonalDataStep />
              </section>
              {step === 3 && <ReservationStatusPage />}
            </IonGrid>
        )}
      </ReservationContext.Consumer>
    </ReservationProvider>
  );

  return !browsingWeb ? <GenericAppLayout>{content}</GenericAppLayout> : <GenericWebLayout>{content}</GenericWebLayout>;
};

export default ReservationPage;
