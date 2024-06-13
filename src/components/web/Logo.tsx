import React from "react"

import { IonButton, IonLabel } from "@ionic/react"

const Logo: React.FC<{ color?: string }> = ({ color }) => {
  return (
    <IonButton id="title-app" color={'none'} className="ion-text-center" routerLink="/home" routerDirection="root">
      <strong>
        <IonLabel class="ion-margin-start ion-text-start" color={"dark"} style={{ color }}>
          As
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Cruz_de_Asturias.svg/1200px-Cruz_de_Asturias.svg.png"
            width={20} />
          our
        </IonLabel>
      </strong>
    </IonButton>
  )
}
export default Logo;