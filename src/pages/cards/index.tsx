import React from "react";
import Head from "next/head";
import { Typography, Container, Box } from "@mui/material";

import Base from "@/layouts/Base";
import { CardsContext } from "@/context/CardsContext";

import Create from "./components/Create";
import Decks from "./components/Decks";
import Edit from "./components/Edit";
import CollectionCard from "./components/CollectionCard";

export default function Cards() {
  const { formState, collection, addCardToDeck, selectedDeck } =
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
              {collection.map((item) => (
                <CollectionCard key={item.card.id} {...item} />
              ))}
            </Box>
            <Box sx={styles.sidebar}>
              {formState === "index" && <Decks />}
              {formState === "create" && <Create />}
              {formState === "edit" && selectedDeck && <Edit />}
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
    alignItems: "flex-start",
  },

  cardGrid: {
    display: "flex",
    gap: 4,
    flexWrap: "wrap",
  },

  sidebar: {
    position: "sticky",
    top: -40,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    minWidth: 410,
    height: "auto",
    maxHeight: "calc(100vh - 285px)",
    p: 4,
    bgcolor: "rgba(0,0,0,.66)",
    border: "2px solid",
    borderColor: "secondary.main",
    borderRadius: "8px",
    gap: 4,
  },
};
