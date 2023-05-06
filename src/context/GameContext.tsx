import React, { Dispatch, SetStateAction } from "react";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";

interface Attack {
  attacker: number | null;
  defender: number | null;
  player: boolean;
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
  player: false,
};

export const GameProvider: React.FC<Props> = ({ children }) => {
  const { user } = useUser();
  const { data: game, refetch } = api.games.getGame.useQuery();
  const { push } = useRouter();
  const [attack, setAttack] = React.useState<Attack>(DEFAULT_ATTACK);
  const { mutate: attackMutation } = api.games.attack.useMutation({
    onSuccess: () => {
      toast.success("Schön enner angreife");
      refetch();
      setAttack(DEFAULT_ATTACK);
    },
    onError: () => {
      toast.success("Das müsse ma nommo übe");
    },
  });

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
    if (game && attack.attacker !== null) {
      if (attack.defender !== null) {
        attackMutation({
          gameId: game.id,
          attacker: attack.attacker,
          defender: attack.defender,
          player: attack.player,
        });
      }
      if (attack.defender === null && attack.player) {
        attackMutation({
          gameId: game.id,
          attacker: attack.attacker,
          defender: null,
          player: attack.player,
        });
      }
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
