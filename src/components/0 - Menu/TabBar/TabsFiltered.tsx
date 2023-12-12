import React from 'react';
import { IonTabBar } from '@ionic/react';
import { Role } from '@models/User';
import { Tabs } from '@menu/TabBar/Tabs';

const TabsFiltered = () => {
  const { HomeTab, ProfileTab, PersonalAreaTab, ReservationsTab, NextEventsTab } = Tabs();

  const TuristTabs = (
    <IonTabBar slot="bottom">
      {HomeTab}
      {ReservationsTab}
      {ProfileTab}
    </IonTabBar>
  );

  const AnonymusTabs = (
    <IonTabBar slot="bottom">
      {HomeTab}
      {PersonalAreaTab}
    </IonTabBar>
  );

  const GuiaTabs = (
    <IonTabBar slot="bottom">
      {HomeTab}
      {NextEventsTab}
      {ProfileTab}
    </IonTabBar>
  );

  const AdminTabs = (
    <IonTabBar slot="bottom">
      {HomeTab}
      {ProfileTab}
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
