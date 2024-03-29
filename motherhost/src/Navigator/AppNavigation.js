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
import InvoiceDetailScreen from '../Components/InvoiceDetailScreen';
import CheckoutPage from '../Components/CheckoutPage';
import TicketList from '../Components/TicketList.js';
import AddTicket from '../Components/AddTicket.js';
import Authentication from '../Components/Authentication/Authentication';
import {useSelector} from 'react-redux';
import {isUserLoggedIn} from '../utils/Utils';
import WhoIsLookUp from '../Components/Lookup/WhoIsLookUp.js';
const DomainStack = createStackNavigator();
const InvoiceStack = createStackNavigator();
const RootStack = createStackNavigator();
const HoistingStack = createStackNavigator();
const TicketStack = createStackNavigator();

const DomainStackNavigator = () => {
  return (
    <DomainStack.Navigator screenOptions={{headerShown: false}}>
      <DomainStack.Screen
        name={SCREEN_NAMES.DOMAIN_SCREEN}
        component={DomainScreen}
      />
      <DomainStack.Screen
        name={SCREEN_NAMES.DOMAIN_DETAIL_SCREEN}
        component={DomainDetailScreen}
      />
    </DomainStack.Navigator>
  );
};

const InvoiceStackNavigator = () => {
  return (
    <InvoiceStack.Navigator screenOptions={{headerShown: false}}>
      <InvoiceStack.Screen
        name={SCREEN_NAMES.INVOICE_SCREEN}
        component={InvoiceScreen}
      />
      <InvoiceStack.Screen
        name={SCREEN_NAMES.INVOICE_DETAIL_SCREEN}
        component={InvoiceDetailScreen}
      />
    </InvoiceStack.Navigator>
  );
};

const TicketStackNavigator = () => {
  return (
    <TicketStack.Navigator screenOptions={{headerShown: false}}>
      <TicketStack.Screen name={SCREEN_NAMES.TICKETS} component={TicketList} />
      <TicketStack.Screen
        name={SCREEN_NAMES.ADD_TICKETS}
        component={AddTicket}
      />
    </TicketStack.Navigator>
  );
};
const HoistingStackNavigator = () => {
  return (
    <HoistingStack.Navigator screenOptions={{headerShown: false}}>
      <HoistingStack.Screen
        name={SCREEN_NAMES.HOSTING_SCREEN}
        component={HostingScreen}
      />
      <HoistingStack.Screen
        name={SCREEN_NAMES.DOMAIN_NAME_SCREEN}
        component={DomainNameScreen}
      />
      <HoistingStack.Screen
        name={SCREEN_NAMES.CHECKOUT}
        component={CheckoutPage}
        // options={{unmountOnBlur: false}}
      />
      <HoistingStack.Screen
        name={SCREEN_NAMES.LOGIN_REGISTRATION}
        component={LoginAndRegistration}
        // options={{unmountOnBlur: false}}
      />
    </HoistingStack.Navigator>
  );
};

const RootStackScreen = () => {
  const isUserAuthenticated = useSelector(state => state.isUserAuthenticated);
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {!isUserAuthenticated && isUserLoggedIn() ? (
        <RootStack.Screen
          name={SCREEN_NAMES.AUTH_SCREEN}
          component={Authentication}
          options={{title: '', unmountOnBlur: true}}
          presentation={'transparentModal'}
        />
      ) : null}

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
      initialRouteName={
        isUserLoggedIn()
          ? SCREEN_NAMES.HOME_SCREEN
          : SCREEN_NAMES.LOGIN_REGISTRATION
      }
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
        name={SCREEN_NAMES.INVOICE_STACK}
        component={InvoiceStackNavigator}
      />
      <Drawer.Screen
        name={SCREEN_NAMES.TICKETS_STACK}
        component={TicketStackNavigator}
      />
      <Drawer.Screen
        name={SCREEN_NAMES.SERVICE_SCREEN}
        component={ServiceScreen}
      />
      <Drawer.Screen
        name={SCREEN_NAMES.HOSTING_STACK}
        component={HoistingStackNavigator}
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
      <Drawer.Screen
        name={SCREEN_NAMES.CHECKOUT}
        component={CheckoutPage}
        // options={{unmountOnBlur: false}}
      />
      <Drawer.Screen
        name={SCREEN_NAMES.LOGIN_REGISTRATION}
        component={LoginAndRegistration}
        initialParams={{isFromRegister: false, isFromLogin: true}}
      />
      <Drawer.Screen
        name={SCREEN_NAMES.WHO_IS_LOOKUP}
        component={WhoIsLookUp}
        initialParams={{screenName: SCREEN_NAMES.WHO_IS_LOOKUP}}
      />
      <Drawer.Screen
        name={SCREEN_NAMES.DNS_LOOKUP}
        component={WhoIsLookUp}
        initialParams={{screenName: SCREEN_NAMES.DNS_LOOKUP}}
      />
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
