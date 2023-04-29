import React, { Dispatch, SetStateAction } from "react";
import { CountCard } from "@/mocks/deck";

export interface FormData {
  name: string;
  cards: CountCard[];
}

export interface CardsContextType {
  formActive: boolean;
  setFormActive: Dispatch<SetStateAction<boolean>>;
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
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
    name: "Starter Deck",
    cards: [],
  });

  const context: CardsContextType = {
    formActive,
    setFormActive,
    formData,
    setFormData,
  };

  return (
    <CardsContext.Provider value={context}>{children}</CardsContext.Provider>
  );
};
