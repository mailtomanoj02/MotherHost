import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../Components/Home/Home.js';
import DomainScreen from '../Components/Domain/DomainScreen';
import InvoiceScreen from '../Components/InvoiceScreen';
import SideMenu from '../Components/SideMenu';
import WebviewScreen from '../Components/WebviewScreen.js';
import {SCREEN_NAMES} from '../Config/Constant.js';
import ServiceScreen from '../Components/ServiceScreen';
import DomainDetailScreen from '../Components/Domain/DomainDetailScreen';
import HostingScreen from '../Components/HostingScreen';
import LoginAndRegistration from '../Components/loginAndRegistration/LoginAndRegistration';
import {createStackNavigator} from '@react-navigation/stack';
import DomainNameScreen from '../Components/Domain/DomainNameScreen';
import Wallet from '../Components/Wallet';
import DomainAvailabilityScreen from '../Components/DomainAvailabilityScreen';
import CouponsScreen from '../Components/CouponsScreen';
const DomainStack = createStackNavigator();
const RootStack = createStackNavigator();

const DomainStackNavigator = () => {
  return (
    <DomainStack.Navigator screenOptions={{headerShown: false}}>
      <DomainStack.Screen
        name={SCREEN_NAMES.DOMAIN_SCREEN}
        component={DomainScreen}
        options={{title: ''}}
      />
      <DomainStack.Screen
        name={SCREEN_NAMES.DOMAIN_DETAIL_SCREEN}
        component={DomainDetailScreen}
        options={{title: ''}}
      />
    </DomainStack.Navigator>
  );
};
const RootStackScreen = () => {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen
        name={SCREEN_NAMES.DRAWER}
        component={MyDrawer}
        options={{title: ''}}
      />
    </RootStack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <SideMenu {...props} />}
      initialRouteName={SCREEN_NAMES.COUPONS}
      screenOptions={{headerShown: false, unmountOnBlur: true}}>
      <Drawer.Screen
        name={SCREEN_NAMES.HOME_SCREEN}
        component={HomeScreen}
        options={{unmountOnBlur: false}}
      />
      <Drawer.Screen
        name={SCREEN_NAMES.DOMAIN_STACK_SCREEN}
        component={DomainStackNavigator}
      />
      <Drawer.Screen
        name={SCREEN_NAMES.WEBVIEW_SCREEN}
        component={WebviewScreen}
      />
      <Drawer.Screen
        name={SCREEN_NAMES.INVOICE_SCREEN}
        component={InvoiceScreen}
      />
      <Drawer.Screen
        name={SCREEN_NAMES.SERVICE_SCREEN}
        component={ServiceScreen}
      />
      <Drawer.Screen
        name={SCREEN_NAMES.HOSTING_SCREEN}
        component={HostingScreen}
      />
      <Drawer.Screen
        name={SCREEN_NAMES.LOGIN_REGISTRATION}
        component={LoginAndRegistration}
      />
      <Drawer.Screen
        name={SCREEN_NAMES.DOMAIN_NAME_SCREEN}
        component={DomainNameScreen}
      />
      <Drawer.Screen name={SCREEN_NAMES.WALLET} component={Wallet} />
      <Drawer.Screen
        name={SCREEN_NAMES.DOMAIN_AVAILABILITY}
        component={DomainAvailabilityScreen}
      />
      <Drawer.Screen name={SCREEN_NAMES.COUPONS} component={CouponsScreen} />
    </Drawer.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};

export default MainNavigator;
