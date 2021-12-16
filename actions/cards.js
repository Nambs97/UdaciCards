import { _getCards, _addCardToDeck } from '../utils/api';
import { receiveNewCard } from './decks';

export const RECEIVE_CARDS = 'RECEIVE_CARDS';
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK';

function receiveCards(cards) {
  return {
    type: RECEIVE_CARDS,
    cards
  }
}

export function handleReceiveCards() {
  return (dispatch) => {
    return _getCards()
      .then((cards) => {
        dispatch(receiveCards(cards));
      })
  }
}

function addCardToDeck(card, deckId) {
  return {
    type: ADD_CARD_TO_DECK,
    card,
    deckId
  }
}

export function handleAddCardToDeck(question, answer, deckId) {
  return (dispatch) => {
    return _addCardToDeck(question, answer, deckId)
      .then((card) => {
        dispatch(addCardToDeck(card, deckId));
        dispatch(receiveNewCard(card.id, deckId));
      });
  }
}