import React from "react";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { DeckType } from "../../types";
import { TRANSITIONS } from "@/theme";
import { Box, Typography, colors } from "@mui/material";

interface Props extends DeckType {
  onClick: () => void;
}

const DeckBox: React.FC<Props> = (props) => {
  const { name, id, onClick } = props;

  return (
    <Box
      onClick={onClick}
      sx={{
        position: "relative",
        bgcolor: "background.paper",
        p: 3,
        mt: 4,
        mb: 2,
        width: "100%",
        height: 80,
        borderRadius: "8px",
        border: "2px solid",
        borderColor: "text.primary",
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: TRANSITIONS[300],
        "&:hover": {
          "& .name": {
            left: 20,
            transform: "translate(0%,-50%)",
          },
          "& .edit": {
            opacity: 1,
          },
        },
      }}
    >
      <Box
        className="name"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          transition: TRANSITIONS[300],
        }}
      >
        <Typography fontSize={18} fontWeight="bold" color="text.primary">
          {name}
        </Typography>
      </Box>
      <Box
        className="edit"
        sx={{
          position: "absolute",
          top: "50%",
          right: 16,
          transform: "translate(0, -40%)",
          color: "text.primary",
          transition: TRANSITIONS[300],
          opacity: 0,
        }}
      >
        <ArrowForwardRoundedIcon />
      </Box>
    </Box>
  );
};

export default DeckBox;
