import React from "react";
import { Box } from "@mui/material";
import Button from "../../../components/Button";

import { CardsContext } from "@/context/CardsContext";
import { api } from "@/utils/api";
import toast from "react-hot-toast";
import Form from "@/pages/cards/components/Form";

const Edit: React.FC = () => {
  const { formData, setFormState, setFormData, selectedDeck } =
    React.useContext(CardsContext);
  const { cards } = formData;

  const ctx = api.useContext();

  const { mutate } = api.decks.update.useMutation({
    onSuccess: () => {
      toast.success("Läuft ");
      ctx.decks.getAll.invalidate();
      setFormData({
        name: "",
        cards: [],
      });
      setFormState("index");
    },
    onError: () => {
      toast.error("Gabutt");
    },
  });

  const onSave = (): void => {
    mutate({
      id: selectedDeck || "",
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
    <>
      <Form />
      <Box display="flex" justifyContent="center">
        <Button onClick={() => setFormState("index")}>Cancel</Button>
        <Button color="secondary" onClick={onSave}>
          Save Deck
        </Button>
      </Box>
    </>
  );
};

export default Edit;
