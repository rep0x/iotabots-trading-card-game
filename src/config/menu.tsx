import CollectionIcon from "@/icons/CollectionIcon";
import HistoryIcon from "@/icons/HistoryIcon";
import ShopIcon from "@/icons/ShopIcon";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";

export const MENU = [
  {
    label: "Play",
    icon: <PlayCircleRoundedIcon />,
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
