import React from "react";

import AvatarFrame from "../icons/AvatarFrame";
import Badge from "./Badge";
import { Box } from "@mui/material";

interface AvatarProps {
  avatar: string;
  level?: number | null;
}

const Avatar: React.FC<AvatarProps> = ({ avatar, level = 3 }) => (
  <Box sx={styles.root}>
    <Box
      sx={{
        backgroundImage: `url(${avatar})`,
        ...styles.avatar,
      }}
    />
    <Box sx={styles.wrapper}>
      <AvatarFrame />
    </Box>
    {level && (
      <Box sx={styles.level}>
        <Badge>4</Badge>
      </Box>
    )}
  </Box>
);

const styles = {
  root: {
    position: "relative",
    height: 136,
    width: 136,
  },
  avatar: {
    position: "absolute",
    top: 18,
    left: 18,
    height: 100,
    width: 100,
    backgroundSize: "cover",
    borderRadius: "50%",
  },
  wrapper: {
    position: "absolute",
    zIndex: 2,
  },
  level: {
    position: "absolute",
    zIndex: 3,
    left: "50%",
    transform: "translateX(-50%)",
    bottom: -8,
  },
};

export default Avatar;
