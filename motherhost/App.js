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
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from './src/Components/customUI/FlashMessageComponent';
import {renderFlashMessageIcon} from './src/Components/customUI/FlashMessageComponent/FlashMessage';
import styles from './src/Components/customUI/FlashMessageComponent/FlashMessageStyle';
const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={Persistor}>
          <AppNavigation />
          <FlashMessage
            position="top"
            floating={true}
            style={styles.flashMessageStyle}
            renderFlashMessageIcon={renderFlashMessageIcon}
          />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
