import React from "react";

import Head from "next/head";
import { Typography, Container, Box, Grid } from "@mui/material";
import Base from "@/layouts/Base";
import { RouterOutputs, api } from "@/utils/api";
import PlayButton from "@/components/PlayButton";
import DividerSvg from "@/icons/DividerSvg";
import { TRANSITIONS } from "@/theme";
import StyledBox from "@/components/StyledBox";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";
import { clearInterval } from "timers";
import { useRouter } from "next/router";

type Deck = RouterOutputs["decks"]["getAll"][number];

export default function Home() {
  const { data } = api.decks.getAll.useQuery();
  const { user } = useUser();

  const [selectedDeck, setSelectedDeck] = React.useState<Deck | null>(null);
  const [inQueue, setInQueue] = React.useState(false);
  const [timeInQueue, setTimeInQueue] = React.useState(0);

  const { push } = useRouter();

  const { mutate, data: gameStatus } = api.games.joinGame.useMutation({
    onSuccess: () => {},
    onError: () => {
      toast.error("Error joining game, try againe");
    },
  });

  React.useEffect(() => {
    if (gameStatus === "joined") {
      toast.success("Joined a game, should start now");
      setInQueue(false);
      push("/game");
    }
    if (gameStatus === "created") {
      toast.success("Waiting for opponent");
    }
  }, [gameStatus]);

  React.useEffect(() => {
    let interval: NodeJS.Timer;

    if (inQueue) {
      setInterval(() => {
        setTimeInQueue((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [inQueue]);

  const onPlay = () => {
    mutate();
    setInQueue(true);
  };

  const onCancel = () => {
    setInQueue(false);
  };

  const formatQueueTimer = () => {
    let seconds = Math.floor(timeInQueue % 60);
    const minutes = Math.floor(timeInQueue / 60);

    if (seconds <= 9) {
      return `${minutes}:0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  };

  return (
    <>
      <Head>
        <title>Play - Iotabots TCG</title>
        <meta name="description" content="Play - Iotabots Trading Card Game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Base>
        <Box sx={styles.play}>
          <PlayButton
            disabled={selectedDeck === null}
            onClick={inQueue ? onCancel : onPlay}
            label={!inQueue ? "Play" : undefined}
            inQueue={inQueue ? formatQueueTimer() : undefined}
          />
        </Box>
        <Container>
          <Typography variant="h1" mb={4}>
            Choose your Deck
          </Typography>

          {!user && (
            <StyledBox>You need to connect with Metamask to play</StyledBox>
          )}
          {!!data && data.length > 0 && (
            <Box sx={styles.grid}>
              {data.map((deck) => {
                const isSelected = deck.id === selectedDeck?.id;
                return (
                  <Grid key={deck.id} item xs={6}>
                    <Box
                      onClick={() => setSelectedDeck(isSelected ? null : deck)}
                      sx={styles.card}
                      className={!!isSelected ? "selected" : ""}
                    >
                      <Box sx={styles.cardContent} className="cardContent">
                        <DividerSvg />
                        <Typography
                          variant="h4"
                          my={4}
                          sx={{ color: "secondary.light" }}
                        >
                          {deck.name}
                        </Typography>
                        <DividerSvg />
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
            </Box>
          )}

          {!!data && data.length === 0 && (
            <StyledBox>You got to create a deck before you can play.</StyledBox>
          )}
        </Container>
      </Base>
    </>
  );
}

const styles = {
  grid: {
    display: "flex",
    gap: 4,
  },

  play: {
    position: "fixed",
    zIndex: 100,
    bottom: 50,
    right: 50,
  },

  card: {
    bgcolor: "rgba(0,0,0,.8)",
    px: 4,
    py: 4,
    minHeight: "480px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid",
    borderColor: "secondary.main",
    borderRadius: "8px",
    cursor: "pointer",
    transition: TRANSITIONS[120],

    "&:hover": {
      bgcolor: "rgba(0,0,0,0.9)",
    },
    "&.selected": {
      bgcolor: "rgba(0,0,0,0.95)",
      transform: "scale(1.05)",
    },
  },

  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    transition: TRANSITIONS[120],

    "& svg": {
      minWidth: "80%",
      height: "auto",
    },
  },
};
