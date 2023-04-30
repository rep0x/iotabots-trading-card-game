import React from "react";
import { Box } from "@mui/material";

interface Props {
  me: boolean;
}

const Hand = (props: Props) => {
  const { me } = props;
  return (
    <Box sx={styles.root} className={me ? "me" : "opponent"}>
      Hand
    </Box>
  );
};

export default Hand;

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "rgba(0,0,0,0.5)",
    p: 2,
    textAlign: "center",
    borderRadius: 2,
    width: "100%",
    height: 140,

    "&.me": {
      mb: "-40px",
    },

    "&.opponent": {
      mt: "-40px",
      transform: "rotate(180deg)",
    },
  },
};
