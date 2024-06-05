import React from 'react';
import { IonIcon, IonButton, IonRow } from '@ionic/react';
import { useScreen } from '../hooks/useScreen';
import GenericAppLayout from '@components/app/layouts/GenericAppLayout';
import { happyOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import GenericWebLayout from '@components/web/layouts/GenericWebLayout';
import { useTranslation } from 'react-i18next';

const ThankYouPage: React.FC = () => {
    const { browsingWeb } = useScreen();
    const { t } = useTranslation();
    const history = useHistory();

    const handleRestoreHistory = (route?: string) => {
        history.replace('/home')
        route && history.push(route);
    };

    const content = (
        <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            height: '100%'
        }}>
            <IonIcon icon={happyOutline} style={{ fontSize: '72px', color: '#10dc60' }} />
            <h2>{t('RESERVATION.ALL-SET')}</h2>
            <p>{t('RESERVATION.CONFIRM')}</p>
            <p style={{ marginLeft: "10px", marginRight: "10px", textAlign: "center" }}>{t('RESERVATION.CHECK')}</p>
            <IonRow style={{ gap: "20px" }}>
                <IonButton style={{ margin: "auto" }} expand="block" onClick={() => handleRestoreHistory("/reservas")}>
                    {t('RESERVATION.SHOW')}
                </IonButton>
                <IonButton style={{ margin: "auto" }} expand="block" onClick={() => handleRestoreHistory()}>
                    {t('RETURN.HOME')}
                </IonButton>
            </IonRow>
        </div>
    );
    return !browsingWeb ? <GenericAppLayout>{content}</GenericAppLayout> : <GenericWebLayout>{content}</GenericWebLayout>;
};

export default ThankYouPage;