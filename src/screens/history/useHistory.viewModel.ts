import { Difficulty } from "@/shared/interfaces/difficulty";
import { useRankingStore } from "@/shared/stores/ranking.store";
import { format } from "date-fns";
const formatTime = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

export interface FormattedMatch {
  id: string;
  category: string;
  difficulty: Difficulty;
  time: string;
  possition: number;
  date: string;
}

export const useHistory = () => {
  const { scores } = useRankingStore();

  const matchs: FormattedMatch[] = scores.map((data, index) => ({
    id: data.id,
    category: data.category,
    difficulty: data.difficulty,
    time: formatTime(data.time),
    possition: index + 1,
    date: format(data.date, "dd/MM/yyyy"),
  }));

  const totalGame = scores.length;

  const evaregeTime =
    scores.length > 0
      ? formatTime(
          Math.round(
            scores.reduce(
              (total, data) => total + data.time / scores.length,
              0,
            ),
          ),
        )
      : "00:00";

  return { matchs, totalGame, evaregeTime };
};
