import Head from "next/head";
import { Typography, Container, Box } from "@mui/material";

import Avatar from "@/components/Avatar";

import Base from "@/layouts/Base";
import { api } from "@/utils/api";
import { shortenAddress } from "@/utils/shortenAddress";

import circle from "@/icons/historyCircle.png";
import circleCaret from "@/icons/historyCircleCaret.png";

// TODO: Get these mocks from server
const AVATAR =
  "https://assets.iotabots.io/compressed/1.png?auto=format&fit=max&w=828";

export default function History() {
  const { data } = api.games.getGames.useQuery();

  return (
    <>
      <Head>
        <title>History - Iotabots TCG</title>
        <meta name="description" content="Iotabots Trading Card Game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Base>
        <Container maxWidth="md">
          <Typography variant="h1" gutterBottom>
            History
          </Typography>
          {!!data && (
            <Box sx={styles.grid}>
              {data.map((game) => (
                <Box key={game.id} sx={styles.card}>
                  <Box sx={styles.player}>
                    <Box sx={styles.avatar}>
                      <Avatar avatar={AVATAR} />
                    </Box>
                    <Box>
                      <Typography fontWeight="bold" fontSize={20}>
                        {shortenAddress(game.player1)}
                      </Typography>
                      <Typography color="text.secondary">
                        {game.player1 === game.winner ? "Victory" : "Defeat"}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={styles.circle}>
                    <Box
                      sx={styles.circleCaret}
                      className={game.player2 === game.winner ? "player2" : ""}
                    />
                    <Typography fontWeight="bold">vs</Typography>
                  </Box>
                  <Box sx={styles.player} className="player2">
                    <Box sx={styles.avatar}>
                      <Avatar avatar={AVATAR} />
                    </Box>
                    <Box>
                      <Typography fontWeight="bold" fontSize={20}>
                        {shortenAddress(game.player2)}
                      </Typography>
                      <Typography color="text.secondary">
                        {game.player2 === game.winner ? "Victory" : "Defeat"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Container>
      </Base>
    </>
  );
}

const styles = {
  grid: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  card: {
    p: 2,
    bgcolor: "rgba(0,0,0,0.8)",
    border: "1px solid",
    borderColor: "secondary.main",
    borderRadius: 2,
    boxShadow: 1,
    display: "flex",
    gap: 2,
  },
  player: {
    display: "flex",
    alignItems: "center",
    gap: 3,
    flex: 1,

    "&.player2": {
      flexDirection: "row-reverse",
      textAlign: "right",
    },
  },
  avatar: {
    height: 60,
    width: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "& .avatar": {
      transform: "scale(1.3)",
    },
  },
  circle: {
    position: "relative",
    backgroundImage: `url(${circle.src})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    width: 60,
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  circleCaret: {
    position: "absolute",
    backgroundImage: `url(${circleCaret.src})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    width: 86,
    height: 86,

    "&.player2": {
      transform: "rotate(180deg)",
    },
  },
};
