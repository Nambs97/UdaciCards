import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

function DeckHome(props) {
  const { navigation } = props;
  const { deck } = props.route.params;
  
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.decktitle}>{deck.title}</Text>
        <Text style={styles.deckcards}>{deck.cards.length} cards</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('NewCard', {
          deckId: deck.id,
          deckTitle: deck.title
        })}>
          <Text style={styles.secondaryButton}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={deck.cards.length === 0} onPress={() => navigation.navigate('Quiz', {
          deckId: deck.id,
          deckTitle: deck.title
        })}>
          <Text style={deck.cards.length === 0 ? styles.disabledPrimaryButton : styles.primaryButton}>Start a Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignContent: 'center',
    padding: 20,
    backgroundColor: '#ecf0f1'
  },
  decktitle: {
    color: '#768fff',
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 5
  },
  deckcards: {
    textAlign: 'center',
    fontSize: 30,
    color: '#666',
    fontWeight: 'bold',
    marginBottom: 10
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
  disabledPrimaryButton: {
    textAlign: 'center',
    backgroundColor: '#768fff',
    color: 'white',
    fontWeight: 700,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#768fff',
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
  }
});

export default connect()(DeckHome);