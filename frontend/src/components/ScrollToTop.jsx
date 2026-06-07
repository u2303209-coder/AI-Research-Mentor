import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Immediate scroll first, then smooth — fixes pages that render mid-scroll
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Small delay to catch async renders
    const t = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 50);

    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
