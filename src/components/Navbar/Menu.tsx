import React from "react";

import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { MENU } from "@/config/menu";
import { TRANSITIONS } from "@/theme";

const Menu: React.FC = () => {
  const { pathname, push } = useRouter();

  return (
    <Box sx={styles.root}>
      {MENU.map(({ label, icon, link }) => {
        const active = pathname === link;
        return (
          <Box
            key={label}
            onClick={() => push(link)}
            sx={{
              ...styles.item,
              backgroundColor: active ? "rgba(0,0,0,0.8)" : "transparent",
            }}
          >
            {icon}
            <Typography sx={styles.label}>{label}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

const styles = {
  root: {
    display: "flex",
    p: "20px",
  },

  item: {
    width: 180,
    height: 85,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    mr: 4,
    cursor: "pointer",
    transition: TRANSITIONS[300],

    "&:hover": {
      transform: "translateY(-2px)",
      backgroundColor: "rgba(0,0,0,0.8)",
    },

    "& svg": {
      height: 32,
      width: 32,
      color: "text.primary",
    },
  },

  label: {
    mt: 2,
    fontWeight: 800,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: "text.primary",
  },
};

export default Menu;
