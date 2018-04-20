import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY, setDefaultDecks } from './helpers'

// get deck results
export function getDecks () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
}

// take in a single id argument and return the deck associated with that id. 
export function getDeck () {

}

// take in a single title argument and add it to the decks.
export function saveDeckTitle (title) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [title]: {
      title: title,
      questions: []
    }
  }))
}  

// take in two arguments, title and card, and will add the card to the list
// of questions for the deck with the associated title.
export function addCardToDeck () {

}