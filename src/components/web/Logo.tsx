import React from "react"

import { IonLabel } from "@ionic/react"

const Logo : React.FC = ()=>{
    return(
    <div className="ion-text-center">
      <strong>
        <IonLabel class="ion-margin-start ion-text-start" id="title-app" color={"primary"}>
          As
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Cruz_de_Asturias.svg/1200px-Cruz_de_Asturias.svg.png"
            width={20} />
          our
        </IonLabel>
      </strong>
    </div>
  )
}
export default Logo;