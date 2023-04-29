import { CARDS, Card } from "./cards";

export interface CollectionItem {
  card: Card;
  count: number;
}

export const EMPTY_COLLECTION: CollectionItem[] = [
  { card: CARDS[0], count: 0 },
  { card: CARDS[1], count: 0 },
  { card: CARDS[2], count: 0 },
  { card: CARDS[3], count: 0 },
  { card: CARDS[4], count: 0 },
  { card: CARDS[5], count: 0 },
  { card: CARDS[6], count: 0 },
  { card: CARDS[7], count: 0 },
  { card: CARDS[8], count: 0 },
  { card: CARDS[9], count: 0 },
  { card: CARDS[10], count: 0 },
  { card: CARDS[11], count: 0 },
  { card: CARDS[12], count: 0 },
  { card: CARDS[13], count: 0 },
  { card: CARDS[14], count: 0 },
  { card: CARDS[15], count: 0 },
  { card: CARDS[16], count: 0 },
  { card: CARDS[17], count: 0 },
  { card: CARDS[18], count: 0 },
  { card: CARDS[19], count: 0 },
  { card: CARDS[20], count: 0 },
  { card: CARDS[21], count: 0 },
];

export const RANDOM_COLLECTION: CollectionItem[] = [
  { card: CARDS[0], count: 1 },
  { card: CARDS[1], count: 2 },
  { card: CARDS[2], count: 3 },
  { card: CARDS[3], count: 5 },
  { card: CARDS[4], count: 2 },
  { card: CARDS[5], count: 3 },
  { card: CARDS[6], count: 3 },
  { card: CARDS[7], count: 2 },
  { card: CARDS[8], count: 2 },
  { card: CARDS[9], count: 3 },
  { card: CARDS[10], count: 2 },
  { card: CARDS[11], count: 0 },
  { card: CARDS[12], count: 3 },
  { card: CARDS[13], count: 1 },
  { card: CARDS[14], count: 3 },
  { card: CARDS[15], count: 2 },
  { card: CARDS[16], count: 3 },
  { card: CARDS[17], count: 2 },
  { card: CARDS[18], count: 3 },
  { card: CARDS[19], count: 2 },
  { card: CARDS[20], count: 3 },
  { card: CARDS[21], count: 1 },
];

export const FULL_COLLECTION: CollectionItem[] = [
  { card: CARDS[0], count: 3 },
  { card: CARDS[1], count: 3 },
  { card: CARDS[2], count: 3 },
  { card: CARDS[3], count: 3 },
  { card: CARDS[4], count: 3 },
  { card: CARDS[5], count: 3 },
  { card: CARDS[6], count: 3 },
  { card: CARDS[7], count: 3 },
  { card: CARDS[8], count: 3 },
  { card: CARDS[9], count: 3 },
  { card: CARDS[10], count: 3 },
  { card: CARDS[11], count: 3 },
  { card: CARDS[12], count: 3 },
  { card: CARDS[13], count: 3 },
  { card: CARDS[14], count: 3 },
  { card: CARDS[15], count: 3 },
  { card: CARDS[16], count: 3 },
  { card: CARDS[17], count: 3 },
  { card: CARDS[18], count: 3 },
  { card: CARDS[19], count: 3 },
  { card: CARDS[20], count: 3 },
  { card: CARDS[21], count: 3 },
];

export const DEFAULT_COLLECTION = RANDOM_COLLECTION;

export const COLLECTION = RANDOM_COLLECTION;
