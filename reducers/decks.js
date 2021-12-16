import {
  RECEIVE_DECKS,
  CREATE_DECK,
  RECEIVE_NEW_CARD
} from '../actions/decks';

export default function decks(state = {}, action) {
  switch(action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case CREATE_DECK:
      return {
        ...state,
        [action.deck.id]: action.deck
      };
    case RECEIVE_NEW_CARD:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          cards: state[action.deckId].cards.concat([action.cardId])
        }
      };
    default:
      return state;
  }
}