import { useRef } from "react";
import { useLocation } from "react-router-dom"; // Import this
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const PageWrapper = ({ children }) => {
  const container = useRef();
  const { pathname } = useLocation(); // Get current path

  useGSAP(
    () => {
      // We use .fromTo to ensure it reset to start values on every route change
      gsap.fromTo(
        container.current,
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      );
    },
    { dependencies: [pathname], scope: container }, // Watch for path changes
  );

  return (
    <div ref={container} style={{ opacity: 0 }}>
      {children}
    </div>
  );
};

export default PageWrapper;
