import React, { Dispatch, SetStateAction } from "react";
import { RouterOutputs, api } from "@/utils/api";

type Game = RouterOutputs["games"]["getGame"];

export interface GameContextType {
  game: Game | null | undefined;
}

export const GameContext = React.createContext<GameContextType>(
  {} as GameContextType
);

interface Props {
  children: React.ReactNode;
}

export const GameProvider: React.FC<Props> = ({ children }) => {
  const { data: game } = api.games.getGame.useQuery();

  const context: GameContextType = {
    game,
  };

  return (
    <GameContext.Provider value={context}>{children}</GameContext.Provider>
  );
};
