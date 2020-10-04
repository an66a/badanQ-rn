
import React from 'react';
import { store } from './src/store';
import { Provider } from 'react-redux';
import MainApp from './src/screens/MainApp';
import 'react-native-gesture-handler';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer'])

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  )
}

export default App
