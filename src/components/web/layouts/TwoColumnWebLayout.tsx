import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import { Header } from "../Header";
import Footer from "../Footer";
import { useScreen } from "@hooks/useScreen";
import "./TwoColumnWebLayout.css";

interface Props {
    children: React.ReactNode;
    leftContent: () => React.ReactNode;
}

const TwoColumnWebLayout: React.FC<Props> = ({ children, leftContent }) => {
    const { isMobile } = useScreen(); //Hook to have data of screen dimensions
    return (
        <>
            <IonPage id="pageWeb">
                <IonContent>
                    <div className="two-column">
                        <header><Header /></header>
                        <main>
                            <div className={!isMobile ? "sticky" : ""}>
                                {leftContent()}
                            </div>
                            {children}
                        </main>
                        <footer><Footer /></footer>
                    </div>
                </IonContent>
            </IonPage>
        </>
    );
}

export default TwoColumnWebLayout;