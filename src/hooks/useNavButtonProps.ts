import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';

export const useNavButtonProps = (routeLink: string) => {
  const location = useLocation();
  const [props, setProps] = useState({});

  useEffect(() => {
    const style = { borderBottom: ' 1px solid var(--ion-color-primary)' };
    if (routeLink === "") return setProps({});
    setProps(location.pathname.includes(routeLink) ? { style } : {})
  }, [location, routeLink]);

  return { props };
};
