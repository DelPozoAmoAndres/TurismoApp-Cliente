import React, { useEffect } from 'react';
import { IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonAvatar, IonList, IonItem, IonLabel } from '@ionic/react';
import '@ionic/react/css/core.css';
import { DashboardLayout } from '@components/web/layouts/DashboardLayout';
import RadialGraph from './RadialGraph';
import BarChart from './BarChart';
import { useTranslation } from 'react-i18next';
import { AreaProps, LineChart } from './LineChart';
import CancellationRateChart from './CancellationRateChart';
import { formatDate } from '@utils/Utils';
import { getCancelationRate, getDailySales, getOccupation, getTotalIncome, getTotalReservations, getTotalUsers } from '@apis/dashboardApi';
import { useDashboardData } from '@hooks/useDashboardData';

export const DashboardPage: React.FC = () => {

    const { t } = useTranslation();
    const { totalReservations, totalIncome, occupationData, totalUsers, cancelationData, categoryReservations,reservations } = useDashboardData();

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
                            <IonCardTitle>{totalReservations}</IonCardTitle>
                            <IonCardSubtitle>Last: 30.4k</IonCardSubtitle>
                        </IonCardHeader>
                    </IonCard>
                </IonCol>
                <IonCol>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardSubtitle>{t('total.income')}</IonCardSubtitle>
                            <IonCardTitle>{totalIncome}€</IonCardTitle>
                            <IonCardSubtitle>Last: 30.4k</IonCardSubtitle>
                        </IonCardHeader>
                    </IonCard>
                </IonCol>
                <IonCol>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardSubtitle>{t('total.users')}</IonCardSubtitle>
                            <IonCardTitle>{totalUsers}</IonCardTitle>
                            <IonCardSubtitle>Last: 30.4k</IonCardSubtitle>
                        </IonCardHeader>
                    </IonCard>
                </IonCol>
            </IonRow>
            <IonRow >
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonCard>
                        <IonCardHeader  >
                            <IonCardSubtitle>{t('ocupation.porcentage')}</IonCardSubtitle>
                            <IonCardTitle>{occupationData.occupationRate}%</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <LineChart data={occupationData.occupationPoints} height={270} width={500} />
                        </IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardSubtitle>Daily Sales</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent class="ion-no-margin">
                            <RadialGraph values={categoryReservations} />
                        </IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol >
                    <IonCard>
                        <IonCardHeader>
                            <IonCardSubtitle>{t('cancelation.rate')}</IonCardSubtitle>
                            <IonCardTitle>{cancelationData.cancelRate}%</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent class="ion-no-margin">
                            <CancellationRateChart width={500} height={270} data={cancelationData.cancelationsByDayOfMonth} />
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
                        {reservations.map((i,index) => (
                            <IonItem key={index}>
                                <IonAvatar slot="start">
                                    <img src="https://placehold.co/40x40.png" alt="User Avatar" />
                                </IonAvatar>
                                <IonLabel>
                                    <h2>{i.reservations?.at(0)?.name}</h2>
                                    <p>{i.reservations?.at(0)?.email}</p>
                                </IonLabel>
                                <IonLabel>
                                    <h2>{i.reservations?.at(0)?.activity?.name}</h2>
                                    <p>{i.reservations?.at(0)?.activity?.category}</p>
                                </IonLabel>
                                <IonLabel>
                                    <h2>{i.reservations?.at(0)?.state}</h2>
                                    <p>{i.reservations?.at(0)?.price}€</p>
                                </IonLabel>
                                <IonLabel slot='end'>
                                    <h2>{formatDate(i.reservations?.at(0)?.date || null)}</h2>
                                </IonLabel>
                            </IonItem>
                        ))}

                    </IonList>
                </IonCol>
            </IonRow>
        </IonGrid>

    return <DashboardLayout> {content}</DashboardLayout>
};
