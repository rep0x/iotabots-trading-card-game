import React from "react";
import { Box } from "@mui/material";

import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import { TRANSITIONS } from "@/theme";
import { api } from "@/utils/api";
import LoadingSpinner from "../LoadingSpinner";

const Refetch = () => {
  const { data: game, refetch, isRefetching } = api.games.getGame.useQuery();

  if (!game) return null;

  return (
    <Box>
      <Box sx={styles.button} onClick={() => refetch()}>
        {isRefetching ? <LoadingSpinner /> : <ReplayRoundedIcon />}
      </Box>
    </Box>
  );
};

const styles = {
  button: {
    position: "fixed",
    zIndex: 1001,
    bottom: 32,
    right: 32,
    height: 40,
    width: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bgcolor: "rgba(0,0,0,0.8)",
    borderRadius: 2,
    boxShadow: 1,
    cursor: "pointer",
  },
};

export default Refetch;
