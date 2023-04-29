import Head from "next/head";
import { Typography, Container, Button } from "@mui/material";

import Base from "@/layouts/Base";
import { ethers } from "ethers";
import React from "react";
import { useUser } from "@clerk/nextjs";

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
      const balance = await provider.getBalance(address);
      const balanceInEth = ethers.formatEther(balance);
    }
  };

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
        <Container>
          <Typography variant="h1">Shop</Typography>
          <Button onClick={() => buyStarterPack()}>buyStarterPack</Button>
        </Container>
      </Base>
    </>
  );
}
