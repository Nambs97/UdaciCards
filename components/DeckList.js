import React, { useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from "react-redux";
import { handleReceiveDecks } from "../actions/decks";
import { handleReceiveCards } from "../actions/cards";
import DeckItem from './DeckItem';


function DeckList(props) {
  const { decks, deckIds, cards, cardIds, navigation } = props;

  useEffect(() => {
    props.dispatch(handleReceiveDecks());
    props.dispatch(handleReceiveCards());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Deck</Text>
      <ScrollView>
        {deckIds.map(deckId => (
          <TouchableOpacity onPress={() => navigation.navigate('DeckHome', {deck: decks[deckId]})}>
            <DeckItem deck={decks[deckId]} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ecf0f1'
  },
  title:  {
    color: '#768fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15
  }
});

const mapStateToProps = ({ decks, cards }) => {
  return {
    decks,
    cards,
    deckIds: Object.keys(decks),
    cardIds: Object.keys(cards)
  }
}

export default connect(mapStateToProps)(DeckList);