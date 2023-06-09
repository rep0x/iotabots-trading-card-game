import React from "react";
import { Prisma } from "@prisma/client";
import { Box, Typography } from "@mui/material";

import { CardsContext } from "@/context/CardsContext";
import { RouterOutputs, api } from "@/utils/api";
import { CARDS } from "@/mocks/cards";
import DividerSvg from "@/icons/DividerSvg";
import { CountCard } from "@/mocks/deck";
import Button from "@/components/Button";

import DeckBox from "./DeckBox";
import { useUser } from "@clerk/nextjs";
import StyledBox from "@/components/StyledBox";

type Deck = RouterOutputs["decks"]["getAll"][number];

const Decks: React.FC = () => {
  const { setFormData, setFormState, setSelectedDeck } =
    React.useContext(CardsContext);

  const { user } = useUser();
  const { data, refetch } = api.decks.getAll.useQuery();

  if (!data) return null;

  const openDeck = (deck: Deck) => {
    const cards = deck.cards as Prisma.JsonArray;

    const newCards = cards.map((card) => {
      const nextCard = card as {
        id: string;
        count: number;
      };
      if (!nextCard) return;
      const mockCard = CARDS[Number(nextCard.id) - 1];
      return {
        ...mockCard,
        count: nextCard.count,
      };
    });

    if (!newCards) return null;

    setFormData({
      name: deck.name,
      cards: newCards as CountCard[],
    });
    setFormState("edit");
    setSelectedDeck(deck.id);
  };

  return (
    <>
      <Box sx={styles.header}>
        <Typography variant="h5" mb={2}>
          My Decks
        </Typography>
        <DividerSvg />
      </Box>
      {!user ? (
        <StyledBox textAlign="center">
          You must log in to create decks.
        </StyledBox>
      ) : (
        <>
          {data && data.length > 0 && (
            <Box sx={styles.grid}>
              {data.map((deck) => (
                <DeckBox
                  key={deck.id}
                  {...deck}
                  onClick={() => openDeck(deck)}
                />
              ))}
            </Box>
          )}
          {data.length === 0 && (
            <StyledBox textAlign="center">
              You dont have any decks yet.
            </StyledBox>
          )}

          {!!user && (
            <Button color="secondary" onClick={() => setFormState("create")}>
              Create Deck
            </Button>
          )}
        </>
      )}
    </>
  );
};

const styles = {
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  grid: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: 3,
  },
};

export default Decks;
