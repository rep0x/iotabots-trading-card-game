import React from "react";
import { Box } from "@mui/material";
import Button from "../../../components/Button";

import { CardsContext } from "@/context/CardsContext";
import { api } from "@/utils/api";
import toast from "react-hot-toast";
import Form from "@/pages/cards/components/Form";

const Create: React.FC = () => {
  const { formData, setFormState, setFormData } =
    React.useContext(CardsContext);
  const { cards } = formData;

  const ctx = api.useContext();

  const { mutate } = api.decks.create.useMutation({
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
          Create Deck
        </Button>
      </Box>
    </>
  );
};

export default Create;
