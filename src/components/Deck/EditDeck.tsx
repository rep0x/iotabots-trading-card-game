import React from "react";
import { Box, Typography } from "@mui/material";
import Button from "../Button";
import DeckItem from "./DeckItem";
import { countDeck } from "../../utils/countDeck";
import { CountCard } from "@/mocks/deck";
import { CardsContext } from "@/context/CardsContext";

const EditDeck: React.FC = () => {
  const { formData, setFormData, setFormActive } =
    React.useContext(CardsContext);

  const deckName = "Starter Deck";
  const count = countDeck(formData);

  const changeCount = (id: string, number: number): void => {
    const index = formData.findIndex((item) => item.id === id);
    const currentCount = formData[index].count;

    if (number === -1 && currentCount === 1) {
      setFormData(formData.filter((item) => item.id !== id));
      return;
    }

    formData[index].count += number;
    setFormData([...formData]);
  };

  const onSave = (): void => {
    setFormActive(false);
    if (count === 33) {
      // On Save Create or Edit call goes here
    }
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Box display="flex" flexDirection="column" flexGrow={1}>
          <Typography variant="h5" color="text.primary">
            {deckName}
          </Typography>
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
        {formData.map((card, index) => (
          <DeckItem
            key={`${card.id}-${index}`}
            id={card.id}
            mana={card.mana}
            name={card.name}
            count={card.count}
            changeCount={changeCount}
          />
        ))}
        {formData && formData.length === 0 && (
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
  },
  grid: {
    overflowY: "auto",
    flexGrow: 1,
    px: 2,
    pb: 2,
  },
};

export default EditDeck;
