import React, { Dispatch, SetStateAction } from "react";
import { CountCard } from "@/mocks/deck";
import { COLLECTION, CollectionItem } from "@/mocks/collection";
import { Card } from "@/mocks/cards";
import { toast } from "react-hot-toast";
import { countDeck } from "@/utils/countDeck";

export interface FormData {
  name: string;
  cards: CountCard[];
}

export type FormState = "index" | "edit" | "create";

export interface CardsContextType {
  formState: FormState;
  setFormState: Dispatch<SetStateAction<FormState>>;
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  collection: CollectionItem[];
  setCollection: Dispatch<SetStateAction<CollectionItem[]>>;
  addCardToDeck: (card: Card) => void;
  changeCollectionCardCount: (id: number, amount: number) => void;
}

export const CardsContext = React.createContext<CardsContextType>(
  {} as CardsContextType
);

interface Props {
  children: React.ReactNode;
}

export const CardsProvider: React.FC<Props> = ({ children }) => {
  const [formState, setFormState] = React.useState<FormState>("index");
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    cards: [],
  });
  const [collection, setCollection] = React.useState(COLLECTION);

  const changeCollectionCardCount = (cardid: number, amount: number) => {
    collection[cardid - 1].count += amount;
    setCollection([...collection]);
  };

  const addCardToDeck = (card: Card) => {
    const insertAt = formData.cards.findIndex((item) => item.id === card.id);
    if (countDeck(formData.cards) >= 33) {
      toast.error("Max 33 cards in a deck");
      return;
    }

    // Card not yet in deck: Put new card at the end
    if (insertAt === -1) {
      setFormData({
        name: formData.name,
        cards: [...formData.cards, { ...card, count: 1 }],
      });
      changeCollectionCardCount(Number(card.id), -1);
    }
    // Card already in deck
    else {
      const currentCount = formData.cards[insertAt].count;
      // Max limit reached already
      if (currentCount === 3) {
        toast.error("Maximum 3 of each card");
        return;
      }
      // Add card to deck
      formData.cards[insertAt].count += 1;
      setFormData({
        name: formData.name,
        cards: [...formData.cards],
      });
      changeCollectionCardCount(Number(card.id), -1);
    }
  };

  const context: CardsContextType = {
    formState,
    setFormState,
    formData,
    setFormData,
    collection,
    setCollection,
    addCardToDeck,
    changeCollectionCardCount,
  };

  return (
    <CardsContext.Provider value={context}>{children}</CardsContext.Provider>
  );
};
