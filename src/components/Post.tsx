import React from "react";
import { Box, Typography } from "@mui/material";

import { shortenAddress } from "@/utils/shortenAddress";
import { RouterOutputs } from "@/utils/api";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];
const Post = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <Box key={post.id} sx={styles.post}>
      <img src={author.profileImageUrl} alt="" />
      <Box display="flex" flexDirection="column">
        <Typography color="text.secondary" fontSize={14}>
          {shortenAddress(author.id)} · {dayjs(post.createdAt).fromNow()}
        </Typography>
        <Typography>{post.content}</Typography>
      </Box>
    </Box>
  );
};

const styles = {
  post: {
    bgcolor: "rgba(0,0,0,0.8)",
    p: 2,
    borderRadius: 1,
    mt: 2,
    display: "flex",
    alignItems: "center",
    gap: 1,

    "& img": {
      borderRadius: "50%",
      height: 40,
      width: 40,
    },
  },
};

export default Post;
