import React from "react";
import { Box } from "@mui/material";

import AvatarFrame from "../icons/AvatarFrame";
import Badge from "./Badge";

interface AvatarProps {
  avatar: string;
  level?: number | null;
}

const Avatar: React.FC<AvatarProps> = ({ avatar, level }) => (
  <Box sx={styles.root} className="avatar">
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
    height: 60,
    width: 60,
  },
  avatar: {
    position: "absolute",
    top: 4,
    left: 4,
    height: 50,
    width: 50,
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
