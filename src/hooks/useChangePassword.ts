import { useContext, useState } from 'react';
import { changePassword } from '../apis/userApi';
import { NotificationContext } from '@contexts/NotificationToastContext';
import { useTranslation } from 'react-i18next';

export const useChangePassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const { showNotification } = useContext(NotificationContext);
    const { t } = useTranslation();

    const check = async () => {
        if (password !== confirmPassword) {
            showNotification(t("DATA.PASSWORD.CONFIRM.ERROR"));
            return false;
        }
        return await changePassword(oldPassword, password).then((res) => {
            if (res)
                showNotification(t("DATA.PASSWORD.CONFIRM.SUCCESS"));
            else
                showNotification(t("DATA.PASSWORD.CONFIRM.FAIL"));
            return res;
        });
    }
    return { check, password, setPassword, confirmPassword, setConfirmPassword, oldPassword, setOldPassword }
}
