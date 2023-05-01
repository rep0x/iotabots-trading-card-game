import React from "react";
import { Box, Tooltip } from "@mui/material";
import Deploy from "@/icons/Deploy";
import Fight from "@/icons/Fight";
import PlayButton from "../../PlayButton";
import Round from "./Round";
import StepsBG from "./icons/StepsBG";
import { api } from "@/utils/api";
import { toast } from "react-hot-toast";
import DrawCard from "./icons/DrawCard";

const STEPS = [
  { id: 0, label: "Draw Card", icon: <DrawCard /> },
  { id: 1, label: "Play Cards", icon: <Deploy /> },
  { id: 2, label: "Attack with Bots", icon: <Fight /> },
  { id: 3, label: "Play Cards", icon: <Deploy /> },
];

const GameState = () => {
  const { data: game, refetch } = api.games.getGame.useQuery();

  if (!game) return null;

  const { mutate: drawCard } = api.games.draw.useMutation({
    onSuccess: () => {
      toast.success("Drawn a card");
      refetch();
    },
    onError: () => {
      toast.error("Drawing a card errored");
    },
  });

  const onDraw = () => {
    drawCard({ gameId: game.id });
  };

  const currentStep = game.step;

  const ACTIONS: Record<
    number,
    {
      label: string;
      action: () => void;
    }
  > = {
    0: {
      label: "Draw",
      action: onDraw, // Draw
    },
    1: {
      label: "End Play",
      action: () => {}, // Continue
    },
    2: {
      label: "End Attack",
      action: () => {}, // Continue
    },
    3: {
      label: "End Round",
      action: () => {}, // Continue
    },
  };

  const currentAction = ACTIONS[Number(currentStep)];

  return (
    <Box sx={styles.root}>
      <Box sx={styles.infos}>
        <Round />
        <Box sx={styles.steps}>
          <Box sx={styles.stepsBG}>
            <StepsBG />
          </Box>
          <Box sx={styles.stepsGrid}>
            {STEPS.map((step) => (
              <Tooltip key={step.id} title={step.label}>
                <Box
                  sx={styles.step}
                  className={step.id === currentStep ? "active" : ""}
                >
                  {step.icon}
                </Box>
              </Tooltip>
            ))}
          </Box>
        </Box>
      </Box>
      <Box sx={styles.progress}></Box>
      <Box sx={styles.button}>
        <PlayButton
          disabled={false}
          label={currentAction.label}
          onClick={currentAction.action}
        />
      </Box>
    </Box>
  );
};

export default GameState;

const styles = {
  root: {
    textAlign: "center",
    borderRadius: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxHeight: 40,
  },
  infos: {
    display: "flex",
    alignItems: "center",
  },
  steps: {
    position: "relative",
    height: 64,
    width: 270,
    marginLeft: "-44px",
  },
  stepsGrid: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    pl: 5,
    py: "12px",
  },
  stepsBG: { position: "absolute" },
  step: {
    bgcolor: "transparent",
    height: 40,
    width: 40,
    borderRadius: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&.active": {
      bgcolor: "text.primary",
      color: "background.paper",
    },
  },
  progress: {},
  button: {
    position: "relative",
    height: 180,
    width: 180,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "& .play-button": {
      transform: "scale(0.65)",

      "& svg": {
        transform: "rotate(90deg)",
      },
    },
  },
};
