import React from "react";
import { Box } from "@mui/material";
import { CARDS } from "@/mocks/cards";
import { api } from "@/utils/api";
import { toast } from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { Player } from "@/types";
import { TRANSITIONS } from "@/theme";

const BACK =
  "https://cdn.discordapp.com/attachments/420674357652750367/946485073081946132/Back_copy.png";

interface Props {
  index: number;
  id: string;
  me: boolean;
}
// {"deck":["17","5","22","13","21","2","4","4","8","11","15","15","2","9","13","21","7","6","13","6","17","7","21","4","9","2","19","10","5"],"hand":["8","19","11","22"],"junk":[],"mana":2,"zone":[],"health":20}

const Card = (props: Props) => {
  const { index, id, me } = props;
  const card = CARDS[Number(id) - 1];

  if (!card) return null;

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

  const onPlayCard = () => {
    if (currentPlayer.mana >= CARDS[Number(id) - 1].mana) {
      playCard({
        gameId: game.id,
        cardIndex: index,
      });
    } else {
      toast.error("Not enough mana");
    }
  };

  // Rotation Calculation
  const length = currentPlayer.hand.length;
  const angle = 5 + length * 0.1;
  const sideElements = Math.floor(length / 2);
  const increment = angle / sideElements;
  let cardAngle = 0;
  let translateX = 0;
  let translateY = 0;
  translateX = increment * (sideElements - index);
  if (index < sideElements) {
    cardAngle = -(increment * (sideElements - index));
    translateY = 20 * (sideElements - index);
  } else if (index > sideElements - 1) {
    cardAngle = increment * (sideElements - (length - index) + 1);
    translateY = 20 * (sideElements - (length - index) + 1);
  }
  return (
    <Box
      className="card"
      onClick={canPlay ? onPlayCard : () => {}}
      sx={{
        ...styles.card,
        backgroundImage: `url(${me ? card.image : BACK})`,
        cursor: canPlay ? "pointer" : "default",
        transition: TRANSITIONS[180],
        transform: `
          rotate(${cardAngle}deg) 
          translate(${translateX * 8}px, ${translateY}px)
        `,
        "&:hover": {
          zIndex: 100,
          transform: me
            ? "translateY(calc(-20% - 4px)) scale(1.5)"
            : `
          rotate(${cardAngle}deg) 
          translate(${translateX * 8}px, ${translateY}px)
        `,
        },
      }}
    />
  );
};

const styles = {
  card: {
    height: "200px",
    width: "160px",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundColor: "transparent",
    border: "none",
    transformOrigin: "bottom center",
  },
};

export default Card;
