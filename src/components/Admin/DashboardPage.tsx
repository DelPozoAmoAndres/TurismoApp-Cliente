import React from 'react';
import { IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonAvatar, IonList, IonItem, IonLabel } from '@ionic/react';
import '@ionic/react/css/core.css';
import { DashboardLayout } from '@components/web/layouts/DashboardLayout';
import RadialGraph from './RadialGraph';
import BarChart from './BarChart';
import { useTranslation } from 'react-i18next';
import { LineChart } from './LineChart';
import CancellationRateChart from './CancellationRateChart';
import { formatDate } from '@utils/Utils';

export const DashboardPage: React.FC = () => {

    const { t } = useTranslation();
    const userDays = [
        { day: 1, sales: 435 },
        { day: 2, sales: 111 },
        { day: 3, sales: 421 },
        { day: 4, sales: 216 },
        { day: 5, sales: 255 },
        { day: 6, sales: 257 },
        { day: 7, sales: 307 },
        { day: 8, sales: 486 },
        { day: 9, sales: 327 },
        { day: 10, sales: 107 },
        { day: 11, sales: 303 },
        { day: 12, sales: 447 },
        { day: 13, sales: 479 },
        { day: 14, sales: 329 },
        { day: 15, sales: 321 },
        { day: 16, sales: 108 },
        { day: 17, sales: 359 },
        { day: 18, sales: 322 },
        { day: 19, sales: 362 },
        { day: 20, sales: 183 },
        { day: 21, sales: 342 },
        { day: 22, sales: 343 },
        { day: 23, sales: 243 },
        { day: 24, sales: 135 },
        { day: 25, sales: 352 },
        { day: 26, sales: 176 },
        { day: 27, sales: 181 },
        { day: 28, sales: 312 },
        { day: 29, sales: 205 },
        { day: 30, sales: 386 },
        { day: 31, sales: 154 }
    ];

    const ocupation = [
        { "day": 1, "value": 22 },
        { "day": 2, "value": 97 },
        { "day": 3, "value": 95 },
        { "day": 4, "value": 46 },
        { "day": 5, "value": 54 },
        { "day": 6, "value": 9 },
        { "day": 7, "value": 79 },
        { "day": 8, "value": 23 },
        { "day": 9, "value": 15 },
        { "day": 10, "value": 8 },
        { "day": 11, "value": 98 },
        { "day": 12, "value": 65 },
        { "day": 13, "value": 33 },
        { "day": 14, "value": 82 },
        { "day": 15, "value": 79 },
        { "day": 16, "value": 3 },
        { "day": 17, "value": 8 },
        { "day": 18, "value": 38 },
        { "day": 19, "value": 70 },
        { "day": 20, "value": 30 },
        { "day": 21, "value": 75 },
        { "day": 22, "value": 31 },
        { "day": 23, "value": 95 },
        { "day": 24, "value": 54 },
        { "day": 25, "value": 85 },
        { "day": 26, "value": 76 },
        { "day": 27, "value": 72 },
        { "day": 28, "value": 33 },
        { "day": 29, "value": 89 },
        { "day": 30, "value": 69 },
        { "day": 31, "value": 75 }
    ]
        ;
    const content =
        <IonGrid class='ion-no-margin'>
            <IonRow>
                {/* <IonCol size="12" size-lg="8">
                        <IonSearchbar placeholder="Search..." />
                    </IonCol> */}
            </IonRow>
            <IonRow>
                {/* Statistics Cards */}
                <IonCol>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardSubtitle>{t('total.reservations')}</IonCardSubtitle>
                            <IonCardTitle>34578</IonCardTitle>
                            <IonCardSubtitle>Last: 30.4k</IonCardSubtitle>
                        </IonCardHeader>
                    </IonCard>
                </IonCol>
                <IonCol>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardSubtitle>{t('total.incomings')}</IonCardSubtitle>
                            <IonCardTitle>34578</IonCardTitle>
                            <IonCardSubtitle>Last: 30.4k</IonCardSubtitle>
                        </IonCardHeader>
                    </IonCard>
                </IonCol>
                <IonCol>
                    <IonCard>
                        <IonGrid>
                            <IonRow>
                                <IonCol size='2'>
                                    <IonCardHeader class='ion-no-padding ion-padding-left' >
                                        <IonCardSubtitle>{t('ocupation.porcentage')}</IonCardSubtitle>
                                        <IonCardTitle>80%</IonCardTitle>
                                    </IonCardHeader>
                                </IonCol>
                                <IonCol size='10'>
                                    <LineChart data={ocupation} height={85} width={600} />
                                </IonCol>
                            </IonRow>
                        </IonGrid>


                    </IonCard>
                </IonCol>
                <IonCol>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardSubtitle>{t('total.users')}</IonCardSubtitle>
                            <IonCardTitle>34578</IonCardTitle>
                            <IonCardSubtitle>Last: 30.4k</IonCardSubtitle>
                        </IonCardHeader>
                    </IonCard>
                </IonCol>
                <IonCol>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardSubtitle>{t('increment.users')}</IonCardSubtitle>
                            <IonCardTitle>34578</IonCardTitle>
                            <IonCardSubtitle>Last: 30.4k</IonCardSubtitle>
                        </IonCardHeader>
                    </IonCard>
                </IonCol>
                {/* Repeat for other cards */}
            </IonRow>
            <IonRow>
                {/* Statistics Cards */}
                <IonCol >
                    <IonCard>
                        <IonCardHeader>
                            <IonCardSubtitle>{t('cancelation.rate')}</IonCardSubtitle>
                            <IonCardTitle>80%</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <CancellationRateChart width={500} height={270} data={[{ period: "1", cancellations: 1, reservations: 100 }, { period: "2", cancellations: 1, reservations: 30 }, { period: "3", cancellations: 1, reservations: 70 }, { period: "4", cancellations: 1, reservations: 45 }]} />
                        </IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardSubtitle>Daily Sales</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <RadialGraph data={[50, 50]} />
                        </IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol >
                    <IonCard>
                        <IonCardHeader>
                            <IonCardSubtitle>Total users</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <BarChart data={userDays} height={300} width={500} />
                        </IonCardContent>
                    </IonCard>
                </IonCol>

            </IonRow>
            <IonRow>
                {/* Charts and Recent Users */}
                <IonCol size="12">
                    {/* Charts */}
                    <IonLabel class='ion-margin-start'>
                        <strong>Actividad reciente</strong>
                    </IonLabel>
                    <IonList>
                        {userDays.map((i) => (
                            <IonItem key={i.day}>
                                <IonAvatar slot="start">
                                    <img src="https://placehold.co/40x40.png" alt="User Avatar" />
                                </IonAvatar>
                                <IonLabel>
                                    <h2>Louis Hansen</h2>
                                    <p>Web designer</p>
                                </IonLabel>
                                <IonLabel>
                                    <h2>Reserva</h2>
                                    <p>20€</p>
                                </IonLabel>
                                <IonLabel slot='end'>
                                    <h2>{formatDate(new Date())}</h2>
                                </IonLabel>
                            </IonItem>
                        ))}

                    </IonList>
                </IonCol>
            </IonRow>
        </IonGrid>

    return <DashboardLayout> {content}</DashboardLayout>
};
