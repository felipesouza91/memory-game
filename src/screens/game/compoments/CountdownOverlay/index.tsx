import React from "react";
import CountdownOverlayView from "./CountdownOverlay.view";
import { useCountdownOverlay } from "./useCountdownOverlay.viewModel";

interface CountdownOverlayParams {
  visible: boolean;
  handleCountdownComplete: () => void;
}

const CountdownOverlay: React.FC<CountdownOverlayParams> = ({
  visible,
  handleCountdownComplete,
}) => {
  const viewModel = useCountdownOverlay({ visible, handleCountdownComplete });
  return <CountdownOverlayView {...viewModel} />;
};

export default CountdownOverlay;
