import AsyncStorage from '@react-native-async-storage/async-storage';

const DECKS_STORAGE_KEY = 'DECKS_STORAGE_KEY'
const CARDS_STORAGE_KEY = 'CARDS_STORAGE_KEY'

let decks = {
		react: {
			id: 'react',
			title: 'React',
			cards: ['36dve39r90s64v0k','cvf8vv812zafy11h']
		},
		javascript: {
			id: 'javascript',
			title: 'JavaScript',
			cards: ['ex7pergx9m3j7sob']
		}
	}
	
let cards = {
		'36dve39r90s64v0k': {
			id: '36dve39r90s64v0k',
			question: 'What is React?',
			answer: 'A library for managing user interfaces',
      deckId: 'react'
		},
		cvf8vv812zafy11h: {
			id: 'cvf8vv812zafy11h',
			question: 'Where do you make Ajax requests in React?',
			answer: 'The componentDidMount lifecycle event',
      deckId: 'react'
		},
		ex7pergx9m3j7sob: {
			id: 'ex7pergx9m3j7sob',
			question: 'What is a closure?',
			answer: 'The combination of a function and the lexical environment within which that function was declared.',
      deckId: 'javascript'
		}
	}


function generateCardId() {
	return (Date.now()*Math.random()).toString(36).substring(0, 8) + (Date.now()*Math.random()).toString(36).substring(0, 8);
}

function generateDeckId(title) {
	return title.replace(/\s/g,'').toLowerCase();
}

export function _getDecks() {
  return new Promise((res, rej) => {
    AsyncStorage.getItem(DECKS_STORAGE_KEY).then((data) => {
      decks = { ...decks, ...JSON.parse(data)};
      res({ ...decks })
    })
  });
}

export function _getDeck(deckId) {
  return new Promise((res, rej) => {
    AsyncStorage.getItem(DECKS_STORAGE_KEY).then((data) => {
      decks = { ...decks, ...JSON.parse(data)};
      res({ ...decks[deckId] })
    })
  });
}

export function _getCards() {
	return new Promise((res, rej) => {
    AsyncStorage.getItem(CARDS_STORAGE_KEY).then((data) => {
      cards = { ...cards, ...JSON.parse(data)};
      res({ ...cards })
    })
  });
}


export function _getCard(cardId) {
  return new Promise((res, rej) => {
    AsyncStorage.getItem(CARDS_STORAGE_KEY).then((data) => {
      cards = { ...cards, ...JSON.parse(data)};
      res({ ...cards[cardId] })
    })
  });
}

export function _createDeck(title) {
	return new Promise((res, rej) => {
    const deckId = generateDeckId(title);

    decks = {
      ...decks,
      [deckId]: {
        id: deckId,
        title: title,
        cards: []
      }
	  }

    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));

    res({
        id: deckId,
        title: title,
        cards: []
      });
  }, 1000);
}

export function _addCardToDeck(question, answer, deckId) {
  return new Promise((res, rej) => {
    const cardId = generateCardId();
	
    cards = {
      ...cards,
      [cardId]: {
        id: cardId,
        question: question,
        answer: answer,
        deckId: deckId
      }
    }
    
    decks = {
      ...decks,
      [deckId]: {
        ...decks[deckId],
        cards: decks[deckId].cards.concat([cardId])
      }
    }

    AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(cards));
	  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));

    res({ ...cards[cardId]});
  }, 1000);
}