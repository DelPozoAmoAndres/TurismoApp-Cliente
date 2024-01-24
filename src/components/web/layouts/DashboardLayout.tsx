import React from 'react';
import { IonPage, IonContent, IonSplitPane, IonMenu, IonHeader, IonToolbar, IonList, IonItem, IonIcon, IonLabel } from '@ionic/react';
import Logo from '../Logo';
import { homeOutline, listOutline, peopleOutline } from 'ionicons/icons';
import './DashboardLayout.css';

import LanguageSelector from '@shared/LanguageSelector';
import DarkModeToggle from '@shared/DarkModeToggle';

interface Props {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<Props> = ({ children }) => {
    return (
        <IonPage id="pageWeb">
                <IonSplitPane contentId="main" when="xs">
                    <IonMenu contentId="main" menuId="main-menu" >
                        <IonHeader>
                            <IonToolbar color="secondary">
                                <Logo color='white' />
                            </IonToolbar>
                        </IonHeader>
                        <IonContent className="ion-padding" color="primary" class='primaryColor'>
                            <section id='dashboard-content'>
                                <IonList color='primary' class="ion-no-padding">
                                    <IonItem routerLink="/home" routerDirection="root" >
                                        <IonIcon slot="start" icon={homeOutline} />
                                        <IonLabel>Home</IonLabel>
                                    </IonItem>
                                    <IonItem routerLink="/admin/users" routerDirection="root">
                                        <IonIcon slot="start" icon={peopleOutline} />
                                        <IonLabel>List Users</IonLabel>
                                    </IonItem>
                                    <IonItem routerLink="/admin/activities" routerDirection="root">
                                        <IonIcon slot="start" icon={listOutline} />
                                        <IonLabel>List Activities</IonLabel>
                                    </IonItem>
                                    <IonItem routerLink="/admin/reservations" routerDirection="root">
                                        <IonIcon slot="start" icon={listOutline} />
                                        <IonLabel>List Reservations</IonLabel>
                                    </IonItem>
                                    <IonItem routerLink="/admin/events" routerDirection="root">
                                        <IonIcon slot="start" icon={listOutline} />
                                        <IonLabel>List Events</IonLabel>
                                    </IonItem>
                                    {/* Add more menu entries here */}
                                </IonList>
                                <section>
                                    <LanguageSelector hidden={false} color="secondary" />
                                    <DarkModeToggle hidden={false} color="secondary" />
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
