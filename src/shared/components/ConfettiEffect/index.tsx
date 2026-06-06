import React from "react";
import ConfettiEffectView from "./ConfettiEffect.view";
interface ConfettiEffectParams {
  active: boolean;
  burstCount?: number;
  continuousCount?: number;
  continuousInterval?: number;
}
const ConfettiEffect: React.FC<ConfettiEffectParams> = (props) => {
  return <ConfettiEffectView {...props} />;
};

export default ConfettiEffect;
