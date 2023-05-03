import React from "react";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

export interface GameContextType {
  myTurn: boolean;
  myBoard: boolean;
}

export const GameContext = React.createContext<GameContextType>(
  {} as GameContextType
);

interface Props {
  children: React.ReactNode;
}

export const GameProvider: React.FC<Props> = ({ children }) => {
  const { data: game } = api.games.getGame.useQuery();
  const { push } = useRouter();

  React.useEffect(() => {
    if (game === null) {
      push("/");
    }
    if (!!game) {
      push("/game");
    }
  }, [game]);

  const context: GameContextType = {
    myBoard: false,
    myTurn: false,
  };

  return (
    <GameContext.Provider value={context}>{children}</GameContext.Provider>
  );
};
