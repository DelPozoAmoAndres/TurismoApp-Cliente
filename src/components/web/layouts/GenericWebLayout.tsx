import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import { Header } from "../Header";
import Footer from "../Footer";

interface Props {
    children: React.ReactNode;
}

const GenericWebLayout: React.FC<Props> = ({ children }) => {
    return (
        <>
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