import React from "react";
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react";
import AppMenu from "../AppMenu";
import { Header } from "../Header";
import Footer from "../Footer";
import "./GenericWebLayout.css";
import { useTranslation } from "react-i18next";

interface Props {
    children: React.ReactNode;
}

const GenericWebLayout : React.FC<Props> = ({ children }) => {
    const { t } = useTranslation(); //Hook to change the translation without refreshing the page

    return (
        <>
            <AppMenu />
            <IonPage id="pageWeb">
                <IonContent>
                    <div>
                        <header><Header /></header>
                        <main>
                            {children}
                        </main>
                        <footer><Footer /></footer>
                    </div>
                </IonContent>
            </IonPage>
        </>
    );
}

export default GenericWebLayout;