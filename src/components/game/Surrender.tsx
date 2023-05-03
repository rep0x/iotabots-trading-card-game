import React from "react";
import Button from "../Button";
import { api } from "@/utils/api";
import { toast } from "react-hot-toast";

const Surrender = () => {
  const { data: game, refetch } = api.games.getGame.useQuery();

  if (!game) return null;

  const { mutate: surrender } = api.games.surrender.useMutation({
    onSuccess: () => {
      toast.success("You surrendered the game");
      refetch();
    },
    onError: () => {
      toast.error("Surrender failed, try again");
    },
  });

  const onClick = () => {
    surrender({ gameId: game.id });
  };

  return <Button onClick={onClick}>Surrender</Button>;
};

export default Surrender;
