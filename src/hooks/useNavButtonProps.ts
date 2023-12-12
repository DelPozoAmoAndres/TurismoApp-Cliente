import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

export const useNavButtonProps = (routeLink: string) => {
  const history = useHistory();
  const [props, setProps] = useState({});

  useEffect(() => {
    const style = { borderBottom: ' 1px solid var(--ion-color-primary)' };
    const handlePopState = () => {
      if (routeLink==="") return {}
      return history.location.pathname.includes(routeLink) ? { style } : {};
    };
    history.listen(() => setProps(handlePopState));
  }, [history, routeLink]);

  return { props };
};
