import { DeckItemType } from '../types'

export const countDeck = (cards: DeckItemType[]): number => {
  let count = 0
  for (let index = 0; index < cards.length; index += 1) {
    const element = cards[index]
    count += element.count
  }
  return count
}
