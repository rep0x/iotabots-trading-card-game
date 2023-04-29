import React from "react";
import { Box, Typography } from "@mui/material";
import Button from "../Button";
import DeckItem from "./DeckItem";
import { countDeck } from "../../utils/countDeck";
import { CardsContext } from "@/context/CardsContext";
import { api } from "@/utils/api";
import toast from "react-hot-toast";

const EditDeck: React.FC = () => {
  const { formData, setFormData, setFormActive } =
    React.useContext(CardsContext);
  const { cards } = formData;
  const count = countDeck(formData.cards);

  const ctx = api.useContext();

  const { mutate } = api.decks.create.useMutation({
    onSuccess: () => {
      toast.success("Läuft ");
      ctx.decks.getAll.invalidate();
    },
    onError: () => {
      toast.error("Gabutt");
    },
  });

  const changeCount = (id: string, number: number): void => {
    const index = cards.findIndex((item) => item.id === id);
    const currentCount = cards[index].count;

    if (number === -1 && currentCount === 1) {
      setFormData({
        name: "Test",
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

  const onSave = (): void => {
    setFormActive(false);
    console.log("Form Data on Save", formData);
    mutate({
      name: formData.name,
      cards: cards.map((item) => {
        return {
          id: item.id,
          count: item.count,
        };
      }),
    });
  };

  console.log("Formdat", formData);

  return (
    <Box sx={styles.root}>
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
        <Box display="flex">
          <Typography
            variant="body2"
            color="text.primary"
            fontWeight="bold"
            mr={2}
          >
            {`${count}`}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            / 33
          </Typography>
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
          <Typography align="center">Select some cards</Typography>
        )}
      </Box>
      <Box display="flex" justifyContent="center" p={4}>
        <Button onClick={() => setFormActive(false)}>Cancel</Button>
        <Button color="secondary" onClick={onSave}>
          Save Deck
        </Button>
      </Box>
    </Box>
  );
};

const styles = {
  root: {
    position: "sticky",
    bgcolor: "rgba(0,0,0,.66)",
    border: "2px solid",
    borderColor: "secondary.main",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    width: 400,
    maxHeight: "calc(100vh - 400px)",
  },
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

export default EditDeck;
