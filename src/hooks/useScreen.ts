import { Capacitor } from '@capacitor/core';
import { useEffect, useState } from 'react';

export const useScreen = () => {
  // const mobileMaxWidth = 440;
  const mobileMaxWidth = 900;
  const [isMobile, setMobile] = useState(window.innerWidth < mobileMaxWidth);
  const browsingWeb = !Capacitor.isNativePlatform();
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < mobileMaxWidth);
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isMobile, browsingWeb, width, height };
};
