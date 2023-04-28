import React from "react";
import { SignedIn, useUser } from "@clerk/nextjs";
import { Box } from "@mui/material";

const Create = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <SignedIn>
      <Box sx={styles.create}>
        <img src={user.profileImageUrl} alt="user-avatar" />
        <input placeholder="Your message" />
      </Box>
    </SignedIn>
  );
};

const styles = {
  create: {
    display: "flex",
    alignItems: "center",

    "& img": {
      borderRadius: "50%",
      height: 40,
      width: 40,
      mr: 2,
    },

    "& input": {
      bgcolor: "rgba(0,0,0,.8)",
      outline: "none",
      boxShadow: "none",
      border: "none",
      borderRadius: 1,
      height: 40,
      p: 1,
      color: "common.white",
    },
  },
};

export default Create;
