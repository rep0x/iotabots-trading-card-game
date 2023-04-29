import React from "react";
import { Box } from "@mui/material";
import Button from "../../../components/Button";

import { CardsContext } from "@/context/CardsContext";
import { api } from "@/utils/api";
import toast from "react-hot-toast";
import Form from "@/pages/cards/components/Form";

const DEFAULT_FORMDATA = {
  name: "",
  cards: [],
};

const Edit: React.FC = () => {
  const { formData, setFormState, setFormData, selectedDeck, resetCollection } =
    React.useContext(CardsContext);
  const { cards } = formData;

  const ctx = api.useContext();

  const { mutate } = api.decks.update.useMutation({
    onSuccess: () => {
      toast.success("Deck successfully updated ");
      ctx.decks.getAll.invalidate();
      setFormData(DEFAULT_FORMDATA);
      resetCollection();
      setFormState("index");
    },
    onError: () => {
      toast.error("Gabutt");
    },
  });

  const onSave = () => {
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

  const onBack = () => {
    setFormData({
      name: "",
      cards: [],
    });
    resetCollection();
    setFormState("index");
  };

  return (
    <>
      <Form />
      <Box sx={styles.buttons}>
        <Button onClick={onBack}>Back</Button>
        <Button color="secondary" onClick={onSave}>
          Edit Deck
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

export default Edit;
