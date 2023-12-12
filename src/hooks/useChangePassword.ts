import { useState } from 'react';
import { changePassword } from '../apis/userApi';

export const useChangePassword = () => {
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [oldPassword,setOldPassword] = useState("");

    const check = async () =>{
        if(password!== confirmPassword)
            return false;
        return await changePassword(oldPassword,password)
    }
    return {check,password,setPassword,confirmPassword,setConfirmPassword,oldPassword,setOldPassword}
}
