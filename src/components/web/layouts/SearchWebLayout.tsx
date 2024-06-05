import Footer from "@components/web/Footer";
import { Header } from "@components/web/Header";
import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import "./SearchWebLayout.css";
import { useScreen } from "@hooks/useScreen";

interface Props {
    leftMenu: () => React.ReactNode;
    children: React.ReactNode;
}

const SearchWebLayout: React.FC<Props> = ({ leftMenu, children }) => {
    const { isMobile } = useScreen(); //Hook to have data of screen dimensions
    return (
        <>
            <IonPage id="pageWeb" >
                <IonContent>
                    <div className="search-web">
                        <header><Header /></header>
                        <main>
                            {!isMobile && <div className="sticky">
                                {leftMenu()}
                            </div>}
                            {children}
                        </main>
                        <footer><Footer /></footer>
                    </div>
                </IonContent >
            </IonPage >
        </>
    );
}
export default SearchWebLayout;