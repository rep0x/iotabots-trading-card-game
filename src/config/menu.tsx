import CollectionIcon from "@/icons/CollectionIcon";
import HistoryIcon from "@/icons/HistoryIcon";
import HomeIcon from "@/icons/HomeIcon";
import ShopIcon from "@/icons/ShopIcon";

export const MENU = [
  {
    label: "Home",
    icon: <HomeIcon />,
    link: "/",
  },
  {
    label: "Cards",
    icon: <CollectionIcon />,
    link: "/cards",
  },
  {
    label: "Shop",
    icon: <ShopIcon />,
    link: "/shop",
  },
  {
    label: "History",
    icon: <HistoryIcon />,
    link: "/history",
  },
];
