import HomeView from "@/screens/home/Home.view";
import { useHome } from "@/screens/home/useHome.viewModel";
import React from "react";

const Home: React.FC = () => {
  const viewModel = useHome();
  return <HomeView {...viewModel} />;
};

export default Home;
