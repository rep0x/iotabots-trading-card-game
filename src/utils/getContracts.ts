import { Contract } from "ethers";
import CardABI from "../contracts/Card.json";
import ShopABI from "../contracts/Shop.json";
import { ADDRESSES } from "@/contracts/addresses";
export const getShopContract = async (sender: any) => {
  let contract = new Contract(ADDRESSES.shop, ShopABI.abi, sender);
  return contract;
};

export const getCardContract = async (card_address: any, sender: any) => {
  console.log("add");
  console.log("add ", card_address);
  let contract = new Contract(card_address, CardABI.abi, sender);
  return contract;
};
