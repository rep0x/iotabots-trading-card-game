import React from "react";
import { Box, BoxProps, Typography } from "@mui/material";

const StyledBox: React.FC<BoxProps> = (props) => {
  return (
    <Box {...props} sx={{ ...styles, ...props.sx }}>
      <Typography color="text.secondary">{props.children}</Typography>
    </Box>
  );
};
const styles = {
  bgcolor: "rgba(0,0,0,.8)",
  p: 2,
  width: "100%",
  border: "2px solid",
  borderColor: "rgba(255,255,255,0.1)",
  borderRadius: 2,
  boxShadow: 1,
};

export default StyledBox;
