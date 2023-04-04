import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import HomeUserTrackingView from '../Home/HomeUserTrackingView.js';
import DomainHomeView from '../Home/DomainHomeView.js';
import WebsiteHostingHomeView from '../Home/WebsiteHostingHomeView.js';
import Colors from '../../Themes/Colors.js';
import {FONT_FAMILY, SCREEN_NAMES} from '../../Config/Constant.js';
import {ScrollView} from 'react-native-gesture-handler';
import AppBar from '../AppBar.js';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {fetchAPIAction} from '../../redux/Action';
import {useDispatch, useSelector} from 'react-redux';
import {checkIsValidDomain, isValidElement} from '../../utils/Helper';
import {getPricingData, isUserLoggedIn} from '../../utils/Utils';
import {showToastMessage} from '../customUI/FlashMessageComponent/Helper';
const HomeScreen = () => {
  let cartArrayState = useSelector(state => state.cartArrayData);
  // console.log('cartArrayState==>', cartArrayState);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [domainNameFromSearch, setDomainNameFromSearch] = useState('');
  const loginData = useSelector(state => state.loginData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let params = {
    action: 'GetTLDPricing',
    tld: 'com,net,in,co.in,uk,us,org',
    currency: '1',
    year: 1,
  };
  const SCREEN_TITLE = {
    LINUX_MULTI_DOMAIN: 'Linux Multi Domain Hosting',
    WINDOWS_MULTI_DOMAIN: 'Windows Multi Domain Hosting',
    LINUX_RESELLER: 'Linux Reseller Hosting',
    WINDOWS_RESELLER: 'Windows Reseller Hosting',
    STATIC: 'Static',
    WORDPRESS: 'Wordpress',
    LINUX: 'Linux',
    WINDOWS: 'Windows',
  };
  useEffect(() => {
    dispatch(fetchAPIAction('gettldprice.php', params));
  }, [dispatch, params]);
  const userTrackingView = () => {
    let loginList = isValidElement(loginData) ? loginData : '';
    let serviceCount = loginList?.stats?.productsnumactive;
    let domainCount = loginList?.stats?.numactivedomains;
    let ticketCount = loginList?.stats?.numactivetickets;
    let invoiceCount = loginList?.stats?.numdueinvoices;

    return (
      <View style={{flexDirection: 'column'}}>
        <View style={{flexDirection: 'row'}}>
          <HomeUserTrackingView
            title={'Services'}
            count={serviceCount}
            img={require('../../Images/Home/servers.png')}
            screenName={SCREEN_NAMES.SERVICE_SCREEN}
            navigation={navigation}
          />
          <HomeUserTrackingView
            title={'Domains'}
            count={domainCount}
            img={require('../../Images/Home/domain.png')}
            screenName={SCREEN_NAMES.DOMAIN_STACK_SCREEN}
            navigation={navigation}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <HomeUserTrackingView
            title={'Tickets'}
            count={ticketCount}
            img={require('../../Images/Home/tickets.png')}
            screenName={SCREEN_NAMES.TICKETS_STACK}
            navigation={navigation}
          />
          <HomeUserTrackingView
            title={'Invoice'}
            count={invoiceCount}
            img={require('../../Images/Home/invoices.png')}
            screenName={SCREEN_NAMES.INVOICE_STACK}
            navigation={navigation}
          />
        </View>
      </View>
    );
  };
  const domainInView = () => {
    const priceList = getPricingData();
    const comPrice = priceList.comPrice;
    const netPrice = priceList.netPrice;
    const inPrice = priceList.inPrice;
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
      <View style={homeStyle.websiteHostingViewStyle}>
        <WebsiteHostingHomeView
          img={require('../../Images/Home/static.png')}
          imgStyle={homeStyle.websiteHostingViewStyleImgStyle1}
          title={SCREEN_TITLE.STATIC}
          price={'25/m'}
          groupId={20}
          navigation={navigation}
        />
        <WebsiteHostingHomeView
          img={require('../../Images/Home/wordpress.png')}
          imgStyle={homeStyle.websiteHostingViewStyleImgStyle1}
          title={SCREEN_TITLE.WORDPRESS}
          price={'399/m'}
          groupId={29}
          navigation={navigation}
        />
        <WebsiteHostingHomeView
          img={require('../../Images/Home/linux.png')}
          imgStyle={homeStyle.websiteHostingViewStyleImgStyle1}
          title={SCREEN_TITLE.LINUX}
          price={'299/m'}
          groupId={2}
          navigation={navigation}
        />
        <WebsiteHostingHomeView
          img={require('../../Images/Home/windows.png')}
          imgStyle={homeStyle.websiteHostingViewStyleImgStyle1}
          title={SCREEN_TITLE.WINDOWS}
          price={'299/m'}
          groupId={7}
          navigation={navigation}
        />
      </View>
    );
  };
  const resellerHostingHomeView = () => {
    return (
      <View>
        <View style={homeStyle.websiteHostingViewStyle}>
          <WebsiteHostingHomeView
            img={require('../../Images/Home/linuxlogo.png')}
            imgStyle={homeStyle.websiteHostingViewStyleImgStyle1}
            title={SCREEN_TITLE.LINUX_MULTI_DOMAIN}
            price={'499/m'}
            groupId={31}
            navigation={navigation}
          />
          <WebsiteHostingHomeView
            img={require('../../Images/Home/windowslogo.png')}
            imgStyle={homeStyle.websiteHostingViewStyleImgStyle1}
            title={SCREEN_TITLE.WINDOWS_MULTI_DOMAIN}
            price={'499/m'}
            groupId={9}
            navigation={navigation}
          />
        </View>
        <View style={homeStyle.websiteHostingViewStyle}>
          <WebsiteHostingHomeView
            img={require('../../Images/Home/linuxlogo.png')}
            imgStyle={homeStyle.websiteHostingViewStyleImgStyle1}
            title={SCREEN_TITLE.LINUX_RESELLER}
            price={'999/m'}
            groupId={5}
            navigation={navigation}
          />
          <WebsiteHostingHomeView
            img={require('../../Images/Home/windowslogo.png')}
            imgStyle={homeStyle.websiteHostingViewStyleImgStyle1}
            title={SCREEN_TITLE.WINDOWS_RESELLER}
            price={'999/m'}
            groupId={11}
            navigation={navigation}
          />
        </View>
      </View>
    );
  };
  const emailForBusinessView = () => {
    return (
      <View style={homeStyle.websiteHostingViewStyle}>
        <WebsiteHostingHomeView
          img={require('../../Images/Home/SmarterMail_logo.png')}
          imgStyle={homeStyle.websiteHostingViewStyleImgStyle2}
          title={'Smartermail pro'}
          price={'22/m'}
          groupId={14}
          navigation={navigation}
        />
        <WebsiteHostingHomeView
          img={require('../../Images/Home/gsuite-logo.png')}
          imgStyle={homeStyle.websiteHostingViewStyleImgStyle1}
          title={'Google Workspace'}
          price={'115/m'}
          groupId={30}
          navigation={navigation}
        />
      </View>
    );
  };
  const securityView = () => {
    return (
      <View>
        <View style={homeStyle.websiteHostingViewStyle}>
          <WebsiteHostingHomeView
            img={require('../../Images/Home/DigiCertlue.png')}
            imgStyle={homeStyle.websiteHostingViewStyleImgStyle2}
            title={'SSL'}
            price={'1500/yr'}
            groupId={22}
            navigation={navigation}
          />
          <WebsiteHostingHomeView
            img={require('../../Images/Home/spamexperts.png')}
            imgStyle={homeStyle.websiteHostingViewStyleImgStyle2}
            title={'Spam Experts'}
            price={'385/m'}
            groupId={23}
            navigation={navigation}
          />
        </View>
        <View style={homeStyle.websiteHostingViewStyle}>
          <WebsiteHostingHomeView
            img={require('../../Images/Home/sitelock.png')}
            imgStyle={homeStyle.websiteHostingViewStyleImgStyle2}
            title={'Site Lock'}
            price={'385/m'}
            groupId={24}
            navigation={navigation}
          />
          <WebsiteHostingHomeView
            img={require('../../Images/Home/codeguard-logo.png')}
            imgStyle={homeStyle.websiteHostingViewStyleImgStyle2}
            title={'CodeGuard'}
            price={'215/m'}
            groupId={25}
            navigation={navigation}
          />
        </View>
      </View>
    );
  };
  const hostHeader = title => {
    return (
      <View style={homeStyle.titleContainer}>
        <Text style={homeStyle.titleStyle}>{title}</Text>
      </View>
    );
  };

  const searchView = () => {
    let params = {
      action: 'DomainWhois',
      domain: domainNameFromSearch.replace(/ /g, ''),
    };
    const onPress = () => {
      if (checkIsValidDomain(domainNameFromSearch)) {
        dispatch(fetchAPIAction('whois.php', params));
        navigation.navigate(SCREEN_NAMES.DOMAIN_AVAILABILITY, {
          domainName: domainNameFromSearch,
        });
        setDomainNameFromSearch('');
      } else {
        showToastMessage('Please enter a valid domain', Colors.RED);
      }
    };
    return (
      <View style={{backgroundColor: Colors.headerBlue}}>
        <View style={homeStyle.searchViewStyle}>
          <TextInput
            style={homeStyle.searchInputTextStyle}
            placeholder={'Search your domain. ex: mo therhost.com'}
            placeholderTextColor={Colors.DARK_GREY}
            onChangeText={value => setDomainNameFromSearch(value)}
            value={domainNameFromSearch}
            autoCapitalize={false}
          />
          <TouchableOpacity
            style={{
              backgroundColor: Colors.ORANGE,
              flex: 0.1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              height: 40,
            }}
            onPress={onPress}>
            <Image
              source={require('./../../Images/Home/search.png')}
              style={{height: 20, width: 20}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const RenderAllComponents = () => {
    return (
      <ScrollView>
        <View>
          {isUserLoggedIn() ? userTrackingView() : null}
          {domainInView()}
          {hostHeader('Web Site Hosting')}
          {websiteHostingView()}
          {hostHeader('Reseller Hosting')}
          {resellerHostingHomeView()}
          {hostHeader('Email For Business')}
          {emailForBusinessView()}
          {hostHeader('Security')}
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
      {searchView()}
      {RenderAllComponents()}
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
  websiteHostingViewStyle: {
    flexDirection: 'row',
    margin: 5,
  },
  websiteHostingViewStyleImgStyle1: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  websiteHostingViewStyleImgStyle2: {
    height: 50,
    width: 90,
    resizeMode: 'contain',
  },
  websiteHostingViewStyleImgStyle3: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  searchViewStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 8,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  searchInputTextStyle: {
    height: 40,
    flex: 0.9,
    marginHorizontal: 10,
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: 14,
    color:Colors.black
  },
});

export default HomeScreen;
