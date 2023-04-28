import React from "react";
import { SignedIn, useUser } from "@clerk/nextjs";
import { Box } from "@mui/material";
import { api } from "@/utils/api";

const Create = () => {
  const { user } = useUser();

  const [value, setValue] = React.useState("");

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setValue("");
      ctx.posts.getAll.invalidate();
    },
  });

  if (!user) return null;

  return (
    <SignedIn>
      <Box sx={styles.create}>
        <img src={user.profileImageUrl} alt="user-avatar" />
        <input
          placeholder="Your message"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={isPosting}
        />
        <button onClick={() => mutate({ content: value })}>Post</button>
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
