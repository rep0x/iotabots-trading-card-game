import React from "react";

import Head from "next/head";
import { Typography, Container } from "@mui/material";
import Base from "@/layouts/Base";

import { api } from "@/utils/api";

export default function Home() {
  const { data } = api.posts.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Iotabots TCG</title>
        <meta name="description" content="Iotabots Trading Card Game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Base>
        <Container>
          <Typography variant="h1">Choose your Deck</Typography>
          {data?.map((post) => (
            <div key={post.id}>{post.content}</div>
          ))}
        </Container>
      </Base>
    </>
  );
}
