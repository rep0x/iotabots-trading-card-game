import React from "react";
import { Box } from "@mui/material";
import Button from "../../../components/Button";

import { CardsContext } from "@/context/CardsContext";
import { api } from "@/utils/api";
import toast from "react-hot-toast";
import Form from "@/pages/cards/components/Form";

const EditDeck: React.FC = () => {
  const { formData, setFormActive } = React.useContext(CardsContext);
  const { cards } = formData;

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

  return (
    <Box sx={styles.root}>
      <Form />
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
