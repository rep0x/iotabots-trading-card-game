import React from "react";
import Head from "next/head";
import { Typography, Container, Box, Grid } from "@mui/material";
import Button from "@/components/Button";

import Base from "@/layouts/Base";
import { Contract, ethers } from "ethers";
import { useUser } from "@clerk/nextjs";
import StarSvg from "@/icons/StarSvg";
import RocketSvg from "@/icons/RocketSvg";

import ShopABI from "../../contracts/Shop.json";
import { ADDRESSES } from "@/contracts/addresses";
import toast from "react-hot-toast";

export default function Shop() {
  const { user } = useUser();

  const address = user?.primaryWeb3Wallet?.web3Wallet || "";

  const buyStarterPack = async () => {
    if (!user) return;
    let signer = null;

    let provider;
    if (window.ethereum == null) {
      // If MetaMask is not installed, we use the default provider,
      // which is backed by a variety of third-party services (such
      // as INFURA). They do not have private keys installed so are
      // only have read-only access

      provider = null; //ethers.getDefaultProvider();
    } else {
      // Connect to the MetaMask EIP-1193 object. This is a standard
      // protocol that allows Ethers access to make all read-only
      // requests through MetaMask.
      provider = new ethers.BrowserProvider(window.ethereum);

      // It also provides an opportunity to request access to write
      // operations, which will be performed by the private key
      // that MetaMask manages for the user.
      signer = await provider.getSigner();
      let contract = new Contract(ADDRESSES.shop, ShopABI.abi, signer);

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
      onClick: () => null,
    },
  ];

  React.useEffect(() => {
    if (user) {
      //getBalance();
    }
  }, [user]);

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
            {PACKS.flatMap(({ icon, name, description, onClick }) => (
              <Grid item xs={6}>
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
                    }}
                  >
                    {description}
                  </Typography>
                  <Button color="secondary" mt={6} onClick={onClick}>
                    Buy
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
