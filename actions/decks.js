import { _getDecks, _createDeck } from '../utils/api';

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const CREATE_DECK = 'CREATE_DECK';
export const RECEIVE_NEW_CARD = 'RECEIVE_NEW_CARD';

function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function handleReceiveDecks() {
  return (dispatch) => {
    return _getDecks()
      .then((decks) => {
        dispatch(receiveDecks(decks));
      })
  }
}

function createDeck(deck) {
  return {
    type: CREATE_DECK,
    deck
  }
}

export function handleCreateDeck(title) {
  return (dispatch) => {
    return _createDeck(title)
      .then((deck) => {
        dispatch(createDeck(deck));
      })
  }
}

export function receiveNewCard(cardId, deckId) {
  return {
    type: RECEIVE_NEW_CARD,
    cardId,
    deckId
  }
}