import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Score(props) {
  const { correctCount, cardsCount } = props;
  return (
    <View style={styles.scoreCard}>
      <Text style={styles.scoreContent}>Your final score :</Text>
      <Text style={styles.scoreContent}>{correctCount} / {cardsCount}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  scoreCard: {
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
  scoreContent: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  }
});