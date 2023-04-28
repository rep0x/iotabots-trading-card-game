import React from "react";

import Head from "next/head";
import { Typography, Container, Box } from "@mui/material";
import Base from "@/layouts/Base";

import { RouterOutputs, api } from "@/utils/api";
import { SignedIn, useUser } from "@clerk/nextjs";
import { shortenAddress } from "@/utils/shortenAddress";

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

export default function Posts() {
  const { data } = api.posts.getAll.useQuery();
  const { user } = useUser();

  if (!user) return null;

  return (
    <>
      <Head>
        <title>Posts - Iotabots TCG</title>
        <meta name="description" content="Posts - Iotabots Trading Card Game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Base>
        <Container>
          <Typography variant="h1" gutterBottom>
            Posts
          </Typography>
          <SignedIn>
            <Box sx={styles.create}>
              <img src={user.profileImageUrl} alt="user-avatar" />
              <input placeholder="Your message" />
            </Box>
          </SignedIn>
          {data?.map((post) => (
            <Post key={post.post.id} {...post} />
          ))}
        </Container>
      </Base>
    </>
  );
}

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
