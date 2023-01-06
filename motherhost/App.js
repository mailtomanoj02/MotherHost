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
const App = () => {
  return (
    <SafeAreaProvider>
      <AppNavigation />
    </SafeAreaProvider>
  );
};

export default App;
