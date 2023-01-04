import { DrawerItemList } from '@react-navigation/drawer';
import * as React from 'react';
import {
    Text,
    Image,
    View,
    StyleSheet,
    Pressable,
    FlatList,
  } from 'react-native';
import { FONT_FAMILY, SCREEN_NAMES, WEBPAGE_REDIRECT_LINK } from '../Config/Constant';
import Colors from '../Themes/Colors';
import { useNavigation } from '@react-navigation/native';

const SideDrawerItems = [
    {   icon: require('../Images/Home/domain.png'), 
        title: 'My Domains', 
        screen: SCREEN_NAMES.DOMAIN_SCREEN },
    {   icon: require('../Images/Home/servers.png'), 
        title: 'My Services', 
        screen: SCREEN_NAMES.DOMAIN_SCREEN  },
    {   icon: require('../Images/Home/invoices.png'), 
        title: 'My Invoices' , 
        screen: SCREEN_NAMES.DOMAIN_SCREEN },
    {   icon: require('../Images/Drawer/about-us.png'), 
        title: 'About us', 
        screen: SCREEN_NAMES.WEBVIEW_SCREEN },
    {   icon: require('../Images/Drawer/privacy.png'), 
        title: 'Privacy Policy', 
        screen: SCREEN_NAMES.WEBVIEW_SCREEN },
    {   icon: require('../Images/Drawer/terms.png'), 
        title: 'Terms & Conditions', 
        screen: SCREEN_NAMES.WEBVIEW_SCREEN },
    {   icon: require('../Images/Drawer/chat.png'), 
        title: 'Chat Support',
        screen: SCREEN_NAMES.WEBVIEW_SCREEN  },
    {   icon: require('../Images/Drawer/whatsapp.png'), 
        title: 'Whatsapp Support', 
        screen: SCREEN_NAMES.WEBVIEW_SCREEN  },
    {   icon: require('../Images/Drawer/share.png'), 
        title: 'Share', 
        screen: SCREEN_NAMES.WEBVIEW_SCREEN  },

  ];
  const onHandleItemClicked = (item, navigation) => {
        let params = {};
        if(item.title == 'About us'){
            params.weburl = WEBPAGE_REDIRECT_LINK.ABOUT_US
        }
        else if(item.title == 'Privacy Policy'){
            params.weburl = WEBPAGE_REDIRECT_LINK.PRIVACY_POLICY
        }
        else if(item.title == 'Terms & Conditions'){
            params.weburl = WEBPAGE_REDIRECT_LINK.TERMS_CONDITIONS
        }
        else if(item.title == 'Chat Support'){
            params.weburl = WEBPAGE_REDIRECT_LINK.CHAT_SUPPORT
        }else{
            
        }
        navigation.navigate(item.screen, params)
  }
  
  const logginView = () => {
        return(
            <Text style={styles.txtStyle}>
                Hi, Ramnath! 
            </Text>
        );
  }
  const logoutView = () => {
    return(
        <View>
            <Text style={styles.txtStyle}>
                You are not logged in!
            </Text>
            <View style={styles.logoutViewStyle}>
                <Pressable style={styles.pressableStyle}> 
                    <Text style={styles.pressableTextStyle}>
                        Register
                    </Text>
                </Pressable>
                <Pressable style={styles.pressableStyle}> 
                    <Text style={styles.pressableTextStyle}>
                        Login
                    </Text>
                </Pressable>
            </View>
        </View>
    );
  }
  const RenderSideMenuItem = ({ item, navigation }) => {
    return(
    
        <Pressable 
        onPress={() => onHandleItemClicked(item, navigation)}
        style={styles.menuContainer}>
            <Image 
                style={styles.menuItemIcon}
                source={item.icon}
            />
            <Text style={styles.menuItemTxt}>{item.title}</Text>
        </Pressable>
  );
  }
  const LoadDrawerItems = ({navigation}) =>{
        return <FlatList
            data={SideDrawerItems}
            renderItem={({item})=><RenderSideMenuItem item={item} navigation={navigation}/>}
        />
  }

  const SideMenu = () => {
    const navigation = useNavigation();

        return(
            <View>
                <View style={styles.headerViewContainer}>
                    <Image
                        style={styles.logoStyle}
                        source={require('../Images/Logo/Symbol-Logo.png')}
                    />
                    {true ? logginView() : logoutView()}
                </View>
                <LoadDrawerItems navigation={navigation}/>
            </View>
        )

  }

  const styles = StyleSheet.create({
            headerViewContainer: {
                backgroundColor: Colors.headerBlue,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center'
            },
            logoStyle: {
                backgroundColor: Colors.headerBlue,
                width: 75,
                height: 75,
                marginTop: 35,
                marginBottom: 10,
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
                justifyContent:'space-between',
                padding: 10,
                alignContent:'stretch'
            },
            txtStyle: {
                fontFamily: FONT_FAMILY.REGULAR,
                fontSize: 16,
                color: Colors.white,
                textAlign: 'center'
            },
            pressableStyle: {
                alignItems: 'center',
                justifyContent: 'center',
                width: 100,
                padding: 5,
                borderRadius: 4,
                backgroundColor: Colors.white,
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
                borderBottomWidth: 0.1
              },
              menuItemIcon: {
                width: 20,
                height: 20,
                resizeMode: 'contain',
                tintColor: Colors.headerBlue
              },
              menuItemTxt: {
                fontFamily: FONT_FAMILY.REGULAR,
                fontSize: 15,
                color: Colors.headerBlue,
                marginLeft: 10
              },
    
  })

export default SideMenu;