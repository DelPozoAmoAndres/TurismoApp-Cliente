import { NotificationContext } from '@contexts/NotificationToastContext';
import { useContext, useEffect, useState } from 'react';

export const useEdit = <T>(item: T, editFunc: (arg0: T) => Promise<any>, callback?:()=>void) => {
    const [formData, setFormData] = useState<T | null>(item);
    const [edited, setEdited] = useState(false);
    const [originalData, setOriginalData] = useState<T | null>(null);
    const {showNotification} = useContext(NotificationContext);
  
    const guardarCambios = () => {
      if (formData) {
        editFunc(formData)
        .then(()=>{
          callback && callback();
          showNotification("Cambios guardados correctamente");
        })
        .catch((error:any) => console.error(error));
      }
    };
  
    useEffect(() => {
      setFormData(item);
      setOriginalData(item);
    }, [item]);
  
    useEffect(() => {
      if (JSON.stringify(formData) !== JSON.stringify(originalData))
        setEdited(true);
      else
        setEdited(false);
    }, [formData,originalData]);
  
    return { formData, setFormData, guardarCambios, edited };
  };