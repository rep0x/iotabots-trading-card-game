export interface DeckItemType {
  id: string;
  type: string;
  name: string;
  image: string;
  mana: number;
  attack: number;
  defense: number;
  hits: number;
  count: number;
}

export interface DeckType {
  id: string;
  name: string;
  cards: DeckItemType[];
}

export interface Player {
  health: number;
  mana: number;
  deck: string[];
  hand: string[];
  zone: ZoneCard[];
  junk: string[];
}

export interface ZoneCard {
  image: string;
  id: number;
  attack: number;
  defense: number;
  mana: number;
  hits: number;
  deployed: boolean;
}
