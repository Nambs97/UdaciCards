import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Card(props) {
  const { answerView, card} = props;

  return (
    <View style={answerView ? styles.cardBack : styles.cardFront}>
      <Text style={answerView ? styles.cardBackContent : styles.cardFrontContent}>{answerView ? card.answer : card.question}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  cardBack: {
    height: 150,
    margin: 5,
    padding: 10,
    backgroundColor: '#768fff',
    borderWidth: 15,
    borderStyle: 'solid',
    borderColor: 'lightgray',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardFront: {
    height: 150,
    margin: 5,
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 15,
    borderStyle: 'solid',
    borderColor: '#768fff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardFrontContent: {
    textAlign: 'center',
    color: '#222',
    fontSize: 16,
    fontWeight: '600'
  },
  cardBackContent: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  }
});