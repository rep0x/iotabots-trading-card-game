import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

import { CardsContext } from "@/context/CardsContext";
import { countDeck } from "@/utils/countDeck";

import DeckItem from "./DeckItem";
import { toast } from "react-hot-toast";
import StyledBox from "@/components/StyledBox";

const Form = () => {
  const { formData, setFormData, changeCollectionCardCount, collection } =
    React.useContext(CardsContext);

  const { cards } = formData;

  const deckCount = countDeck(formData.cards);

  const changeCount = (id: string, amount: number): void => {
    const index = cards.findIndex((item) => item.id === id);
    const currentCount = cards[index].count;
    const collectionBalance = collection[Number(id) - 1].count;

    if (amount === -1 && currentCount === 1) {
      setFormData({
        name: formData.name,
        cards: cards.filter((item) => item.id !== id),
      });
      changeCollectionCardCount(Number(id), amount * -1);
      return;
    }

    if (amount > 0 && deckCount >= 33) {
      toast.error("Max 33 cards in a deck");
      return;
    }

    if (amount > 0 && collectionBalance === 0) {
      toast.error("Not enough of this card");
      return;
    }

    formData.cards[index].count += amount;
    setFormData({
      name: formData.name,
      cards: [...formData.cards],
    });
    changeCollectionCardCount(Number(id), -amount);
  };

  return (
    <>
      <Box sx={styles.header}>
        <Box display="flex" flexDirection="column" flex={1}>
          <input
            autoFocus
            value={formData.name}
            placeholder="Deck name"
            onChange={(e) =>
              setFormData({
                name: e.target.value,
                cards: [...formData.cards],
              })
            }
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Box display="flex" gap={1} mb={1}>
            <Typography
              sx={styles.typo}
              fontWeight="bold"
            >{`${deckCount}`}</Typography>

            <Typography sx={styles.typo} color="text.secondary">
              /
            </Typography>
            <Typography sx={styles.typo} color="text.secondary">
              33
            </Typography>
          </Box>
          <Box
            sx={{
              height: 16,
              width: 70,
              pt: 1 / 2,
            }}
          >
            <LinearProgress
              color="info"
              variant="determinate"
              value={(deckCount / 33) * 100}
              sx={{ borderRadius: 1, height: 8 }}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={styles.grid}>
        {cards.map((card, index) => (
          <DeckItem
            key={`${card.id}-${index}`}
            id={card.id}
            mana={card.mana}
            name={card.name}
            count={card.count}
            changeCount={changeCount}
          />
        ))}
        {formData && cards.length === 0 && (
          <StyledBox textAlign="center">
            Choose 33 cards, max 3 of each kind
          </StyledBox>
        )}
      </Box>
    </>
  );
};

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    "& input": {
      flex: 1,
      width: "100%",
      bgcolor: "transparent",
      outline: "none",
      border: "none",
      boxShadow: "none",
      color: "text.primary",
      fontWeight: "bold",
      fontSize: 24,
    },
  },
  grid: {
    overflowY: "auto",
    flexGrow: 1,
    width: "calc(100% + 60px)",
    px: 2 * 1.5,
  },
  typo: {
    fontSize: 20,
    lineHeight: 1,
  },
};

export default Form;
