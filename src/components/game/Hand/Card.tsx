import React from "react";
import { Box } from "@mui/material";
import { CARDS } from "@/mocks/cards";
import { api } from "@/utils/api";
import { toast } from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { Player } from "@/types";

const BACK =
  "https://cdn.discordapp.com/attachments/420674357652750367/946485073081946132/Back_copy.png";

interface Props {
  index: number;
  id: string;
  me: boolean;
}

const Card = (props: Props) => {
  const { index, id, me } = props;
  const card = CARDS[Number(id)];

  const { user } = useUser();
  const { data: game, refetch } = api.games.getGame.useQuery();

  if (!game || !user) return null;

  const { mutate: playCard } = api.games.playCard.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Card played");
    },
    onError: () => {
      toast.error("Card cannot be played");
    },
  });

  const myPlayerKey = game.player1Id === user.id ? "player1" : "player2";
  const currentPlayerKey = game.currentPlayer;
  const currentPlayer = game[currentPlayerKey] as unknown as Player;
  const myTurn = currentPlayerKey === myPlayerKey;
  const canPlay = me && myTurn && (game.step === 1 || game.step === 3);

  const cardId = currentPlayer.hand[index];

  const onPlayCard = () => {
    if (currentPlayer.mana >= CARDS[Number(cardId)].mana) {
      playCard({
        gameId: game.id,
        cardIndex: index,
      });
    } else {
      toast.error("Not enough mana");
    }
  };

  return (
    <Box
      onClick={canPlay ? onPlayCard : () => {}}
      sx={{
        ...styles.card,
        cursor: canPlay ? "pointer" : "default",
        backgroundImage: `url(${me ? card.image : BACK})`,
      }}
    />
  );
};

const styles = {
  root: {
    position: "relative",
    p: 2,
    textAlign: "center",
    borderRadius: 2,
    height: 140,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "&.me": {
      mb: "-40px",
    },

    "&.opponent": {
      mt: "-40px",
      transform: "rotate(180deg)",
    },
  },

  grid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    position: "absolute",
  },
  card: {
    height: 120,
    width: 86,
    bgcolor: "rgba(0,0,0,0.5)",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  },
};

export default Card;
