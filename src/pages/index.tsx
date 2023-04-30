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
import { useRouter } from "next/router";
import { formatQueueTimer } from "@/utils/formatQueueTimer";

type Deck = RouterOutputs["decks"]["getAll"][number];
type Queue = RouterOutputs["queues"]["joinQueue"];

const CHECK_GAME_INTEVALL = 10000; // in ms

export default function Home() {
  const { data } = api.decks.getAll.useQuery();
  const { user } = useUser();

  const [selectedDeck, setSelectedDeck] = React.useState<Deck | null>(null);
  const [inQueue, setInQueue] = React.useState(false);
  const [timeInQueue, setTimeInQueue] = React.useState(0);
  const [queue, setQueue] = React.useState<Queue | null>(null);

  const { push } = useRouter();

  const { mutate: joinQueue } = api.queues.joinQueue.useMutation({
    onSuccess: (res) => {
      setQueue(res);
      if (res.opponent === null) {
        setInQueue(true);
        toast.success("Waiting for opponent");
      } else {
        startGame();
      }
    },
    onError: () => {
      toast.error("Error joining queue, try again");
    },
  });

  const { mutate: checkQueueStatus } = api.queues.checkQueueStatus.useMutation({
    onSuccess: (res) => {
      if (res.opponent === null) {
        toast.success("Still waiting for oponent");
      } else {
        startGame();
      }
    },
    onError: () => {
      toast.error("Error joining queue, try again");
    },
  });

  const { mutate: deleteQueue } = api.queues.deleteQueue.useMutation({
    onSuccess: () => {
      toast.success("Queue canceled");
    },
    onError: () => {
      toast.error("Queue could not be deleted");
    },
  });

  const startGame = () => {
    toast.success("Game found starting now");
    if (queue) deleteQueue({ id: queue.id });
    setInQueue(false);
    push("/game");
  };

  // Updating Queue Timer [1s]
  React.useEffect(() => {
    let interval: NodeJS.Timer;

    if (inQueue) {
      interval = setInterval(() => {
        setTimeInQueue((prev) => prev + 1);
      }, 1000);
    }

    return () => window.clearInterval(interval);
  }, [inQueue]);

  // Checking Game State [10s]
  React.useEffect(() => {
    let interval: NodeJS.Timer;

    if (inQueue && queue) {
      interval = setInterval(() => {
        checkQueueStatus({
          id: queue.id,
        });
      }, CHECK_GAME_INTEVALL);
    }

    return () => window.clearInterval(interval);
  }, [inQueue, queue]);

  const onPlay = () => {
    joinQueue();
    setInQueue(true);
  };

  const onCancel = () => {
    setInQueue(false);
    setTimeInQueue(0);
    if (queue) {
      deleteQueue({
        id: queue.id,
      });
    }
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
            inQueue={inQueue ? formatQueueTimer(timeInQueue) : undefined}
          />
        </Box>
        <Container>
          <Typography variant="h1" mb={4}>
            Choose your Deck
          </Typography>

          {/* No user yet */}
          {!user && (
            <StyledBox>You got to connect with Metamask to play</StyledBox>
          )}

          {/* User but no decks */}
          {user && !!data && data.length === 0 && (
            <StyledBox>You got to create a deck before you can play</StyledBox>
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
