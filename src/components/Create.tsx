import React from "react";
import { SignedIn, useUser } from "@clerk/nextjs";
import { Box, Button } from "@mui/material";
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
          placeholder="Post some emojis"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={isPosting}
        />
        <Button onClick={() => mutate({ content: value })} variant="contained">
          Sumbit
        </Button>
      </Box>
    </SignedIn>
  );
};

const styles = {
  create: {
    display: "flex",
    alignItems: "center",
    gap: 2,

    "& img": {
      borderRadius: "50%",
      height: 40,
      width: 40,
    },

    "& input": {
      flex: 1,
      bgcolor: "rgba(0,0,0,.8)",
      outline: "none",
      boxShadow: "none",
      border: "none",
      borderRadius: 2,
      height: 40,
      p: 1,
      color: "common.white",
    },
  },
};

export default Create;
