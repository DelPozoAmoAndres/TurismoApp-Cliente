import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
/* Ionic Components*/
import { IonButton, IonDatetime, IonGrid, IonList, IonRow } from '@ionic/react';
/*Components */
import { Modal } from '@shared/Modal';
/* i18n */
import { useTranslation } from 'react-i18next';
/* Utils */
import { formatDateToTime } from '@utils/Utils';
/* Contexts */
import { useAuth } from '@contexts/AuthContexts';
/* Hooks */
import { useLanguage } from '@hooks/useLanguage';
import { useActivityAvailability } from '@hooks/useActivityAvailability';
/* Styles */
import './ActivityAvailability.css';
import { Role } from '@models/User';

export const ActivityAvailability: React.FC<{ activityId: string }> = ({ activityId }) => {
  const { selectedEvent, selectedEvents, selectedDate, highlightedDates, handleDateChange, setSelectedEvent } =
    useActivityAvailability(activityId);
  const modal = useRef<HTMLIonModalElement>(null); //Reference of the modal to close it
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const { defaultLanguage } = useLanguage(); //Hook to know the language selected
  const auth = useAuth(); //Context of the user
  const history = useHistory(); //Hook to navigate to another page of the app
  const { setShowLoginModal } = useAuth();


  const handleReserva = () => {
    //Method to go to the reservation page
    history.push('/activity/' + activityId + '/reservar', selectedEvent);
    modal.current?.dismiss(); //Close the modal
  };

  useEffect(() => {
    if (selectedEvents && selectedEvents.length > 0) modal.current?.setCurrentBreakpoint(1)
    else modal.current?.setCurrentBreakpoint(modal.current?.breakpoints && modal.current?.breakpoints[1] || 1)
  }, [selectedEvents]);

  return (
    <Modal
      id="availability-modal-card"
      title={t('availability')}
      trigger={'Availability-modal'}
      modal={modal}
      minHeightAndroid={selectedEvents.length ? window.innerHeight : 640}
      minHeightIos={selectedEvents.length ? window.innerHeight : 670}
    >
      <IonGrid>
        <IonRow>
          <IonDatetime
            locale={defaultLanguage.code}
            presentation={'date'}
            onIonChange={(e) => { handleDateChange(new Date(String(e.detail.value) || '')); }}
            value={selectedDate?.toISOString()}
            highlightedDates={highlightedDates}
          />

          <IonList class="ion-no-padding ion-no-margin">
            {selectedEvents?.map((e, index) => (
              <>
                <IonButton
                  key={index}
                  color={selectedEvent !== e ? 'primary' : 'secondary'}
                  onClick={() => {
                    if (selectedEvent !== e) setSelectedEvent(e);
                    else setSelectedEvent(null);
                  }}
                >
                  {`${formatDateToTime(e.date)}`}
                  <br />
                  {e.language ? e.language : 'Español'} <br /> {e.price + '€'}
                </IonButton>
              </>
            ))}
          </IonList>
        </IonRow>
        {(!auth.user || auth.user.role === Role.turista) && <div>
          <IonButton
            expand="block"
            onClick={() => {
              auth.user
                ? handleReserva()
                : (modal.current?.dismiss() && setShowLoginModal(true));
            }}
            disabled={selectedEvent === null}
          >
            {auth.user ? 'Reservar' : 'Iniciar sesión para reservar'}
          </IonButton>
        </div>
        }
      </IonGrid>
    </Modal>
  );
};
