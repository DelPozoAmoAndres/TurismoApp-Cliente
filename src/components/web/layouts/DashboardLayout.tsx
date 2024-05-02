import React from 'react';
import { IonPage, IonContent, IonSplitPane, IonMenu, IonHeader, IonToolbar, IonList, IonItem, IonIcon, IonLabel } from '@ionic/react';
import Logo from '../Logo';
import { homeOutline, listOutline, peopleOutline } from 'ionicons/icons';
import './DashboardLayout.css';

import LanguageSelector from '@shared/LanguageSelector';
import DarkModeToggle from '@shared/DarkModeToggle';
import { Header } from '../Header';

interface Props {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<Props> = ({ children }) => {
    return (
        <IonPage id="pageWeb">
                <IonSplitPane contentId="main" when="xs">
                    <IonMenu contentId="main" menuId="main-menu" >
                        <IonHeader class='ion-margin-top ion-no-border' mode="ios" >
                                <Logo/>
                        </IonHeader>
                        <IonContent className="ion-padding" style={{background:"var(--ion-background-color)"}}>
                            <section id='dashboard-content'>
                                <IonList color='primary' class="ion-no-padding">
                                    <IonItem routerLink="/admin/dashboard" routerDirection="root" lines="none">
                                        <IonIcon slot="start" icon={homeOutline} />
                                        <IonLabel>Home</IonLabel>
                                    </IonItem>
                                    <IonItem routerLink="/admin/users" routerDirection="root" lines="none">
                                        <IonIcon slot="start" icon={peopleOutline} />
                                        <IonLabel>List Users</IonLabel>
                                    </IonItem>
                                    <IonItem routerLink="/admin/activities" routerDirection="root" lines="none">
                                        <IonIcon slot="start" icon={listOutline} />
                                        <IonLabel>List Activities</IonLabel>
                                    </IonItem>
                                    <IonItem routerLink="/admin/reservations" routerDirection="root" lines="none">
                                        <IonIcon slot="start" icon={listOutline} />
                                        <IonLabel>List Reservations</IonLabel>
                                    </IonItem>
                                    <IonItem routerLink="/admin/events" routerDirection="root" lines="none">
                                        <IonIcon slot="start" icon={listOutline} />
                                        <IonLabel>List Events</IonLabel>
                                    </IonItem>
                                </IonList>
                                <section>
                                    <IonItem routerLink="/home" routerDirection="root" lines="none">
                                        <IonIcon slot="start" icon={listOutline} />
                                        <IonLabel>Exit</IonLabel>
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
        </IonPage>
    );
};
