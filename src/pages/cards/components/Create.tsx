import React from "react";
import { Box } from "@mui/material";
import Button from "../../../components/Button";

import { CardsContext } from "@/context/CardsContext";
import { api } from "@/utils/api";
import toast from "react-hot-toast";
import Form from "@/pages/cards/components/Form";

const Create: React.FC = () => {
  const { formData, setFormState, setFormData, resetCollection } =
    React.useContext(CardsContext);
  const { cards } = formData;

  const ctx = api.useContext();

  const { mutate } = api.decks.create.useMutation({
    onSuccess: () => {
      toast.success("Created new deck ");
      ctx.decks.getAll.invalidate();
      setFormData({
        name: "",
        cards: [],
      });
      resetCollection();
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

  const onBack = () => {
    resetCollection();
    setFormState("index");
  };

  return (
    <>
      <Form />
      <Box sx={styles.buttons}>
        <Button onClick={onBack}>Cancel</Button>
        <Button color="secondary" onClick={onSave}>
          Create Deck
        </Button>
      </Box>
    </>
  );
};

const styles = {
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
};

export default Create;
