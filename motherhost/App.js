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
import {Persistor, Store} from './src/redux/store';
import {Provider, useSelector} from 'react-redux';
import Toast from './src/Components/Toast';
import {PersistGate} from 'redux-persist/integration/react';
const App = () => {

  return (
    <SafeAreaProvider>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={Persistor}>
          <AppNavigation />
        </PersistGate>
      </Provider>

      {/*<Toast />*/}
    </SafeAreaProvider>
  );
};

export default App;
