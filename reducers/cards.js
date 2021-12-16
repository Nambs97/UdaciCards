import {
  RECEIVE_CARDS,
  ADD_CARD_TO_DECK
} from '../actions/cards';

export default function cards(state = {}, action) {
  switch(action.type) {
    case RECEIVE_CARDS:
      return {
        ...state,
        ...action.cards
      };
    case ADD_CARD_TO_DECK:
      return {
        ...state,
        [action.card.id]: action.card
      };
    default:
      return state;
  }
}