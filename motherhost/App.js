/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigation from '../motherhost/src/Navigator/AppNavigation.js';
import {Store} from './src/redux/store';
import {Provider} from 'react-redux';
const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={Store}>
        <AppNavigation />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
