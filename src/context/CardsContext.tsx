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
  selectedDeck: string | null;
  setSelectedDeck: Dispatch<SetStateAction<string | null>>;
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  collection: CollectionItem[];
  setCollection: Dispatch<SetStateAction<CollectionItem[]>>;
  addCardToDeck: (card: Card) => void;
  changeCollectionCardCount: (id: number, amount: number) => void;
  updateCollection: () => void;
  resetCollection: () => void;
}

export const CardsContext = React.createContext<CardsContextType>(
  {} as CardsContextType
);

interface Props {
  children: React.ReactNode;
}

export const CardsProvider: React.FC<Props> = ({ children }) => {
  const [formState, setFormState] = React.useState<FormState>("index");
  const [selectedDeck, setSelectedDeck] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    cards: [],
  });

  // The collection is a manipulatable state for deck managment
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

    if (insertAt === -1) {
      setFormData({
        name: formData.name,
        cards: [...formData.cards, { ...card, count: 1 }],
      });
      changeCollectionCardCount(Number(card.id), -1);
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
      changeCollectionCardCount(Number(card.id), -1);
    }
  };

  const updateCollection = React.useCallback(() => {
    const nextCollection = COLLECTION;
    formData.cards.map((card) => {
      nextCollection[Number(card.id) - 1].count -= card.count;
    });
    setCollection([...nextCollection]);
  }, [formData]);

  const resetCollection = React.useCallback(() => {
    const nextCollection = COLLECTION;
    formData.cards.map((card) => {
      nextCollection[Number(card.id) - 1].count += card.count;
    });
    setCollection([...nextCollection]);
  }, [formData]);

  React.useEffect(() => {
    if (formState === "edit") {
      updateCollection();
    }
  }, [formState]);

  const context: CardsContextType = {
    formState,
    setFormState,
    selectedDeck,
    setSelectedDeck,
    formData,
    setFormData,
    collection,
    setCollection,
    addCardToDeck,
    changeCollectionCardCount,
    updateCollection,
    resetCollection,
  };

  return (
    <CardsContext.Provider value={context}>{children}</CardsContext.Provider>
  );
};
