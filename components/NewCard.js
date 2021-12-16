import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { handleAddCardToDeck } from '../actions/cards';

function NewCard(props) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const { deckId } = props.route.params;
  const { dispatch, navigation, deck } = props;

  const handleCardSubmit = () => {
    dispatch(handleAddCardToDeck(question, answer, deckId))
    .then(() => {
      setQuestion('');
      setAnswer('');
    });
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TextInput value={question}
          onChangeText={(question) => setQuestion(question)} 
          style={styles.input} 
          placeholder='Type Question...' />
        <TextInput value={answer} 
          onChangeText={(answer) => setAnswer(answer)}
          style={styles.input} 
          placeholder='Type Answer...' />
        
        <TouchableOpacity 
          disabled={answer === '' || question === ''}
          onPress={handleCardSubmit}
        >
          <Text style={answer === '' || question === '' ?styles.disabledPrimaryButton : styles.primaryButton}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('DeckHome', {deck: deck})}>
          <Text style={styles.secondaryButton}>Back to Deck</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ecf0f1'
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
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderColor: 'darkgray',
    padding: 10,
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

const mapStateToProps = ({decks}, {route}) => {
  const { deckId } = route.params;
  return {
    deck: decks[deckId]
  }
}

export default connect(mapStateToProps)(NewCard);