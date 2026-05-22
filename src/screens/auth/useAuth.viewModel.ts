import { useAuthStore } from "@/shared/stores/auth.store";
import { router } from "expo-router";
import { useState } from "react";

export const useAuth = () => {
  const [userName, setUserName] = useState("");

  const { setAuthenticated } = useAuthStore();

  function handleLogin() {
    if (userName.trim() === "" || userName.length < 3) {
      return;
    }
    setAuthenticated(userName);
    router.replace("/home");
  }

  return { userName, setUserName, handleLogin };
};
