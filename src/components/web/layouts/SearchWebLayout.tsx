import Footer from "@components/web/Footer";
import { Header } from "@components/web/Header";
import React, { useRef } from "react";
import AppMenu from "../AppMenu";
import { IonContent, IonPage } from "@ionic/react";
import "./SearchWebLayout.css";
import { Modal } from "@shared/Modal";
import { useScreen } from "@hooks/useScreen";
import { useTranslation } from "react-i18next";

interface Props {
    leftMenu: React.ReactNode;
    children: React.ReactNode;
}

const SearchWebLayout: React.FC<Props> = ({ leftMenu, children }) => {
    const { isMobile } = useScreen(); //Hook to have data of screen dimensions
    const modal = useRef<HTMLIonModalElement>(null); //Reference of the modal to close it
    const { t } = useTranslation(); //Hook to change the translation without refreshing the page

    return (
        <>
            <AppMenu />
            <IonPage id="pageWeb">
                <IonContent>
                    <div>
                        <header><Header /></header>
                        <main>
                            <div id="activity-search-page" className='limits-content'>
                                {!isMobile
                                    ? <div className="sticky">
                                        {leftMenu}
                                    </div>
                                    : <Modal
                                        id="modal-filters"
                                        minWidthAndroid={Infinity}
                                        minWidthIos={Infinity}
                                        modal={modal}
                                        trigger="filters-modal"
                                        tittle={t('filters.title')}>
                                        {leftMenu}
                                    </Modal>
                                }
                                {children}
                            </div>
                        </main>
                        <footer><Footer /></footer>
                    </div>
                </IonContent >
            </IonPage >
        </>
    );
}
export default SearchWebLayout;