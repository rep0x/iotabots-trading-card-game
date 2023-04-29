import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import DeckItem from "./DeckItem";
import { CardsContext } from "@/context/CardsContext";
import { countDeck } from "@/utils/countDeck";
import Progress from "@/icons/Progress";

const Form = () => {
  const { formData, setFormData, setFormActive } =
    React.useContext(CardsContext);
  const { cards } = formData;
  const count = countDeck(formData.cards);

  const changeCount = (id: string, number: number): void => {
    const index = cards.findIndex((item) => item.id === id);
    const currentCount = cards[index].count;

    if (number === -1 && currentCount === 1) {
      setFormData({
        name: formData.name,
        cards: cards.filter((item) => item.id !== id),
      });
      return;
    }

    formData.cards[index].count += number;
    setFormData({
      name: formData.name,
      cards: [...formData.cards],
    });
  };

  return (
    <div>
      <Box sx={styles.header}>
        <Box display="flex" flexDirection="column" flex={1}>
          <input
            value={formData.name}
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
          <Box display="flex" gap={1}>
            <Typography fontWeight="bold">{`${count}`}</Typography>

            <Typography color="text.secondary">/</Typography>
            <Typography color="text.secondary">33</Typography>
          </Box>
          <Box
            sx={{
              height: 16,
              width: 60,
              pt: 1 / 2,
            }}
          >
            <LinearProgress
              color="info"
              variant="determinate"
              value={(count / 33) * 100}
              sx={{ borderRadius: 1 }}
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
          <Typography color="text.secondary" align="center">
            Select some cards
          </Typography>
        )}
      </Box>
    </div>
  );
};

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 0,
    p: 4,
    pb: 3,

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
    px: 2,
    pb: 2,
  },
};

export default Form;
