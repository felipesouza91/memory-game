import AuthView from "@/screens/auth/Auth.view";
import { useAuth } from "@/screens/auth/useAuth.viewModel";
import React from "react";

const Login: React.FC = () => {
  const viewModel = useAuth();
  return <AuthView {...viewModel} />;
};

export default Login;
