import { useState, useEffect } from "react";

const MOBILE_MAX_WIDTH = 767;
const TABLET_LG_MIN_WIDTH = 1024;
const DESKTOP_MIN_WIDTH = 1350;

export const useScreenType = () => {
  const [width, setWidth] = useState(window?.innerWidth || 0);

  const isMobile = width <= MOBILE_MAX_WIDTH;
  const isTabletSm = width > MOBILE_MAX_WIDTH && width < TABLET_LG_MIN_WIDTH;
  const isTablet = width > MOBILE_MAX_WIDTH && width < DESKTOP_MIN_WIDTH;
  const isDesktop = width >= DESKTOP_MIN_WIDTH;

  useEffect(() => {
    const resizeHandler = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isMobile,
    isTabletSm,
    isTablet,
    isDesktop,
  };
};

export default useScreenType;
