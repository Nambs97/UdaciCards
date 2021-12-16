import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function DeckItem(props) {
  const { deck } = props;

  return (
    <View>
      <View style={styles.deckcontainer}>
        <Text style={styles.decktitle}>{deck.title}</Text>
        <Text style={styles.deckcards}>{deck.cards.length} cards</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  deckcontainer: {
    margin: 5,
    padding: 10,
    backgroundColor: '#2962ff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'lightgray',
    borderRadius: 5,
    alignItems: 'center'
  },
  decktitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  deckcards: {
    fontSize: 16,
    color: 'darkgray',
    fontWeight: 'bold'
  }
});