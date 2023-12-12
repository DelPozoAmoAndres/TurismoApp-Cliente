import React from 'react';
import { Header } from './Header';
import Footer from './Footer';
import { IonContent, IonPage } from '@ionic/react';
import './PageTemplate.css';
import AppMenu from '@components/web/AppMenu';

interface PageTemplateProps {
    children: React.ReactNode;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ children }) => {

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
};

export default PageTemplate;