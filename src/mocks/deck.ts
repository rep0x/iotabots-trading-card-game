import { CARDS, Card } from "./cards";

export interface CountCard extends Card {
  count: number;
}

interface Deck {
  id: number;
  name: string;
  bots: number;
  spells: number;
  mana: Record<number, number>;
  cards: CountCard[];
}

export const DECK: Deck = {
  id: 0,
  name: "Starter Deck",
  bots: 24,
  spells: 9,
  mana: {
    0: 2,
    1: 9,
    2: 6,
    3: 4,
    4: 5,
    5: 3,
    6: 2,
  },
  cards: [
    { ...CARDS[0], count: 1 },
    { ...CARDS[1], count: 3 },
    { ...CARDS[2], count: 2 },
    { ...CARDS[3], count: 2 },
    { ...CARDS[4], count: 2 },
    { ...CARDS[5], count: 2 },
    { ...CARDS[6], count: 2 },
    { ...CARDS[7], count: 2 },
    { ...CARDS[8], count: 2 },
    { ...CARDS[9], count: 2 },
    { ...CARDS[10], count: 2 },
    { ...CARDS[11], count: 1 },
    { ...CARDS[12], count: 1 },
    { ...CARDS[13], count: 1 },
    { ...CARDS[14], count: 1 },
    { ...CARDS[15], count: 1 },
    { ...CARDS[16], count: 1 },
    { ...CARDS[17], count: 1 },
    { ...CARDS[18], count: 1 },
    { ...CARDS[19], count: 1 },
    { ...CARDS[20], count: 1 },
    { ...CARDS[21], count: 1 },
  ],
};

export const EARLY_RUSH: Deck = {
  id: 1,
  name: "Early Rush",
  bots: 24,
  spells: 9,
  mana: {
    0: 2,
    1: 9,
    2: 6,
    3: 4,
    4: 5,
    5: 3,
    6: 2,
  },
  cards: [
    { ...CARDS[0], count: 2 },
    { ...CARDS[1], count: 2 },
    { ...CARDS[2], count: 2 },
    { ...CARDS[3], count: 2 },
    { ...CARDS[4], count: 2 },
    { ...CARDS[5], count: 2 },
    { ...CARDS[6], count: 2 },
    { ...CARDS[7], count: 2 },
    { ...CARDS[8], count: 2 },
    { ...CARDS[9], count: 2 },
    { ...CARDS[10], count: 2 },
    { ...CARDS[11], count: 1 },
    { ...CARDS[12], count: 1 },
    { ...CARDS[13], count: 1 },
    { ...CARDS[14], count: 1 },
    { ...CARDS[15], count: 1 },
    { ...CARDS[16], count: 1 },
    { ...CARDS[17], count: 1 },
    { ...CARDS[18], count: 1 },
    { ...CARDS[19], count: 1 },
    { ...CARDS[20], count: 1 },
    { ...CARDS[21], count: 1 },
  ],
};

export const STRONG_MID: Deck = {
  id: 2,
  name: "Strong Mid",
  bots: 24,
  spells: 9,
  mana: {
    0: 2,
    1: 9,
    2: 6,
    3: 4,
    4: 5,
    5: 3,
    6: 2,
  },
  cards: [
    { ...CARDS[0], count: 3 },
    { ...CARDS[1], count: 1 },
    { ...CARDS[2], count: 2 },
    { ...CARDS[3], count: 2 },
    { ...CARDS[4], count: 2 },
    { ...CARDS[5], count: 2 },
    { ...CARDS[6], count: 2 },
    { ...CARDS[7], count: 2 },
    { ...CARDS[8], count: 2 },
    { ...CARDS[9], count: 2 },
    { ...CARDS[10], count: 2 },
    { ...CARDS[11], count: 1 },
    { ...CARDS[12], count: 1 },
    { ...CARDS[13], count: 1 },
    { ...CARDS[14], count: 1 },
    { ...CARDS[15], count: 1 },
    { ...CARDS[16], count: 1 },
    { ...CARDS[17], count: 1 },
    { ...CARDS[18], count: 1 },
    { ...CARDS[19], count: 1 },
    { ...CARDS[20], count: 1 },
    { ...CARDS[21], count: 1 },
  ],
};

export const DECKS: Deck[] = [];
