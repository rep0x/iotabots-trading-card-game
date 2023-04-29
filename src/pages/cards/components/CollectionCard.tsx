import React from "react";
import { Box, Typography } from "@mui/material";

import { CollectionItem } from "@/mocks/collection";
import { CardsContext } from "@/context/CardsContext";
import Badge from "@/icons/Badge";

import LockIcon from "@mui/icons-material/Lock";

const CollectionCard = (props: CollectionItem) => {
  const { count, card } = props;

  const { addCardToDeck, formState } = React.useContext(CardsContext);

  const onClick = () => {
    if (formState === "index") return;
    if (count > 0) addCardToDeck(card);
  };

  return (
    <Box
      key={card.id}
      className={`count-${count}`}
      sx={{
        ...styles.card,
        cursor: formState !== "index" ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      <img src={card.image} alt={`${card.id} trading card`} />
      <Box sx={styles.counter}>
        <Box sx={styles.counterWrapper}>
          <Box sx={styles.label}>
            {count === 0 ? (
              <LockIcon />
            ) : (
              <Typography fontWeight="bold" fontSize={14}>
                {count}
              </Typography>
            )}
          </Box>
          <Badge />
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  card: {
    position: "relative",
    height: 280,

    "& img": {
      boxShadow: 4,
      borderRadius: 3,
      overflow: "hidden",
      maxWidth: 200,
    },

    "&.count-0": {
      cursor: "not-allowed",
      "& img": {
        opacity: 0.2,
      },
    },
  },

  counter: {
    position: "absolute",
    bottom: 6,
    left: "50%",
    transform: "translate(-50%, 50%) scale(1.25)",
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  counterWrapper: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& svg": {
      maxHeight: 14,
    },
  },
};

export default CollectionCard;
