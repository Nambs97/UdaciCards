import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeTab from './HomeTab';
import DeckHome from '../components/DeckHome';
import NewCard from '../components/NewCard';
import Quiz from '../components/Quiz';

const Stack = createStackNavigator();

export default function DeckListStack() {
  return (
    <Stack.Navigator initialRouteName='HomeTab'>
      <Stack.Screen 
        name="HomeTab" 
        options={{headerShown: false, title: 'Decks'}} 
        component={HomeTab} 
      />
      <Stack.Screen 
        name="DeckHome"
        options={({ route }) => ({ title: route.params.deck.title })}
        component={DeckHome} 
      />
      <Stack.Screen 
        name="NewCard"
        options={({ route }) => ({ title: 'Add Card on ' + route.params.deckTitle })}
        component={NewCard} 
      />
      <Stack.Screen 
        name="Quiz"
        options={({ route }) => ({ title: 'Quiz on ' + route.params.deckTitle })}
        component={Quiz} 
      />
    </Stack.Navigator>
  );
}


