import React, { Dispatch, SetStateAction } from "react";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";

interface Attack {
  attacker: number | null;
  defender: number | null;
}

export interface GameContextType {
  attack: Attack;
  setAttack: Dispatch<SetStateAction<Attack>>;
  myTurn: boolean;
}

export const GameContext = React.createContext<GameContextType>(
  {} as GameContextType
);

interface Props {
  children: React.ReactNode;
}

const DEFAULT_ATTACK = {
  attacker: null,
  defender: null,
};

export const GameProvider: React.FC<Props> = ({ children }) => {
  const { user } = useUser();
  const { data: game } = api.games.getGame.useQuery();
  const { push } = useRouter();

  const [attack, setAttack] = React.useState<Attack>(DEFAULT_ATTACK);
  const [myTurn, setMyTurn] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!!user && !!game) {
      const playerKey = user.id === game.player1Id ? "player1" : "player2";
      setMyTurn(game.currentPlayer === playerKey);
    }
  }, [user, game]);

  React.useEffect(() => {
    if (game === null) {
      push("/");
    }
    if (!!game) {
      push("/game");
    }
  }, [game]);

  React.useEffect(() => {
    console.log("attack", attack);
    if (attack.attacker !== null && attack.defender !== null) {
      console.log("Bot should attack");
      setAttack(DEFAULT_ATTACK);
    }
  }, [attack]);

  const context: GameContextType = {
    attack,
    setAttack,
    myTurn,
  };

  return (
    <GameContext.Provider value={context}>{children}</GameContext.Provider>
  );
};
