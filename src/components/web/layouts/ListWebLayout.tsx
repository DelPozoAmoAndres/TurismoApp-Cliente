import React from "react";
import { IonGrid, IonSearchbar } from "@ionic/react";
import "./ListWebLayout.css";
import { useTranslation } from "react-i18next";



interface Props {
    columns: () => React.ReactNode;
    items: () => React.ReactNode;
    search: (arg: string) => void;
    children?: React.ReactNode;
}

const ListWebLayout: React.FC<Props> = ({ columns, items, search, children }) => {
    const { t } = useTranslation();
    return (
        <div id="listLayout">
            <header>
                <IonSearchbar placeholder={t('ACTIONS.SEARCH') || ''} onIonInput={async e => search(e.detail.value || "")} />
                {children}
            </header>
            <main style={{ width: "100%" }}>
                <IonGrid class="ion-no-padding">
                    <div>
                        <table >
                            {columns()}
                            {items()}
                        </table>
                    </div>
                </IonGrid>
            </main>
        </div>
    );
}
export default ListWebLayout;