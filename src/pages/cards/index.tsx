import React from "react";
import Head from "next/head";
import { Typography, Container, Box } from "@mui/material";

import Base from "@/layouts/Base";
import { CardsContext } from "@/context/CardsContext";

import EditDeck from "./components/Create";
import Decks from "./components/Decks";

export default function Cards() {
  const { formActive, collection, addCardToDeck } =
    React.useContext(CardsContext);

  return (
    <>
      <Head>
        <title>Cards - Iotabots TCG</title>
        <meta name="description" content="Iotabots Trading Card Game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Base>
        <Container maxWidth="lg">
          <Typography variant="h1" gutterBottom>
            Cards
          </Typography>
          <Box sx={styles.grid}>
            <Box sx={styles.cardGrid}>
              {collection.map(({ card, count }) => (
                <Box
                  key={card.id}
                  className={`count-${count}`}
                  sx={styles.card}
                  onClick={() => addCardToDeck(card)}
                >
                  <img src={card.image} alt={`${card.id} trading card`} />
                  <Box sx={styles.cardCount}>
                    <Typography fontWeight="bold">{count}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box>
              {!formActive && <Decks />}
              {!!formActive && <EditDeck />}
            </Box>
          </Box>
        </Container>
      </Base>
    </>
  );
}

const styles = {
  grid: {
    display: "flex",
  },

  cardGrid: {
    display: "flex",
    gap: 4,
    flexWrap: "wrap",
  },

  card: {
    position: "relative",
    height: 280,

    "& img": {
      boxShadow: 4,
      borderRadius: 3,
      overflow: "hidden",
      maxWidth: 200,
    },

    "&.count-0": {
      "& img": {
        opacity: 0.2,
      },
    },
  },

  cardCount: {
    position: "absolute",
    bottom: 10,
    left: "50%",
    transform: "translate(-50%, 50%)",
    zIndex: 1,
    height: 32,
    width: 32,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bgcolor: "#fff",
    color: "background.paper",
    borderRadius: "50%",
    boxShadow: 3,
  },
};
