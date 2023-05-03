import React from "react";
import { Box, Typography } from "@mui/material";
import badge from "@/icons/badge.png";
import Progress from "@/icons/Progress";

interface Props {
  id: string; // Required for mask ids
  type: "health" | "mana";
  value: number;
}

const Energy = (props: Props) => {
  const { type, value, id } = props;

  const max = {
    health: 20,
    mana: 6,
  };
  const progress = value / max[type];

  return (
    <Box sx={styles.root}>
      <Box sx={styles.badge}>
        <Typography sx={styles.label}>{value}</Typography>
      </Box>
      <Box
        sx={{
          ...styles.progress,
          transform: "translateY(6px)",
        }}
      >
        <Progress id={`${id}-${type}`} progress={progress} color={type} />
      </Box>
    </Box>
  );
};

const styles = {
  root: {
    position: "relative",
    height: 32,
  },
  badge: {
    position: "relative",
    zIndex: 1,
    backgroundImage: `url(${badge.src})`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: 40,
    width: 70,
  },
  label: {
    textAlign: "center",
    fontWeight: 900,
  },
  progress: {
    position: "absolute",
    top: 2,
    left: 44,
    "& svg": {
      maxWidth: 200,
    },
  },
};

export default Energy;
