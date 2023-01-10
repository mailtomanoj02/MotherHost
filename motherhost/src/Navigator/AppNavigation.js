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
import ServiceScreen from '../Components/ServiceScreen';
import {connect} from 'react-redux';
import DomainDetailScreen from '../Components/DomainDetailScreen';
import {Text, View} from 'react-native';
const Stack = createNativeStackNavigator();

const DomainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={SCREEN_NAMES.DOMAIN_SCREEN}
        component={DomainScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name={SCREEN_NAMES.DOMAIN_DETAIL_SCREEN}
        component={DomainDetailScreen}
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

function MyDrawer(props) {
  return (
    <View style={{flex: 1}}>
      {props.isLoader ? <Text>LOADING</Text> : null}
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={props => <SideMenu {...props} />}
          initialRouteName={SCREEN_NAMES.HOME_SCREEN}
          screenOptions={{headerShown: false}}>
          <Drawer.Screen
            name={SCREEN_NAMES.HOME_SCREEN}
            component={HomeScreen}
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
            options={{title: ''}}
          />
          <Drawer.Screen
            name={SCREEN_NAMES.SERVICE_SCREEN}
            component={ServiceScreen}
            options={{title: ''}}
          />
        </Drawer.Navigator>
      </NavigationContainer>
      </View>
  );
}

const mapStateToProps = state => {
  return {
    isLoader: state.isLoading,
  };
};

export default connect(mapStateToProps, null)(MyDrawer);
