import Head from "next/head";
import { Inter } from "next/font/google";
import { Typography } from "@mui/material";

import Base from "@/layouts/Base";

const inter = Inter({ subsets: ["latin"] });

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
        <main className={`${inter.className}`}>
          <Typography>Home</Typography>
        </main>
      </Base>
    </>
  );
}
