import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../Components/Home/Home.js';
import DomainScreen from '../Components/DomainScreen';
import InvoiceScreen from '../Components/InvoiceScreen';
import SideMenu from '../Components/SideMenu';
import WebviewScreen from '../Components/WebviewScreen.js';
import {SCREEN_NAMES} from '../Config/Constant.js';
const Stack = createNativeStackNavigator();

const MotherHostStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name={SCREEN_NAMES.HOME_SCREEN}
        component={HomeScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name={SCREEN_NAMES.DOMAIN_SCREEN}
        component={DomainScreen}
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <SideMenu {...props} />}
        initialRouteName={SCREEN_NAMES.HOME_SCREEN}
        screenOptions={{headerShown: false}}>
        <Drawer.Screen name={SCREEN_NAMES.HOME_SCREEN} component={HomeScreen} />
        <Drawer.Screen
          name={SCREEN_NAMES.DOMAIN_SCREEN}
          component={DomainScreen}
        />
        <Drawer.Screen
          name={SCREEN_NAMES.WEBVIEW_SCREEN}
          component={WebviewScreen}
        />
        <Stack.Screen
          name={SCREEN_NAMES.INVOICE_SCREEN}
          component={InvoiceScreen}
          options={{title: ''}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default MyDrawer;
