import React from "react";
import { IonButton, IonGrid, IonSearchbar } from "@ionic/react";
import "./ListWebLayout.css";
import CreateActivity from "@components/Admin/Activities/CreateActivity";
import { ActivityModal } from "@components/2 - Search Activity/Modal/ActivityModal";
import { Activity } from "@models/Activity";


interface Props {
    columns: () => React.ReactNode;
    items: () => React.ReactNode;
    search: (arg:string) => void;
}

const ListWebLayout: React.FC<Props> = ({ columns, items,search }) => {
    return (
        <div>
            <header>
                <IonSearchbar onIonInput={async e=> search(e.detail.value || "")}/>
                <IonButton id="add">Create</IonButton>
            </header>
            <main style={{width:"100%"}}>
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