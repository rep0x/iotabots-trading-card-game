import React from "react";

import Head from "next/head";
import { Typography, Container, Box } from "@mui/material";
import Base from "@/layouts/Base";

import { api } from "@/utils/api";

import Post from "./components/Post";
import Create from "./components/Create";

export default function Posts() {
  const { data } = api.posts.getAll.useQuery();

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
          <Create />
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
};
