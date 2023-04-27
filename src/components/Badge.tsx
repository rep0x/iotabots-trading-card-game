import React from "react";
import { Box, Typography } from "@mui/material";

import BadgeIcon from "../icons/Badge";

interface Props {
  children: React.ReactNode;
}

const Badge: React.FC<Props> = ({ children }) => (
  <Box sx={styles.root}>
    <Typography sx={styles.label}>{children}</Typography>
    <BadgeIcon />
  </Box>
);

const styles = {
  root: {
    position: "relative",
  },
  label: {
    position: "absolute",
    zIndex: 4,
    left: "50%",
    transform: "translateX(-50%)",
    bottom: 12,
    fontWeight: 900,
  },
};

export default Badge;
