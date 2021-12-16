import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from "react-redux";
import { createStore } from "redux";

// You can import from local files
import reducer from "./reducers";
import middleware from "./middleware";
import DeckListStack from './routes/DeckListStack';
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import { setLocalNotification } from './utils/helpers';


export default function App() {

  const store = createStore(reducer, middleware);

  useEffect(() => {
    setLocalNotification()
  }, []);
  
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer>
          <DeckListStack />
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  }
});
