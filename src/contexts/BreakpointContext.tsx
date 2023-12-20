import { createContext, useEffect, useState } from 'react';

import { useMediaQuery } from 'react-responsive';

type BreakpointContextData = {
  isMobile: boolean;
};

export const BreakpointContext = createContext({} as BreakpointContextData);

export const BreakpointProvider = ({ children }) => {
  const [isMobile, setIsMobileScreen] = useState(false);
  const isMdScreen = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    setIsMobileScreen(isMdScreen);
  }, [isMdScreen]);

  return (
    <BreakpointContext.Provider value={{ isMobile }}>
      {children}
    </BreakpointContext.Provider>
  );
};
