import React from "react";
import Head from "next/head";
import { Typography, Container, Box } from "@mui/material";
import toast from "react-hot-toast";
import Base from "@/layouts/Base";
import { CARDS, Card } from "@/mocks/cards";
import Decks from "@/components/Deck/Decks";
import EditDeck from "@/components/Deck/EditDeck";
import { CardsContext } from "@/context/CardsContext";

export default function Cards() {
  const { setFormData, formData, formActive } = React.useContext(CardsContext);

  const addCardToDeck = (card: Card) => {
    const insertAt = formData.findIndex((item) => item.id === card.id);

    if (insertAt === -1) {
      setFormData([...formData, { ...card, count: 1 }]);
    } else {
      const currentCount = formData[insertAt].count;
      if (currentCount === 3) {
        toast.error("Maximum 3 of each card");
        return;
      }
      formData[insertAt].count += 1;
      setFormData([...formData]);
    }
  };

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
              {CARDS.map((card) => (
                <Box
                  key={card.id}
                  sx={styles.card}
                  onClick={() => addCardToDeck(card)}
                >
                  <img src={card.image} alt={`${card.id} trading card`} />
                  {card.id}
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
    "& img": {
      maxWidth: 200,
    },
  },
};
