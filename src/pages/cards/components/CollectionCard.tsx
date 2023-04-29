import React from "react";
import { Box, Typography } from "@mui/material";
import { getCardContract } from "../../../utils/getContracts";

import { CollectionItem } from "@/mocks/collection";
import { CardsContext } from "@/context/CardsContext";
import Badge from "@/icons/Badge";

import LockIcon from "@mui/icons-material/Lock";
import { ethers } from "ethers";
import { useUser } from "@clerk/nextjs";

const CollectionCard = (props: CollectionItem) => {
  const { card, count } = props;
  const { collection, setCollection } = React.useContext(CardsContext);

  const { user } = useUser();
  const [nftCount, setNfTCount] = React.useState(0);

  // TODO: Fetch balance with hoook
  const init = async () => {
    setNfTCount(0);
    // const contract = getCardContract(card.address, )
    if (!user) return;
    let signer = null;

    let provider;
    if (window.ethereum == null) {
      provider = null; //ethers.getDefaultProvider();
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);

      signer = await provider.getSigner();
      if (card.address) {
        console.log("card address", card.address);
        let contract = await getCardContract(card.address, provider);
        const player_address = user?.primaryWeb3Wallet?.web3Wallet || "";

        let balance = await contract.balanceOf(player_address);
        console.log("balance", balance);
        console.log(balance);

        setNfTCount(Number(balance));
        collection[Number(card.id) - 1].count =
          balance >= 3 ? 3 : Number(balance);
        setCollection([...collection]);
      }
    }
  };

  React.useEffect(() => {
    if (!user) return;
    init();
  }, [user]);

  const { addCardToDeck, formState } = React.useContext(CardsContext);

  const onClick = () => {
    if (formState === "index") return;
    if (count > 0) addCardToDeck(card);
  };

  const actualCount = count >= 3 ? 3 : count;
  const actualNftCount = nftCount >= 3 ? 3 : nftCount;

  const formStateCount = {
    index: nftCount,
    edit: `${actualCount} / ${actualNftCount}`,
    create: `${actualCount} / ${actualNftCount}`,
  };

  return (
    <Box
      key={card.id}
      className={`count-${count}`}
      sx={{
        ...styles.card,
        cursor: formState !== "index" ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      <img src={card.image} alt={`${card.id} trading card`} />
      <Box sx={styles.counter}>
        <Box sx={styles.counterWrapper}>
          <Box sx={styles.label}>
            {count === 0 ? (
              <LockIcon />
            ) : (
              <Typography fontWeight="bold" fontSize={14}>
                {formStateCount[formState]}
              </Typography>
            )}
          </Box>
          <Badge />
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  card: {
    position: "relative",
    height: 280,

    "& img": {
      boxShadow: 4,
      borderRadius: 3,
      overflow: "hidden",
      maxWidth: 200,
    },

    "&.count-0": {
      cursor: "not-allowed",
      "& img": {
        opacity: 0.2,
      },
    },
  },

  counter: {
    position: "absolute",
    bottom: 6,
    left: "50%",
    transform: "translate(-50%, 50%) scale(1.25)",
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  counterWrapper: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& svg": {
      maxHeight: 14,
    },
  },
};

export default CollectionCard;
