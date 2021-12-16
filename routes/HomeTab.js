import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DeckList from '../components/DeckList';
import NewDeck from '../components/NewDeck';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function HomeTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Decks"  
        options={
          { 
            title: 'Decks',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="file-tray-stacked-outline" color={color} size={size} />
            )
          }
        } 
        component={DeckList} 
      />
      <Tab.Screen 
        name="NewDeck" 
        options={
          { 
            title: 'New Deck',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle-outline" color={color} size={size} />
              )
          }
        } 
        component={NewDeck} 
      />
    </Tab.Navigator>
  )
}