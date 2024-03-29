import * as React from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Linking,
  Share,
  Alert,
} from 'react-native';
import {
  FONT_FAMILY,
  SCREEN_NAMES,
  WEBPAGE_REDIRECT_LINK,
} from '../Config/Constant';
import Colors from '../Themes/Colors';
import {useNavigation} from '@react-navigation/native';
import {getUserName, isUserLoggedIn} from '../utils/Utils';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {LOGIN_API_DATA_SUCCESS} from '../redux/Type';
import colors from '../Themes/Colors';
import DeviceInfo from 'react-native-device-info';
const SideMenu = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleConfirm = () => {
    dispatch({type: LOGIN_API_DATA_SUCCESS, loginData: null});
    navigation.reset({
      index: 0,
      routes: [{name: SCREEN_NAMES.LOGIN_REGISTRATION}],
    });
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };
  const LoginDrawerData = [
    {
      icon: require('../Images/Home/domain.png'),
      title: 'My Domains',
      screen: SCREEN_NAMES.DOMAIN_STACK_SCREEN,
    },
    {
      icon: require('../Images/Home/servers.png'),
      title: 'My Services',
      screen: SCREEN_NAMES.SERVICE_SCREEN,
    },
    {
      icon: require('../Images/Home/invoices.png'),
      title: 'My Invoices',
      screen: SCREEN_NAMES.INVOICE_STACK,
    },
  ];

  let SideDrawerItems = [
    {
      icon: require('../Images/Drawer/about-us.png'),
      title: 'Whois Lookup',
      screen: SCREEN_NAMES.WHO_IS_LOOKUP,
    },
    {
      icon: require('../Images/Drawer/about-us.png'),
      title: 'DNS Lookup',
      screen: SCREEN_NAMES.DNS_LOOKUP,
    },
    {
      icon: require('../Images/Drawer/about-us.png'),
      title: 'About us',
      screen: SCREEN_NAMES.WEBVIEW_SCREEN,
    },
    {
      icon: require('../Images/Drawer/privacy.png'),
      title: 'Privacy Policy',
      screen: SCREEN_NAMES.WEBVIEW_SCREEN,
    },
    {
      icon: require('../Images/Drawer/terms.png'),
      title: 'Terms & Conditions',
      screen: SCREEN_NAMES.WEBVIEW_SCREEN,
    },
    {
      icon: require('../Images/Drawer/whatsapp.png'),
      title: 'Whatsapp Support',
      screen: SCREEN_NAMES.WEBVIEW_SCREEN,
    },
    {
      icon: require('../Images/Drawer/share.png'),
      title: 'Share',
      screen: SCREEN_NAMES.WEBVIEW_SCREEN,
    },
  ];
  const onShare = async () => {
    try {
      const url =
        '\n\niOS: https://apps.apple.com/us/app/motherhost/id1577482366 \n Android: https://play.google.com/store/apps/details?id=com.motherhost.webhosting';
      const result = await Share.share({
        message:
          'Hello, Checkout this reliable Hosting Provider in India.' + url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const onHandleItemClicked = item => {
    let params = {};
    if (item.title === 'About us') {
      params.weburl = WEBPAGE_REDIRECT_LINK.ABOUT_US;
    } else if (item.title === 'Privacy Policy') {
      params.weburl = WEBPAGE_REDIRECT_LINK.PRIVACY_POLICY;
    } else if (item.title === 'Terms & Conditions') {
      params.weburl = WEBPAGE_REDIRECT_LINK.TERMS_CONDITIONS;
    } else if (item.title === 'Whatsapp Support') {
      Linking.openURL(WEBPAGE_REDIRECT_LINK.WHATSAPP_LINK);
      return;
    } else if (item.title === 'Share') {
      onShare();
      return;
    } else {
    }
    navigation.navigate(item.screen, params);
  };

  const loggInView = () => {
    let userName = getUserName();
    return <Text style={styles.txtStyle}>{userName}</Text>;
  };
  const logoutView = () => {
    return (
      <View>
        <Text style={styles.txtStyle}>You are not logged in!</Text>
        <View style={styles.logoutViewStyle}>
          <TouchableOpacity
            style={styles.pressableStyle}
            onPress={() =>
              navigation.navigate(SCREEN_NAMES.LOGIN_REGISTRATION, {
                isFromRegister: true,
                isFromLogin: false,
              })
            }>
            <Text style={styles.pressableTextStyle}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pressableStyle}
            onPress={() =>
              navigation.navigate(SCREEN_NAMES.LOGIN_REGISTRATION, {
                isFromRegister: false,
                isFromLogin: true,
              })
            }>
            <Text style={styles.pressableTextStyle}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const RenderSideMenuItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => onHandleItemClicked(item)}
        style={styles.menuContainer}>
        <Image style={styles.menuItemIcon} source={item.icon} />
        <Text style={styles.menuItemTxt}>{item.title}</Text>
      </TouchableOpacity>
    );
  };
  const LogoutModal = ({visible, onClose, onConfirm}) => {
    return (
      <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
        onRequestClose={onClose}>
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <Text style={styles.text}>Are you sure you want to logout?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={onClose} style={styles.button}>
                <Text style={[styles.buttonText, {color: colors.headerBlue}]}>
                  No
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onConfirm} style={styles.button}>
                <Text style={[styles.buttonText, {color: colors.headerBlue}]}>
                  Yes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const LoadDrawerItems = () => {
    return (
      <FlatList
        data={
          isUserLoggedIn()
            ? LoginDrawerData.concat(SideDrawerItems)
            : SideDrawerItems
        }
        renderItem={({item}) => <RenderSideMenuItem item={item} />}
      />
    );
  };

  return (
    <View style={styles.rootContainerStyle}>
      <View>
        <View style={styles.headerViewContainer}>
          <Image
            style={styles.logoStyle}
            source={require('../Images/Logo/Symbol-Logo.png')}
          />
          {isUserLoggedIn() ? loggInView() : logoutView()}
        </View>
        <LoadDrawerItems />
        {isUserLoggedIn() ? (
          <TouchableOpacity
            style={styles.menuContainer}
            onPress={() => setShowModal(true)}>
            <Image
              source={require('../Images/Drawer/logout.png')}
              style={styles.menuItemIcon}
            />
            <Text style={styles.menuItemTxt}>Logout</Text>
          </TouchableOpacity>
        ) : null}
        <LogoutModal
          visible={showModal}
          onConfirm={handleConfirm}
          onClose={handleClose}
        />
      </View>
      <View style={styles.versionView}>
        <Text style={styles.versionTextStyle}>
          Ver {DeviceInfo.getVersion()} ({DeviceInfo.getBuildNumber()})
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainerStyle: {flex: 1},
  headerViewContainer: {
    backgroundColor: Colors.headerBlue,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoStyle: {
    backgroundColor: Colors.headerBlue,
    width: 45,
    height: 45,
    marginTop: 35,
    marginBottom: 10,
  },
  logoutViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignContent: 'stretch',
  },
  txtStyle: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: 16,
    color: Colors.white,
    textAlign: 'center',
  },
  pressableStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    padding: 5,
    borderRadius: 4,
    backgroundColor: Colors.white,
    margin: 3,
  },
  pressableTextStyle: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: FONT_FAMILY.REGULAR,
    letterSpacing: 0.25,
    color: Colors.headerBlue,
  },
  menuContainer: {
    flexDirection: 'row',
    margin: 5,
    padding: 5,
    borderBottomColor: Colors.headerBlue,
    borderBottomWidth: 0.1,
  },
  menuItemIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: Colors.headerBlue,
  },
  menuItemTxt: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: 15,
    color: Colors.headerBlue,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: Colors.BORDER_TITLE,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.BOLD,
  },
  versionView: {
    flex: 1,
    alignContent: 'flex-end',
    margin: 25,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  versionTextStyle: {
    flex: 1,
    fontSize: 12,
    fontFamily: FONT_FAMILY.REGULAR,
    textAlign: 'center',
  },
});

export default SideMenu;
