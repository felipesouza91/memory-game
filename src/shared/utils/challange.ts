import { colors, gradients } from "@/constants/colors";
import { ChallengeTheme } from "../interfaces/challenge";
import { Difficulty } from "../interfaces/difficulty";

export interface DifficultyConfig {
  difficulty: Difficulty;
  timeLimit: number;
  estimedTime: string;
}

export const difficultyConfigs: Record<Difficulty, DifficultyConfig> = {
  Fácil: {
    difficulty: "Fácil",
    timeLimit: 300,
    estimedTime: "5 min",
  },
  Médio: {
    difficulty: "Médio",
    timeLimit: 240,
    estimedTime: "4 min",
  },
  Difícil: {
    difficulty: "Difícil",
    timeLimit: 30,
    estimedTime: "3 min",
  },
};

export const challengeTheme: ChallengeTheme[] = [
  {
    id: "linguagens",
    title: "Linguagens de Programação",
    cards: [
      {
        name: "JavaScript",
        image: require("@/assets/images/JavaScript-logo.png"),
      },
      { name: "TypeScript", image: require("@/assets/images/ts.png") },
      { name: "Python", image: require("@/assets/images/python--v2.png") },
      { name: "Java", image: require("@/assets/images/java.png") },
      { name: "C#", image: require("@/assets/images/csharp.png") },
      {
        name: "Ruby",
        image: require("@/assets/images/ruby-programming-language.jpg"),
      },
    ],
    gradient: gradients.purpleDark as [string, string],
    arrowColor: colors.accent.purple,
  },
  {
    id: "frameworks",
    title: "Frameworks e Bibliotecas",
    cards: [
      { name: "React", image: require("@/assets/images/react.png") },
      { name: "Vue", image: require("@/assets/images/vue_icon_130791.png") },
      { name: "Angular", image: require("@/assets/images/angularjs.jpg") },
      { name: "Next.js", image: require("@/assets/images/nextjs.jpg") },
      {
        name: "React Native",
        image: require("@/assets/images/react-native.png"),
      },
      {
        name: "Svelte",
        image: require("@/assets/images/svelte-logo-by-gengns.png"),
      },
    ],
    gradient: gradients.blueDark as [string, string],
    arrowColor: colors.accent.blue,
  },
  {
    id: "tools",
    title: "Ferramentas de Desenvolvimento",
    cards: [
      { name: "Git", image: require("@/assets/images/git.jpg") },
      { name: "Docker", image: require("@/assets/images/docker-icon.png") },
      {
        name: "Kubernetes",
        image: require("@/assets/images/kubernet.svg.png"),
      },
      { name: "Jenkins", image: require("@/assets/images/jeikins.svg.png") },
      { name: "VSCode" },
      { name: "GitHub" },
    ],
    gradient: gradients.cyanDark as [string, string],
    arrowColor: colors.accent.cyan,
  },
];
