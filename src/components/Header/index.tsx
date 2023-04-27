import React from "react";
import { Box, Button } from "@mui/material";

import Currency from "../Currency";
import PlayerInfo from "../PlayerInfo";

interface Player {
  name: string;
  avatar: string;
}

const PLAYER: Player | undefined = {
  name: "Peter",
  avatar:
    "https://assets.iotabots.io/compressed/1.png?auto=format&fit=max&w=828",
};

const Header = () => {
  return (
    <Box sx={styles.root}>
      {PLAYER ? (
        <>
          <Box sx={styles.player}>
            <PlayerInfo name={PLAYER.name} avatar={PLAYER.avatar} />
          </Box>
          <Box sx={styles.currencies}>
            <Currency type="premium" value="242" />
            <Currency type="default" value="2.400" />
          </Box>
        </>
      ) : (
        <Box sx={styles.buttons}>
          <Button>Connect here</Button>
          {/* <Logo />
          <ConnectButton /> */}
        </Box>
      )}
    </Box>
  );
};

const styles = {
  root: {
    position: "fixed",
    zIndex: 10,
    top: 0,
    left: 0,
    height: 80,
    width: "100%",
    borderBottom: "2px solid",
    borderColor: "secondary.main",
    backgroundColor: "rgba(0,0,0,0.66)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    px: 6,
  },
  player: { transform: "translateY(40px)" },
  currencies: {
    display: "flex",
    alignItems: "center",
  },
  buttons: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

export default Header;
