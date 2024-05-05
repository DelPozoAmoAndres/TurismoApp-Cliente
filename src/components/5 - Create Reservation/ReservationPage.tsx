import React from 'react';
import { RouteComponentProps, useLocation } from 'react-router';
/* Ionic components */
import { IonGrid } from '@ionic/react';
/* Hooks */
import { useScreen } from '@hooks/useScreen';
/* Components */
import GenericAppLayout from '@components/app/layouts/GenericAppLayout';
import { OrderStep } from '@create-reservation/1 - Activity Data/OrderStep';
import { PersonalDataStep } from './2 - Personal Data And Payment/PersonalDataStep';
/* Contexts */
import ReservationProvider, { ReservationContext } from '@contexts/ReservationContext';
import { ReservationStatusPage } from '@create-reservation/3 - Confirmation/ReservationStatusPage';
import GenericWebLayout from '@components/web/layouts/GenericWebLayout';

type ReservationProps = RouteComponentProps<{
  id: string;
}>;

const ReservationPage: React.FC<ReservationProps> = ({ match }) => {
  const { browsingWeb, isMobile } = useScreen();

  const location = useLocation<{ numPersons: number }>();

  const content = (
    <ReservationProvider activityId={match.params.id}>
      <ReservationContext.Consumer>
        {({ step }) => {
          return (
            <IonGrid class="limits-content ion-margin-vertical ion-padding-horizontal" style={{ "display": "grid", "grid-template-columns": isMobile ? "1fr" : "1fr auto", "grid-template-rows": isMobile ? "auto 1fr" : "" }}>
              <section hidden={step !== 2} >
                <PersonalDataStep numPersons={location.state?.numPersons} />
              </section>
              <section>
                <OrderStep />
              </section>
              {step === 3 && <ReservationStatusPage />}
            </IonGrid>
          )
        }}
      </ReservationContext.Consumer>
    </ReservationProvider>
  );

  return !browsingWeb ? <GenericAppLayout>{content}</GenericAppLayout> : <GenericWebLayout>{content}</GenericWebLayout>;
};

export default ReservationPage;
