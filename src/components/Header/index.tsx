import React from "react";
import { Box } from "@mui/material";

import Currency from "../Currency";
import PlayerInfo from "../PlayerInfo";
import {
  SignedIn,
  UserButton,
  SignedOut,
  SignInWithMetamaskButton,
  useUser,
} from "@clerk/nextjs";

import { ethers } from "ethers";
import { shortenAddress } from "@/utils/shortenAddress";

interface Player {
  name: string;
  avatar: string;
}

const PLAYER: Player | undefined = {
  name: "Peter",
  avatar:
    "https://assets.iotabots.io/compressed/1.png?auto=format&fit=max&w=828",
};

const Header = () => {
  const { user } = useUser();

  const address = user?.primaryWeb3Wallet?.web3Wallet || "";

  const getBalance = async () => {
    let signer = null;

    let provider;
    if (window.ethereum == null) {
      // If MetaMask is not installed, we use the default provider,
      // which is backed by a variety of third-party services (such
      // as INFURA). They do not have private keys installed so are
      // only have read-only access
      console.log("MetaMask not installed; using read-only defaults");
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
      console.log(balanceInEth);
    }
  };

  React.useEffect(() => {
    if (user) {
      getBalance();
    }
  }, [user]);

  return (
    <Box sx={styles.root}>
      <SignedIn>
        <Box sx={styles.player}>
          <PlayerInfo name={shortenAddress(address)} avatar={PLAYER.avatar} />
        </Box>
        <Box sx={styles.currencies}>
          <Currency type="premium" value="242" />
          <Currency type="default" value="2.400" />
        </Box>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <Box sx={styles.buttons}>
          <SignInWithMetamaskButton />
        </Box>
      </SignedOut>
    </Box>
  );
};

const styles = {
  root: {
    position: "fixed",
    zIndex: 10,
    top: 0,
    left: 0,
    height: 80,
    width: "100%",
    borderBottom: "2px solid",
    borderColor: "secondary.main",
    backgroundColor: "rgba(0,0,0,0.66)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    px: 6,
  },
  player: { transform: "translateY(40px)" },
  currencies: {
    display: "flex",
    alignItems: "center",
  },
  buttons: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

export default Header;
