/* eslint-disable max-len */
import React from "react";
import { Box, Button as MuiButton } from "@mui/material";
import EdgeRight from "./EdgeRight";
import EdgeLeft from "./EdgeLeft";
import Background from "./Background";

interface ButtonProps {
  children: React.ReactNode;
  color?: "light" | "dark" | "notice" | "secondary";
  disabled?: boolean;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  const { children, color = "light", disabled = false, onClick } = props;

  let bgcolor;
  let textColor;

  switch (color) {
    case "light":
      bgcolor = "#E8E3D2";
      textColor = "#171714";
      break;

    case "dark":
      bgcolor = "#7E633A";
      textColor = "#F4EEE5";
      break;

    case "secondary":
      bgcolor = "#DECB23";
      textColor = "#171601";
      break;

    case "notice":
      bgcolor = "#238FDE";
      textColor = "#010F1A";
      break;

    default:
      bgcolor = "#2F3440";
      textColor = "#DCE3F1";
      break;
  }
  return (
    <MuiButton
      disabled={disabled}
      onClick={onClick}
      sx={{
        border: "none",
        height: 40,
        display: "flex",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.33 : 1,
        p: 0,
        "&:hover": {
          bgcolor: "transparent",
        },
      }}
    >
      <EdgeLeft color={bgcolor} />
      <Box
        sx={{
          height: "inherit",
          position: "relative",
          px: 2,
          minWidth: 100,
          display: "flex",
          alignItems: "center",
          textTransform: "none",
          fontWeight: 800,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 1,
          }}
        >
          <Background color={bgcolor} />
        </Box>
        <Box
          sx={{
            zIndex: 2,
            color: textColor,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </Box>
      <EdgeRight color={bgcolor} />
    </MuiButton>
  );
};

export default Button;
