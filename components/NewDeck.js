import React, { useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView, View, Text, TextInput, Button, TouchableOpacity,  StyleSheet } from 'react-native';
import { connect } from "react-redux";
import { handleCreateDeck } from '../actions/decks';

function NewDeck(props) {
  const [title, setTitle] = useState('');
  const { dispatch, navigation, decks } = props;
  
  const [deckCreated, setDeckCreated] = useState(false);

  if (deckCreated && JSON.stringify(decks.filter(deck => deck.title === title)[0]) !== undefined) {
    const deckObject = decks.filter(deck => deck.title === title)[0];
    setTitle('');
    navigation.navigate('DeckHome', {deck: deckObject});
  }

  const handleDeckSubmit = () => {
    dispatch(handleCreateDeck(title));

    setDeckCreated(true);
    //navigation.navigate('Decks');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What is the title of your new deck ?</Text>
      <TextInput value={title}
        onChangeText={(title) => setTitle(title)} 
        style={styles.input} 
        placeholder='Deck Title...' />
      <TouchableOpacity 
        disabled={title === ''} 
        onPress={handleDeckSubmit}
      >
        <Text style={title === '' ? styles.disabledPrimaryButton : styles.primaryButton }>Create Deck</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
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
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: 'darkgray',
    padding: 10,
    marginBottom: 20
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
  }
});

const mapStateToProps = ({decks}) => {
  return {
    decks: Object.values(decks)
  }
}

export default connect(mapStateToProps)(NewDeck);