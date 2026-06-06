import { useEffect, useState } from "react";

interface UseCountdownOverlayParams {
  visible: boolean;
  handleCountdownComplete: () => void;
}

export const useCountdownOverlay = ({
  handleCountdownComplete,
  visible,
}: UseCountdownOverlayParams) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (visible) {
      setCount(3);
      let currentCount = 3;
      const timeId = setInterval(() => {
        if (currentCount > 1) {
          currentCount--;
          setCount(currentCount);
        } else {
          clearInterval(timeId);
          handleCountdownComplete();
        }
      }, 1000);
      return () => clearInterval(timeId);
    }
  }, [handleCountdownComplete, visible, setCount]);

  return { count, visible };
};
