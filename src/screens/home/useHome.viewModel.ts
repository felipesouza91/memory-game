import { useState } from "react";

export const useHome = () => {
  const [loading, setLoading] = useState(false);
  return { loading, setLoading };
};
