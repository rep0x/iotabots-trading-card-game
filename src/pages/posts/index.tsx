import React from "react";

import Head from "next/head";
import { Typography, Container, Box } from "@mui/material";
import Base from "@/layouts/Base";

import { api } from "@/utils/api";

import Post from "@/components/Post";
import Create from "@/components/Create";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Posts() {
  const { data, isLoading, isError } = api.posts.getAll.useQuery();

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
          {isLoading && (
            <Box mt={2}>
              <LoadingSpinner />
            </Box>
          )}
          {isError && <Typography>Something went wrong</Typography>}
          {data && data.map((post) => <Post key={post.post.id} {...post} />)}
        </Container>
      </Base>
    </>
  );
}
