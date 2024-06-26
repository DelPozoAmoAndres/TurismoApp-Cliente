import React from 'react';
import { IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonAvatar, IonList, IonItem, IonLabel } from '@ionic/react';
import '@ionic/react/css/core.css';
import { DashboardLayout } from '@components/web/layouts/DashboardLayout';
import RadialGraph from './RadialGraph';
import { useTranslation } from 'react-i18next';
import CancellationRateChart from './CancellationRateChart';
import { formatDate } from '@utils/Utils';
import { useDashboardData } from '@hooks/useDashboardData';
import { LineChart } from './LineChart';

export const DashboardPage: React.FC = () => {

    const { t } = useTranslation();
    const { totalReservations, totalIncome, occupationData, totalUsers, cancelationData, categoryReservations,reservations } = useDashboardData();

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
