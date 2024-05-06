import React from 'react';
import { IonIcon, IonButton } from '@ionic/react';
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
            <h2>¡Todo listo!</h2>
            <p>Tu orden ha sido procesada con éxito</p>
            <p>{t('reservation.status.check.reservations')}</p>
            <IonButton expand="block" onClick={() => handleRestoreHistory("/reservas")}>
                {t('go.to.reservations')}
            </IonButton>
            <IonButton expand="block" onClick={() => handleRestoreHistory()} style={{ marginTop: '20px' }}>
                Volver al inicio
            </IonButton>
        </div>
    );
    return !browsingWeb ? <GenericAppLayout>{content}</GenericAppLayout> : <GenericWebLayout>{content}</GenericWebLayout>;
};

export default ThankYouPage;