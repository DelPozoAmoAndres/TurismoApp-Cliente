// const MAX_FILE_SIZE_KB = 100;
// const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_KB * 1024; 

// Filtrar las propiedades que no sean null
const filterPropertiesNotNull = (data: any) => {
  const filteredData: any = {};
  Object.entries(data).forEach(([key, value]) => {
    if (value && value !== null && value !== '') {
      filteredData[key] = value instanceof Set ? Array.from(value) : value;
    }
  });
  console.log(filteredData);
  return filteredData;
};

//Formatear fechas para inputs
const formatDate = (date: Date | null, showTime?: boolean): string => {
  if (!date) return '';
  date = new Date(date.toString());
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  let time = '';
  if (showTime) {
    let hours = date.getHours().toString();
    hours = hours.length > 1 ? hours : '0' + hours;
    let minutes = date.getMinutes().toString();
    minutes = minutes.length > 1 ? minutes : '0' + minutes;
    time = 'T' + hours + ':' + minutes;
  }
  return `${year}-${month}-${day}${time}`;
};

const formatDateToTime = (date: Date | null): string => {
  return formatDate(date, true).split('T')[1];
};

const formatTime = (time: number): string => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function getItem(key: string) {
  try {
    return localStorage.getItem(key);
  } catch (error: unknown) {
    return null;
  }
}

function setItem(key: string, item: string) {
  try {
    localStorage.setItem(key, item);
  } catch (error: unknown) {
    return null;
  }
}

function removeItem(key: string) {
  try {
    localStorage.removeItem(key);
  } catch (error: unknown) {
    return null;
  }
}

async function uploadImage(fr: FileReader, event: React.ChangeEvent<HTMLInputElement>, getImage: () => void) {
  const files = event.target.files;
  if (files && files?.length > 0) {
    const process = async () => {
      fr.removeEventListener("load", process);
      const file = files[0]
      // if (file && file.size > MAX_FILE_SIZE_BYTES) {
      //   //FIXME: Mostrar mensaje de error
      //   alert(`El archivo es demasiado grande. El tamaño máximo permitido es de ${MAX_FILE_SIZE_KB}MB.`);
      //   return;
      // }
      await optimizeImage(fr, file)
      getImage()
    }
    fr.addEventListener('load', process);
    fr.readAsDataURL(files[0])
  }
}

async function optimizeImage(fr: FileReader, file: File) {
  return new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width; // Ancho deseado
      canvas.height = img.height; // Ancho deseado

      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        if (blob) {
          fr.onload = () => {
            resolve(fr.result as string);
          };

          fr.onerror = (error) => {
            reject(error);
          };

          fr.readAsDataURL(blob);
        } else {
          reject(new Error('Error al crear el Blob'));
        }
      }, 'image/webp', 0.5);
    };

    img.onerror = (error) => {
      reject(error);
    };

    img.src = URL.createObjectURL(file);
  });
}

export { filterPropertiesNotNull, formatDate, formatDateToTime, getItem, setItem, removeItem, uploadImage, formatTime };