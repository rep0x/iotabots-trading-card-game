import React from "react";
import { Typography, Box } from "@mui/material";
import { useUser } from "@clerk/nextjs";

import { shortenAddress } from "@/utils/shortenAddress";
import { Player } from "@/types";

import Avatar from "../../Avatar";
import Energy from "./Energy";
import { api } from "@/utils/api";
import Background from "./Background";
import { TRANSITIONS } from "@/theme";
import { GameContext } from "@/context/GameContext";
import AttackIcon from "../botzone/AttackIcon";

interface Props {
  me: boolean;
  player: "player1Id" | "player2Id";
}

const Player = (props: Props) => {
  const { player, me } = props;
  const { data: game } = api.games.getGame.useQuery();
  const { user } = useUser();
  const { attack, setAttack } = React.useContext(GameContext);

  if (!game || !user) return null;

  const myPlayer = user.id === game.player1Id ? "player1" : "player2";
  const myOpponent = myPlayer === "player1" ? "player2" : "player1";

  const currentPlayer = (me
    ? game[myPlayer]
    : game[myOpponent]) as unknown as Player;

  const opponent = game[myOpponent] as unknown as Player;

  const currentPlayerId = game[player];

  const isAttackable =
    !me && // Only if Player Board = opponent
    game.step === 2 && // Selected attacker in Context
    attack.attacker !== null && // Selected attacker in Context
    opponent.zone.length === 0; // No bots on opponents zone

  // TODO: Get these mocks from server
  const AVATAR =
    "https://assets.iotabots.io/compressed/1.png?auto=format&fit=max&w=828";

  const onAttack = () => {
    if (isAttackable) {
      setAttack({
        ...attack,
        defender: null,
        player: true,
      });
    }
  };

  return (
    <Box
      sx={styles.root}
      className={isAttackable ? "attackable" : ""}
      onClick={isAttackable ? onAttack : () => {}}
    >
      <Box
        className={"background"}
        sx={{
          position: "absolute",
          top: -6,
          left: 0,
          opacity: 0.5,
          transition: TRANSITIONS[180],
        }}
      >
        <Background />
      </Box>
      {isAttackable && (
        <Box sx={styles.attackContainer}>
          <AttackIcon id={`player1`} active={false} />
        </Box>
      )}
      <Box sx={styles.inner}>
        <Box sx={styles.avatar}>
          <Avatar avatar={AVATAR} />
        </Box>
        <Box ml={2}>
          <Typography variant="h6" fontWeight="bold">
            {shortenAddress(currentPlayerId)}
          </Typography>
          <Box sx={styles.energy}>
            <Energy
              id={me ? "player" : "opponent"}
              type="health"
              value={currentPlayer.health}
            />
            <Energy
              id={me ? "player" : "opponent"}
              type="mana"
              value={currentPlayer.mana}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  root: {
    position: "relative",
    width: 340,
    p: 2,

    "&.attackable": {
      "& .background": {
        opacity: 1,
      },
    },

    "& .player-bg": {
      transition: TRANSITIONS[180],
    },

    "&:hover": {
      "& .attack-icon svg": {
        color: "#229BEC !important",
        "& .sword": {
          fill: "white",
        },
      },

      "& .background": {
        opacity: 1,
      },

      "&.attackable": {
        "& .player-bg": {
          borderRadius: 3,
          boxShadow: "0px 0px 8px 4px #238FDEBF",
        },
      },
    },
  },

  inner: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },

  attackContainer: {
    position: "absolute",
    zIndex: 1,
    right: -25,
    top: "50%",
    transform: "translateY(-50%)",
  },

  avatar: {
    height: 88,
    width: 88,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "& .avatar": {
      transform: "scale(1.6)",
    },
  },

  energy: {
    display: "flex",
    flexDirection: "column",
    transform: "scale(0.8) translateX(-10px)",
    transformOrigin: "left",
  },
};

export default Player;
