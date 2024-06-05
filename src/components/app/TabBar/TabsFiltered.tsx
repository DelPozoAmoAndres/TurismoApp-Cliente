import React from 'react';
import { IonTabBar } from '@ionic/react';
import { Role } from '@models/User';
import { Tabs } from '@components/app/TabBar/Tabs';

const TabsFiltered = () => {
  const { HomeTab, ProfileTab, PersonalAreaTab, ReservationsTab, NextEventsTab, ConfigTab } = Tabs();

  const TuristTabs = (
    <IonTabBar slot="bottom">
      {HomeTab}
      {ReservationsTab}
      {ProfileTab}
      {ConfigTab}
    </IonTabBar>
  );

  const AnonymusTabs = (
    <IonTabBar slot="bottom">
      {HomeTab}
      {PersonalAreaTab}
      {ConfigTab}
    </IonTabBar>
  );

  const GuiaTabs = (
    <IonTabBar slot="bottom">
      {HomeTab}
      {NextEventsTab}
      {ProfileTab}
      {ConfigTab}
    </IonTabBar>
  );

  const AdminTabs = (
    <IonTabBar slot="bottom">
      {HomeTab}
      {ProfileTab}
      {ConfigTab}
    </IonTabBar>
  );

  const rolesTabs: { [key: string]: JSX.Element } = {
    [Role.administrador]: AdminTabs,
    [Role.turista]: TuristTabs,
    [Role.guía]: GuiaTabs,
    ['none']: AnonymusTabs,
  };

  return rolesTabs;
};

export default TabsFiltered;
