import React from 'react';
import { store } from './src/store';
import { Provider } from 'react-redux';
import MainApp from './src/screens/MainApp';
import 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
LogBox.ignoreLogs(['Setting a timer'])

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <MainApp />
      </Provider>
    </NavigationContainer>
  )
}

export default App
