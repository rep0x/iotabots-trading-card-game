import React from "react";

import Head from "next/head";
import { Typography, Container, Box, Grid } from "@mui/material";
import Base from "@/layouts/Base";
import { RouterOutputs, api } from "@/utils/api";
import Button from "@/components/Button";
import DividerSvg from "@/icons/DividerSvg";
import { TRANSITIONS } from "@/theme";
import StyledBox from "@/components/StyledBox";

type Deck = RouterOutputs["decks"]["getAll"][number];

export default function Home() {
  const { data, refetch } = api.decks.getAll.useQuery();

  const [selectedDeck, setSelectedDeck] = React.useState<Deck | null>(null);

  return (
    <>
      <Head>
        <title>Play - Iotabots TCG</title>
        <meta name="description" content="Play - Iotabots Trading Card Game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Base>
        <Container>
          <Typography variant="h1" gutterBottom>
            Choose your Deck
          </Typography>

          {!!data && data.length > 0 && (
            <Box sx={styles.grid}>
              {data.map((deck) => {
                const isSelected = deck.id === selectedDeck?.id;
                return (
                  <Grid item xs={6}>
                    <Box
                      onClick={() => setSelectedDeck(deck)}
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
            <StyledBox>You need to connect with Metamask to play</StyledBox>
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

    "&:hover": {
      bgcolor: "rgba(0,0,0,0.9)",
    },
    "&.selected": {
      bgcolor: "rgba(0,0,0,0.95)",

      "& .cardContent": {
        transform: "scale(1.1)",
      },
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
