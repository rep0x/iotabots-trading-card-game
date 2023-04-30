import React, { Dispatch, SetStateAction } from "react";
import { RouterOutputs, api } from "@/utils/api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

type Game = RouterOutputs["games"]["getGame"];

export interface GameContextType {
  game: Game | null | undefined;
  refetch: () => void;
  isLoading: boolean;
}

export const GameContext = React.createContext<GameContextType>(
  {} as GameContextType
);

interface Props {
  children: React.ReactNode;
}

export const GameProvider: React.FC<Props> = ({ children }) => {
  const { data: game, isLoading, refetch } = api.games.getGame.useQuery();
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
    game,
    refetch,
    isLoading,
  };

  return (
    <GameContext.Provider value={context}>{children}</GameContext.Provider>
  );
};
