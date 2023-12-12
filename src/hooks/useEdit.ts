import { useEffect, useState } from 'react';

export const useEdit = <T>(item: T, editFunc: (arg0: T) => void) => {
    const [formData, setFormData] = useState<T | null>(item);
    const [edited, setEdited] = useState(false);
    const [originalData, setOriginalData] = useState<T | null>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false);
  
    const guardarCambios = () => {
      if (formData) {
        editFunc(formData);
        setShowAlert(true);
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
  
    return { formData, setFormData, showAlert, setShowAlert, guardarCambios, edited };
  };