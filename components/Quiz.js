import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from "react-redux";
import { handleReceiveDecks } from "../actions/decks";
import { handleReceiveCards } from "../actions/cards";
import Card from './Card';
import Score from './Score';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import CardFlip from 'react-native-card-flip';

export const QUIZ_DONE_COUNT = 'QUIZ_DONE_COUNT';

function Quiz(props) {
  const { cardsDeck, deck, navigation } = props;
  const { deckId } = props.route.params;
  const cardsCount = cardsDeck.length;
  const dateKey = new Date().toLocaleDateString();
  let quizCountByDate;

  const [answerView, setAnswerView] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showScore, setShowScore] = useState(false);
  //const [flipValue, setFlipValue] = useState(new Animated.Value(0));
  const flipValue = useRef(new Animated.Value(0)).current;

  const interpolateFlipValue = flipValue.interpolate({
    inputRange: [0, 90],
    outputRange: ['0deg', '90deg'],
  });
  
  const flipCard = () => {
    Animated.sequence([
      Animated.timing(flipValue, { 
      duration: 100, 
      toValue: 90,
      useNativeDriver: true
      }),
      Animated.timing(flipValue, { 
      duration: 100, 
      toValue: 0,
      useNativeDriver: true
      })
    ]).start();
    setAnswerView(!answerView);
  }

  const passToNextCard = (answer) => {
    if (currentCard < cardsCount - 1) {
      setCurrentCard(currentCard+1);
      if (answer === 'correct') {
        setCorrectCount(correctCount === cardsCount ? correctCount : correctCount + 1);
      }
    } else {
      setShowScore(true);
      if (answer === 'correct') {
        setCorrectCount(correctCount === cardsCount ? correctCount : correctCount + 1);
      }
      updateTodayQuiz();
    }
    setAnswerView(false);
  }

  const restartQuiz = () => {
    setCurrentCard(0);
    setCorrectCount(0);
    setShowScore(false);
  }

  const updateTodayQuiz = () => {
    AsyncStorage.getItem(QUIZ_DONE_COUNT)
      .then((result) => {
        quizCountByDate = result;

        if (quizCountByDate !== 'undefined') {
          quizCountByDate = JSON.parse(quizCountByDate);
        } else {
          quizCountByDate = {};
        }

        if (quizCountByDate[dateKey] === undefined ) quizCountByDate[dateKey] = 0;
        quizCountByDate[dateKey] += 1;

        try {
          AsyncStorage.setItem(
            QUIZ_DONE_COUNT,
            JSON.stringify(quizCountByDate)
          );
          clearLocalNotification().then(() => {
            setLocalNotification();
          });
        } catch (error) {
          console.error('Some error occured when saving Quiz counter to Async Storage');
        }

      });
  }

  return (
    <View style={styles.container}>
      {cardsDeck.length > 0 && 
        <View>
          <Text style={styles.title}>{(currentCard + 1) + '/' + cardsCount}</Text>
          {!showScore 
            ? <View>
                <Animated.View style={{transform: [{ rotateY: interpolateFlipValue }]}}>
                  <Card answerView={answerView} card={cardsDeck[currentCard]} />
                </Animated.View>
                <TouchableOpacity onPress={flipCard}>
                  <Text style={styles.toggleLink}>{answerView ? 'Back to Question' : 'Show Answer'}</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={!answerView} onPress={() => passToNextCard('incorrect')}>
                  <Text style={!answerView ? styles.disabledDangerButton : styles.dangerButton}>Incorrect</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={!answerView} onPress={() => passToNextCard('correct')}>
                  <Text style={!answerView ? styles.disabledSuccessButton : styles.successButton}>Correct</Text>
                </TouchableOpacity>
              </View>
            : <View>
                <Score correctCount={correctCount} cardsCount={cardsCount} />
                <TouchableOpacity onPress={restartQuiz}>
                  <Text style={styles.secondaryButton}>Restart Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('DeckHome', {deck: deck})}>
                  <Text style={styles.primaryButton}>Back to Deck</Text>
                </TouchableOpacity>
              </View>
          }
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ecf0f1'
  },
  title:  {
    color: '#768fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15
  },
  toggleLink: {
    color: '#0039cb',
    textAlign: 'center',
    fontWeight: 700,
    margin: 10
  },
  primaryButton: {
    textAlign: 'center',
    backgroundColor: '#0039cb',
    color: 'white',
    fontWeight: 700,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#0039cb',
    borderRadius: 5,
    alignItems: 'center',
    paddingTop:10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10
  },
  secondaryButton: {
    textAlign: 'center',
    color: '#0039cb',
    fontWeight: 700,
    backgroundColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#0039cb',
    borderRadius: 5,
    alignItems: 'center',
    paddingTop:10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10
  },
  successButton: {
    textAlign: 'center',
    backgroundColor: '#4caf50',
    color: 'white',
    fontWeight: 700,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#4caf50',
    borderRadius: 5,
    alignItems: 'center',
    paddingTop:10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10
  },
  disabledSuccessButton: {
    textAlign: 'center',
    backgroundColor: '#80e27e',
    color: 'white',
    fontWeight: 700,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#80e27e',
    borderRadius: 5,
    alignItems: 'center',
    paddingTop:10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10
  },
  dangerButton: {
    textAlign: 'center',
    backgroundColor: '#f44336',
    color: 'white',
    fontWeight: 700,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#f44336',
    borderRadius: 5,
    alignItems: 'center',
    paddingTop:10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10
  },
  disabledDangerButton: {
    textAlign: 'center',
    backgroundColor: '#ff7961',
    color: 'white',
    fontWeight: 700,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ff7961',
    borderRadius: 5,
    alignItems: 'center',
    paddingTop:10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10
  }
});

const mapStateToProps = ({ decks, cards }, { route }) => {
  const { deckId } = route.params;
  return {
    cardsDeck: Object.values(cards).filter(card => card.deckId === deckId),
    deck: decks[deckId]
  }
}

export default connect(mapStateToProps)(Quiz);