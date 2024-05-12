import { useContext, useState } from 'react';
import { changePassword } from '../apis/userApi';
import { NotificationContext } from '@contexts/NotificationToastContext';

export const useChangePassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const { showNotification } = useContext(NotificationContext);

    const check = async () => {
        if (password !== confirmPassword) {
            showNotification("Passwords do not match");
            return false;
        }
        return await changePassword(oldPassword, password).then((res) => {
            if (res)
                showNotification("Password changed successfully");
            else
                showNotification("Password change failed");
            return res;
        });
    }
    return { check, password, setPassword, confirmPassword, setConfirmPassword, oldPassword, setOldPassword }
}
