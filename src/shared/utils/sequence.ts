type SequenceStep = {
  delay: number;
  action: () => void;
};

export const createSequence = () => {
  const steps: SequenceStep[] = [];
  let accumuledDelay = 0;
  const builder = {
    wait(ms: number) {
      accumuledDelay += ms;
      return builder;
    },
    then(action: () => void) {
      steps.push({ delay: accumuledDelay, action });
      accumuledDelay = 0;
      return builder;
    },
    run() {
      let totalDelay = 0;
      steps.forEach((step) => {
        totalDelay += step.delay;
        const delay = totalDelay;
        setTimeout(() => step.action(), delay);
      });
    },
  };

  return builder;
};
