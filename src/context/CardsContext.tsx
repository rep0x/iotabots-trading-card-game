import React, { Dispatch, SetStateAction } from "react";
import { CountCard } from "@/mocks/deck";
import { COLLECTION, CollectionItem } from "@/mocks/collection";
import { Card } from "@/mocks/cards";
import { toast } from "react-hot-toast";

export interface FormData {
  name: string;
  cards: CountCard[];
}

export interface CardsContextType {
  formActive: boolean;
  setFormActive: Dispatch<SetStateAction<boolean>>;
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  collection: CollectionItem[];
  setCollection: Dispatch<SetStateAction<CollectionItem[]>>;
  addCardToDeck: (card: Card) => void;
}

export const CardsContext = React.createContext<CardsContextType>(
  {} as CardsContextType
);

interface Props {
  children: React.ReactNode;
}

export const CardsProvider: React.FC<Props> = ({ children }) => {
  const [formActive, setFormActive] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    cards: [],
  });
  const [collection, setCollection] = React.useState(COLLECTION);

  const addCardToDeck = (card: Card) => {
    const insertAt = formData.cards.findIndex((item) => item.id === card.id);

    if (insertAt === -1) {
      setFormData({
        name: formData.name,
        cards: [...formData.cards, { ...card, count: 1 }],
      });
    } else {
      const currentCount = formData.cards[insertAt].count;
      if (currentCount === 3) {
        toast.error("Maximum 3 of each card");
        return;
      }
      formData.cards[insertAt].count += 1;
      setFormData({
        name: formData.name,
        cards: [...formData.cards],
      });
    }
  };

  const context: CardsContextType = {
    formActive,
    setFormActive,
    formData,
    setFormData,
    collection,
    setCollection,
    addCardToDeck,
  };

  return (
    <CardsContext.Provider value={context}>{children}</CardsContext.Provider>
  );
};
