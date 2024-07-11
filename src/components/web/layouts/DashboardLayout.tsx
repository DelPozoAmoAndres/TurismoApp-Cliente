import React, { useState } from 'react';
import { IonPage, IonContent, IonSplitPane, IonMenu, IonHeader, IonList, IonItem, IonIcon, IonLabel, IonRow, IonCheckbox, IonButton } from '@ionic/react';
import Logo from '../Logo';
import { homeOutline, listOutline, peopleOutline } from 'ionicons/icons';
import './DashboardLayout.css';

import LanguageSelector from '@shared/LanguageSelector';
import DarkModeToggle from '@shared/DarkModeToggle';
import { useTranslation } from 'react-i18next';
import { Field } from '@shared/Field';
import { formatDate } from '@utils/Utils';
import { useLocation } from 'react-router';
import { useMenuContext } from '@contexts/DashboardActivityContext';
import { EventModal } from '@components/Admin/Events/Modal/EventModal';
import { Event } from '@models/Activity';

interface Props {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<Props> = ({ children }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const { showEvents, startDate, endDate, includeCancelled, setShowEvents, setStartDate, setEndDate, setIncludeCancelled, setMenuForceUpdate } = useMenuContext();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <IonPage id="pageWeb">
            <IonSplitPane contentId="main" when="xs">
                <IonMenu contentId="main" menuId="main-menu" >
                    <IonHeader class='ion-margin-top ion-no-border' mode="ios" >
                        <Logo />
                    </IonHeader>
                    <IonContent className="ion-padding" style={{ background: "var(--ion-background-color)" }}>
                        <section id='dashboard-content'>
                            <IonList color='primary' class="ion-no-padding">
                                <IonItem routerLink="/admin/dashboard" routerDirection="root" lines="none" color={location.pathname.includes('/admin/dashboard') ? 'primary' : ""}>
                                    <IonIcon slot="start" icon={homeOutline} />
                                    <IonLabel>{t('DASHBOARD.TITLE')}</IonLabel>
                                </IonItem>
                                <IonItem routerLink="/admin/users" routerDirection="root" lines="none" color={location.pathname.includes('/admin/users') ? 'primary' : ""}>
                                    <IonIcon slot="start" icon={peopleOutline} />
                                    <IonLabel>{t('DASHBOARD.USER.TITLE')}</IonLabel>
                                </IonItem>
                                <IonItem routerLink="/admin/activities" routerDirection="root" lines="none" color={location.pathname.includes('/admin/activities') ? 'primary' : ""}>
                                    <IonIcon slot="start" icon={listOutline} />
                                    <IonLabel>{t('DASHBOARD.ACTIVITY.TITLE')}</IonLabel>
                                </IonItem>
                                {location.pathname.includes('/admin/activities') && <IonRow style={{ minHeight: 200, gap: 10 }}>
                                    <div className='ion-margin-start' style={{ background: "var(--ion-color-primary)", minHeight: "50%", width: 2 }}></div>
                                    <section style={{ background: "var(--ion--color--background)", borderRadius: 10, width: "88%" }}>
                                        <IonItem lines="none">
                                            <IonCheckbox checked={showEvents} onIonChange={(e) => setShowEvents(e.detail.checked)} labelPlacement="start">{t('ACTIVITY.SHOW.EVENTS')}</IonCheckbox>
                                        </IonItem>
                                        <IonItem lines="none" disabled={!showEvents}>
                                            <Field
                                                label={t('FROM')}
                                                placeholder=''
                                                errorText=''
                                                validationFn={function () { return true }}
                                                type="date"
                                                onIonInput={(e) => e.detail && setStartDate(e.detail.value)}
                                                value={formatDate(new Date(startDate) || null)}
                                            />
                                        </IonItem>
                                        <IonItem lines="none" disabled={!showEvents}>
                                            <Field
                                                label={t('TO')}
                                                placeholder=''
                                                errorText=''
                                                validationFn={function () { return true }}
                                                type="date"
                                                onIonInput={(e) => e.detail && setEndDate(e.detail.value)}
                                                value={formatDate(new Date(endDate) || null)}
                                            />
                                        </IonItem>
                                        <IonItem lines="none" disabled={!showEvents}>
                                            <IonCheckbox checked={includeCancelled} onIonChange={(e) => setIncludeCancelled(e.detail.checked)} labelPlacement="start">{t('ACTIONS.INCLUDE_CANCELLED')}</IonCheckbox>
                                        </IonItem>
                                        <>
                                            <IonButton style={{ width: "100%" }} onClick={() => setIsOpen(true)}>{t('ACTIONS.CREATE')} {t('ACTIVITY.EVENT.TITLE')}</IonButton>
                                            <EventModal event={new Event()} action="add" isOpen={isOpen} setOpen={setIsOpen} update={() => setMenuForceUpdate(true)} />
                                        </>
                                    </section>
                                </IonRow>}
                            </IonList>
                            <section>
                                <IonItem routerLink="/home" routerDirection="root" lines="none">
                                    <IonIcon slot="start" icon={listOutline} />
                                    <IonLabel>{t('HOME.TITLE')}</IonLabel>
                                </IonItem>
                                <LanguageSelector hidden={false} color="primary" />
                                <DarkModeToggle hidden={false} color="primary" />
                            </section>
                        </section>
                    </IonContent>
                </IonMenu>

                <div id="main">
                    <IonContent>
                        {/* Main content will go here, such as router-outlet */}
                        {children}
                    </IonContent>
                </div>
            </IonSplitPane>
        </IonPage >
    );
};
