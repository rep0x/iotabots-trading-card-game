import Head from "next/head";
import { Typography, Container } from "@mui/material";

import Base from "@/layouts/Base";

export default function Home() {
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
          <Typography variant="h1">Home</Typography>
        </Container>
      </Base>
    </>
  );
}
