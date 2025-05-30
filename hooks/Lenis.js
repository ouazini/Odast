// hooks/useLenis.js
import { useEffect } from "react";
import Lenis from "lenis";

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1, // smoothness (0 = instant, 1 = very slow)
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Clean up on unmount
    return () => {
      lenis.destroy();
    };
  }, []);
}
