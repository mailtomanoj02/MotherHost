import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import HomeUserTrackingView from '../Home/HomeUserTrackingView.js';
import DomainHomeView from '../Home/DomainHomeView.js';
import WebsiteHostingHomeView from '../Home/WebsiteHostingHomeView.js';
import Colors from '../../Themes/Colors.js';
import {FONT_FAMILY, SCREEN_NAMES} from '../../Config/Constant.js';
import {ScrollView} from 'react-native-gesture-handler';
import AppBar from '../AppBar.js';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {fetchAPIAction} from '../../redux/Action';
import {useDispatch, useSelector} from 'react-redux';
import {isValidElement} from '../../utils/Helper';
import {isUserLoggedIn} from '../../utils/Utils';
const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const homeWithoutLoginData = useSelector(state => state.pricingData);
  let params = {
    action: 'GetTLDPricing',
    tld: 'com,net,in,co.in,uk,us,org',
    currency: '1',
    year: 1,
  };
  useEffect(() => {
    dispatch(fetchAPIAction('gettldprice.php', params));
  }, []);
  const userTrackingView = () => {
    return (
      <View style={{flexDirection: 'column'}}>
        <View style={{flexDirection: 'row'}}>
          <HomeUserTrackingView
            title={'Services'}
            count={'0'}
            img={require('../../Images/Home/servers.png')}
            screenName={SCREEN_NAMES.SERVICE_SCREEN}
            navigation={navigation}
          />
          <HomeUserTrackingView
            title={'Domains'}
            count={'0'}
            img={require('../../Images/Home/domain.png')}
            screenName={SCREEN_NAMES.DOMAIN_STACK_SCREEN}
            navigation={navigation}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <HomeUserTrackingView
            title={'Tickets'}
            count={'0'}
            img={require('../../Images/Home/tickets.png')}
            screenName={SCREEN_NAMES.HOME_SCREEN}
            navigation={navigation}
          />
          <HomeUserTrackingView
            title={'Invoice'}
            count={'0'}
            img={require('../../Images/Home/invoices.png')}
            screenName={SCREEN_NAMES.INVOICE_SCREEN}
            navigation={navigation}
          />
        </View>
      </View>
    );
  };
  const domainInView = () => {
    let priceList = isValidElement(homeWithoutLoginData)
      ? homeWithoutLoginData
      : '';
    let comPrice = isValidElement(priceList[0]?.com.register)
      ? priceList[0].com.register
      : '';
    let netPrice = isValidElement(priceList[1]?.net.register)
      ? priceList[1].net.register
      : '';
    let inPrice = isValidElement(priceList[2]?.in.register)
      ? priceList[2].in.register
      : '';
    return (
      <View style={{flexDirection: 'row', margin: 5}}>
        <DomainHomeView
          img={require('../../Images/Home/domain_in.png')}
          color={Colors.HOME_IN_COLOR}
          price={inPrice}
        />
        <DomainHomeView
          img={require('../../Images/Home/domain_com.png')}
          color={Colors.HOME_COM_COLOR}
          price={comPrice}
        />
        <DomainHomeView
          img={require('../../Images/Home/domain_net.png')}
          color={Colors.HOME_NET_COLOR}
          price={netPrice}
        />
      </View>
    );
  };
  const websiteHostingView = () => {
    return (
      <View style={homeStyle.websiteHostinViewStyle}>
        <WebsiteHostingHomeView
          img={require('../../Images/Home/static.png')}
          imgStyle={homeStyle.websiteHostinViewStyleImgStyle1}
          title={'Static'}
          price={'25/m'}
        />
        <WebsiteHostingHomeView
          img={require('../../Images/Home/wordpress.png')}
          imgStyle={homeStyle.websiteHostinViewStyleImgStyle1}
          title={'Wordpress'}
          price={'399/m'}
        />
        <WebsiteHostingHomeView
          img={require('../../Images/Home/linux.png')}
          imgStyle={homeStyle.websiteHostinViewStyleImgStyle1}
          title={'Linux'}
          price={'299/m'}
        />
        <WebsiteHostingHomeView
          img={require('../../Images/Home/windows.png')}
          imgStyle={homeStyle.websiteHostinViewStyleImgStyle1}
          title={'Windows'}
          price={'299/m'}
        />
      </View>
    );
  };
  const resellerHostingHomeView = () => {
    const SCREEN_TITLE = {
      LINUX_MULTI_DOMAIN: 'Linux Multi Domain Hosting',
      WINDOWS_MULTI_DOMAIN: 'Windows Multi Domain Hosting',
      LINUX_RESELLER: 'Linux Reseller Hosting',
      WINDOWS_RESELLER: 'Windows Reseller Hosting',
    };
    return (
      <View>
        <View style={homeStyle.websiteHostinViewStyle}>
          <WebsiteHostingHomeView
            img={require('../../Images/Home/linuxlogo.png')}
            imgStyle={homeStyle.websiteHostinViewStyleImgStyle1}
            title={SCREEN_TITLE.LINUX_MULTI_DOMAIN}
            price={'499/m'}
            navigation={navigation}
          />
          <WebsiteHostingHomeView
            img={require('../../Images/Home/windowslogo.png')}
            imgStyle={homeStyle.websiteHostinViewStyleImgStyle1}
            title={SCREEN_TITLE.WINDOWS_MULTI_DOMAIN}
            price={'499/m'}
            navigation={navigation}
          />
        </View>
        <View style={homeStyle.websiteHostinViewStyle}>
          <WebsiteHostingHomeView
            img={require('../../Images/Home/linuxlogo.png')}
            imgStyle={homeStyle.websiteHostinViewStyleImgStyle1}
            title={SCREEN_TITLE.LINUX_RESELLER}
            price={'999/m'}
            navigation={navigation}
          />
          <WebsiteHostingHomeView
            img={require('../../Images/Home/windowslogo.png')}
            imgStyle={homeStyle.websiteHostinViewStyleImgStyle1}
            title={SCREEN_TITLE.WINDOWS_RESELLER}
            price={'999/m'}
            navigation={navigation}
          />
        </View>
      </View>
    );
  };
  const emailForBusinessView = () => {
    return (
      <View style={homeStyle.websiteHostinViewStyle}>
        <WebsiteHostingHomeView
          img={require('../../Images/Home/SmarterMail_logo.png')}
          imgStyle={homeStyle.websiteHostinViewStyleImgStyle2}
          title={'Smartermail pro'}
          price={'22/m'}
        />
        <WebsiteHostingHomeView
          img={require('../../Images/Home/gsuite-logo.png')}
          imgStyle={homeStyle.websiteHostinViewStyleImgStyle1}
          title={'Google Workspace'}
          price={'115/m'}
        />
      </View>
    );
  };
  const securityView = () => {
    return (
      <View>
        <View style={homeStyle.websiteHostinViewStyle}>
          <WebsiteHostingHomeView
            img={require('../../Images/Home/DigiCertlue.png')}
            imgStyle={homeStyle.websiteHostinViewStyleImgStyle2}
            title={'SSL'}
            price={'1500/yr'}
          />
          <WebsiteHostingHomeView
            img={require('../../Images/Home/spamexperts.png')}
            imgStyle={homeStyle.websiteHostinViewStyleImgStyle2}
            title={'Spam Experts'}
            price={'385/m'}
          />
        </View>
        <View style={homeStyle.websiteHostinViewStyle}>
          <WebsiteHostingHomeView
            img={require('../../Images/Home/sitelock.png')}
            imgStyle={homeStyle.websiteHostinViewStyleImgStyle2}
            title={'Site Lock'}
            price={'385/m'}
          />
          <WebsiteHostingHomeView
            img={require('../../Images/Home/codeguard-logo.png')}
            imgStyle={homeStyle.websiteHostinViewStyleImgStyle2}
            title={'CodeGuard'}
            price={'215/m'}
          />
        </View>
      </View>
    );
  };
  const hostHeder = title => {
    return (
      <View style={homeStyle.titleContainer}>
        <Text style={homeStyle.titleStyle}>{title}</Text>
      </View>
    );
  };

  const RenderAllComponents = () => {
    return (
      <ScrollView>
        <View>
          {isUserLoggedIn() ? userTrackingView() : null}
          {domainInView()}
          {hostHeder('Web Site Hosting')}
          {websiteHostingView()}
          {hostHeder('Reseller Hosting')}
          {resellerHostingHomeView()}
          {hostHeder('Email For Business')}
          {emailForBusinessView()}
          {hostHeder('Security')}
          {securityView()}
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={{flex: 1}}>
      <AppBar
        image={require('./../../Images/AppBar/hamburger.png')}
        onPress={'toggleDrawer'}
      />
      <RenderAllComponents />
    </View>
  );
};

const homeStyle = StyleSheet.create({
  titleContainer: {
    padding: 10,
    borderBottomColor: Colors.black,
    borderBottomWidth: 0.4,
  },
  titleStyle: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.REGULAR,
    color: Colors.black,
  },
  websiteHostinViewStyle: {
    flexDirection: 'row',
    margin: 5,
  },
  websiteHostinViewStyleImgStyle1: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  websiteHostinViewStyleImgStyle2: {
    height: 50,
    width: 90,
    resizeMode: 'contain',
  },
  websiteHostinViewStyleImgStyle3: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
});

export default HomeScreen;
