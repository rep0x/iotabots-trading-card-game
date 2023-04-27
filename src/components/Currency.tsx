import React from "react";
import { Box, Typography } from "@mui/material";

import defaultCoin from "../icons/coin.png";
import premiumCoin from "../icons/coin-rare.png";

interface CurrencyProps {
  type: "default" | "premium";
  value: string;
}

const Currency: React.FC<CurrencyProps> = ({ type, value }) => (
  <Box sx={styles.root}>
    <Box
      sx={{
        backgroundImage: `url(${
          type === "default" ? defaultCoin.src : premiumCoin.src
        })`,
        ...styles.image,
      }}
    />
    <Typography fontWeight="bold">{value}</Typography>
  </Box>
);

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
    marginLeft: "40px",
  },
  image: {
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    height: 32,
    width: 32,
    mr: 1,
  },
};

export default Currency;
