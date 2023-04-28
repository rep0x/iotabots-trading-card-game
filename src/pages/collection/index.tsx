import Head from "next/head";
import { Typography, Container, Box } from "@mui/material";

import Base from "@/layouts/Base";
import { CARDS } from "@/mocks/cards";

export default function Collection() {
  return (
    <>
      <Head>
        <title>Collection - Iotabots TCG</title>
        <meta name="description" content="Iotabots Trading Card Game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Base>
        <Container maxWidth="lg">
          <Typography variant="h1">Collection</Typography>
          <Box sx={styles.grid}>
            {CARDS.map((card) => (
              <Box sx={styles.card}>
                <img src={card.image} alt={`${card.id} trading card`} />
                {card.id}
              </Box>
            ))}
          </Box>
        </Container>
      </Base>
    </>
  );
}

const styles = {
  grid: {
    display: "flex",
    gap: 4,
    flexWrap: "wrap",
  },
  card: {
    "& img": {
      maxWidth: 200,
    },
  },
};
