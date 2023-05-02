import React from "react";
import { Box } from "@mui/material";
import Empty from "./Empty";
import { TRANSITIONS } from "@/theme";

interface Props {
  image: string | null;
}

const Card = (props: Props) => {
  const { image } = props;
  return (
    <Box sx={styles.root}>
      <Empty />
      {image && (
        <Box
          sx={{
            ...styles.card,
            backgroundImage: `url(${image})`,
          }}
          className="image"
        />
      )}
    </Box>
  );
};

const styles = {
  root: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "& svg": { opacity: 0.66 },

    "&:hover": {
      "& .image": {
        transform: "scale(1.2)",
      },
    },
  },
  card: {
    position: "absolute",
    height: 230,
    width: 164,
    bgcolor: "rgba(0,0,0,0.5)",
    backgroundSize: "contain",
    borderRadius: 2,
    boxShadow: 2,
    transition: TRANSITIONS[120],
  },
};

export default Card;
