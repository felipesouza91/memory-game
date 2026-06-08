import HistoryView from "@/screens/history/History.view";
import { useHistory } from "@/screens/history/useHistory.viewModel";
import React from "react";

const History: React.FC = () => {
  const viewModel = useHistory();
  return <HistoryView {...viewModel} />;
};

export default History;
