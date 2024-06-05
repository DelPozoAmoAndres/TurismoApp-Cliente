import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
/* Ionic Components*/
import { IonButton, IonDatetime, IonGrid, IonIcon, IonLabel, IonList, IonRow } from '@ionic/react';
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
import { addOutline, alarmOutline, globeOutline, removeOutline } from 'ionicons/icons';

export const ActivityAvailability: React.FC<{ activityId: string }> = ({ activityId }) => {
  const { selectedEvent, selectedEvents, selectedDate, highlightedDates, handleDateChange, setSelectedEvent, numPersons, setNumPersons } =
    useActivityAvailability(activityId);
  const modal = useRef<HTMLIonModalElement>(null); //Reference of the modal to close it
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const { defaultLanguage } = useLanguage(); //Hook to know the language selected
  const auth = useAuth(); //Context of the user
  const history = useHistory(); //Hook to navigate to another page of the app
  const { setShowLoginModal } = useAuth();


  const handleReserva = () => {
    //Method to go to the reservation page
    history.push('/activity/' + activityId + '/reservar', { event: selectedEvent, numPersons });
    modal.current?.dismiss(); //Close the modal
  };

  useEffect(() => {
    if (selectedDate === null && highlightedDates.length > 0) handleDateChange(new Date(highlightedDates[0].date));
    // eslint-disable-next-line
  }, [highlightedDates]);

  useEffect(() => {
    if (selectedEvents && selectedEvents.length > 0) modal.current?.setCurrentBreakpoint(1)
    else modal.current?.setCurrentBreakpoint(modal.current?.breakpoints && modal.current?.breakpoints[1] || 1)
  }, [selectedEvents]);

  console.log(highlightedDates)

  return (
    <Modal
      id="availability-modal-card"
      title={t('ACTIVITY.AVAILABILITY.TITLE')}
      trigger={'Availability-modal'}
      modal={modal}
      minHeightAndroid={selectedEvents.length ? window.innerHeight : 500}
      minHeightIos={selectedEvents.length ? window.innerHeight : 500}
    >
      <IonGrid>
        <IonRow>
          <section>
            <IonDatetime
              locale={defaultLanguage.code}
              presentation={'date'}
              onIonChange={(e) => { handleDateChange(new Date(String(e.detail.value) || '')); }}
              value={selectedDate?.toISOString()}
              highlightedDates={highlightedDates}
            />
            <div className="numPersons">
              <IonLabel style={{ margin: '0 20px' }}>{t('PEOPLE')}:</IonLabel>
              <IonIcon icon={removeOutline} style={{ background: numPersons == 1 ? "var(--ion--color--background)" : "var(--ion-color-primary)" }} onClick={() => numPersons > 1 && setNumPersons(numPersons - 1)} />
              <IonLabel style={{ margin: '0 20px' }}>{numPersons}</IonLabel>
              <IonIcon icon={addOutline} style={{ background: "var(--ion-color-primary)" }} onClick={() => setNumPersons(numPersons + 1)} />
            </div>
          </section>

          <IonList class="ion-no-padding ion-no-margin">
            {selectedEvents?.map((e, index) => (
              <>
                <IonButton
                  key={index}
                  color={selectedEvent !== e ? 'dark' : "primary"}
                  onClick={() => {
                    if (selectedEvent !== e) setSelectedEvent(e);
                    else setSelectedEvent(null);
                  }}
                >
                  <IonRow>
                    <IonRow>
                      <span><IonIcon icon={alarmOutline} /><span>{`${formatDateToTime(e.date)}`}</span></span>
                      <span><IonIcon icon={globeOutline} /><span>{t("LANGUAGE." + e.language.toUpperCase()) + ""}</span></span>
                    </IonRow>
                    <strong className='price'>{e.price + '€'}</strong>
                  </IonRow>
                </IonButton>
              </>
            ))}
          </IonList>
        </IonRow>
        {(!auth.user || auth.user.role === Role.turista) && <div className=" availability-button">
          <IonButton
            expand="block"
            onClick={() => {
              auth.user
                ? handleReserva()
                : (modal.current?.dismiss() && setShowLoginModal(true));
            }}
            disabled={selectedEvent === null}
          >
            {t(auth.user ? 'ACTIONS.BOOK' : 'LOG.IN_TO_BOOK')}
          </IonButton>
        </div>
        }
      </IonGrid>
    </Modal>
  );
};
