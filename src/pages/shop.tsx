import React from "react";
import Head from "next/head";
import { Typography, Container, Box, Grid, Skeleton } from "@mui/material";
import Button from "@/components/Button";

import Base from "@/layouts/Base";
import { ethers } from "ethers";
import { useUser } from "@clerk/nextjs";
import StarSvg from "@/icons/StarSvg";
import RocketSvg from "@/icons/RocketSvg";

import toast from "react-hot-toast";
import { getShopContract } from "../utils/getContracts";

export default function Shop() {
  const { user } = useUser();
  const [loading, setLoading] = React.useState(false);

  const buyStarterPack = async () => {
    if (!user) return;
    setLoading(true);
    let signer = null;

    let provider;
    if (window.ethereum == null) {
      provider = null; //ethers.getDefaultProvider();
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);

      signer = await provider.getSigner();
      let contract = await getShopContract(signer);
      try {
        let tx = await contract.buyStarterPack({
          value: ethers.parseEther("1"),
        });
        await tx.wait();
        toast.success("Success!");
      } catch (error) {
        toast.error("error!");
      }
    }
    setLoading(false);
  };

  const buyBoosterPack = async () => {
    if (!user) return;
    setLoading(true);
    let signer = null;

    let provider;
    if (window.ethereum == null) {
      provider = null; //ethers.getDefaultProvider();
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);

      signer = await provider.getSigner();
      let contract = await getShopContract(signer);
      try {
        let tx = await contract.buyBoosterCards({
          value: ethers.parseEther("1"),
        });
        await tx.wait();
        toast.success("Success!");
      } catch (error) {
        toast.error("error!");
      }
    }
    setLoading(false);
  };

  const PACKS = [
    {
      icon: <StarSvg />,
      name: "Starter Pack",
      description: "40 unique cards",
      onClick: () => buyStarterPack(),
    },
    {
      icon: <RocketSvg />,
      name: "Booster Pack",
      description: "10 random cards",
      onClick: () => buyBoosterPack(),
    },
  ];

  return (
    <>
      <Head>
        <title>Shop - Iotabots TCG</title>
        <meta name="description" content="Iotabots Trading Card Game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Base>
        <Container maxWidth="md">
          <Typography variant="h1" gutterBottom>
            Shop
          </Typography>
          <Grid container spacing={6}>
            {PACKS.map(({ icon, name, description, onClick }) => (
              <Grid key={name} item xs={6}>
                <Box sx={styles.card}>
                  {icon}
                  <Typography
                    variant="h4"
                    mt={6}
                    mb={1}
                    sx={{ color: "secondary.light" }}
                  >
                    {name}
                  </Typography>
                  <Typography
                    sx={{
                      color: "secondary.light",
                      opacity: "0.66",
                      mb: 6,
                    }}
                  >
                    {description}
                  </Typography>
                  <Button
                    color="secondary"
                    onClick={onClick}
                    disabled={loading}
                  >
                    {loading ? (
                      <Skeleton
                        animation="wave"
                        variant="text"
                        sx={{ bgcolor: "rgba(0,0,0,0.5)" }}
                        width={60}
                      />
                    ) : (
                      <div>Buy</div>
                    )}
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Base>
    </>
  );
}

const styles = {
  card: {
    bgcolor: "rgba(0,0,0,.8)",
    px: 4,
    py: 4,
    minHeight: "560px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid",
    borderColor: "secondary.main",
    borderRadius: "8px",
  },
};
