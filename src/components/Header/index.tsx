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
import Button from "../Button";
import Logo from "../Logo";
import { useRouter } from "next/router";
import { api } from "@/utils/api";

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
  const { push } = useRouter();
  const { data: game } = api.games.getGame.useQuery();
  const [balance, setBalance] = React.useState<string | null>(null);

  const address = user?.primaryWeb3Wallet?.web3Wallet || "";

  const getBalance = async () => {
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
      setBalance(Number(balanceInEth).toFixed(0));
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
        <Logo />
        <Box sx={styles.infos}>
          {!!game && (
            <Button color="secondary" onClick={() => push("/game")}>
              Open Game
            </Button>
          )}
          <Box sx={styles.currencies}>
            {balance && <Currency type="default" value={balance} />}
          </Box>
          <Box sx={{ display: "flex", position: "relative" }}>
            <PlayerInfo name={shortenAddress(address)} avatar={PLAYER.avatar} />
            <Box
              sx={{
                position: "absolute",
                zIndex: 10,
                top: 0,
                right: 0,
                width: "100%",
                height: "100%",

                "& .cl-avatarBox": {
                  height: 60,
                  width: 60,
                  opacity: 0,
                },

                "& .cl-avatarImage": {
                  height: 60,
                  width: 60,
                },
              }}
            >
              <UserButton userProfileUrl="https://assets.iotabots.io/compressed/1.png?auto=format&fit=max&w=828" />
            </Box>
          </Box>
        </Box>
      </SignedIn>
      <SignedOut>
        <Box sx={styles.buttons}>
          <Logo />
          <SignInWithMetamaskButton>
            <Button color="secondary">Connect</Button>
          </SignInWithMetamaskButton>
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
    px: 2,
  },
  player: { transform: "translateY(40px)" },
  infos: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
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
