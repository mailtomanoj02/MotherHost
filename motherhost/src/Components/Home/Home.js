import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import HomeUserTrackingView from '../Home/HomeUserTrackingView.js';
import DomainHomeView from '../Home/DomainHomeView.js';
import WebsiteHostingHomeView from '../Home/WebsiteHostingHomeView.js';
import Colors from '../../Themes/Colors.js';
import {FONT_FAMILY} from '../../Config/Constant.js';
import {ScrollView} from 'react-native-gesture-handler';
import AppBar from '../AppBar.js';
const userTrackingView = () => {
  return (
    <View style={{flexDirection: 'column'}}>
      <View style={{flexDirection: 'row'}}>
        <HomeUserTrackingView
          title={'Services'}
          count={'0'}
          img={require('../../Images/Home/servers.png')}
        />
        <HomeUserTrackingView
          title={'Domains'}
          count={'0'}
          img={require('../../Images/Home/domain.png')}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <HomeUserTrackingView
          title={'Tickets'}
          count={'0'}
          img={require('../../Images/Home/tickets.png')}
        />
        <HomeUserTrackingView
          title={'Invoice'}
          count={'0'}
          img={require('../../Images/Home/invoices.png')}
        />
      </View>
    </View>
  );
};
const domainInView = () => {
  return (
    <View style={{flexDirection: 'row', margin: 5}}>
      <DomainHomeView
        img={require('../../Images/Home/domain_in.png')}
        color={Colors.HOME_IN_COLOR}
      />
      <DomainHomeView
        img={require('../../Images/Home/domain_com.png')}
        color={Colors.HOME_COM_COLOR}
      />
      <DomainHomeView
        img={require('../../Images/Home/domain_net.png')}
        color={Colors.HOME_NET_COLOR}
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
        price={'25/m'}
      />
      <WebsiteHostingHomeView
        img={require('../../Images/Home/linux.png')}
        imgStyle={homeStyle.websiteHostinViewStyleImgStyle1}
        title={'Linux'}
        price={'25/m'}
      />
      <WebsiteHostingHomeView
        img={require('../../Images/Home/windows.png')}
        imgStyle={homeStyle.websiteHostinViewStyleImgStyle1}
        title={'Windows'}
        price={'25/m'}
      />
    </View>
  );
};
const resellerHostingHomeView = () => {
  return (
    <View>
      <View style={homeStyle.websiteHostinViewStyle}>
        <WebsiteHostingHomeView
          img={require('../../Images/Home/linuxlogo.png')}
          imgStyle={homeStyle.websiteHostinViewStyleImgStyle1}
          title={'Linux Multi Domain Hosting'}
          price={'25/m'}
        />
        <WebsiteHostingHomeView
          img={require('../../Images/Home/windowslogo.png')}
          imgStyle={homeStyle.websiteHostinViewStyleImgStyle1}
          title={'Windows Multi Domain Hosting'}
          price={'25/m'}
        />
      </View>
      <View style={homeStyle.websiteHostinViewStyle}>
        <WebsiteHostingHomeView
          img={require('../../Images/Home/linuxlogo.png')}
          imgStyle={homeStyle.websiteHostinViewStyleImgStyle1}
          title={'Linux Reseller Hosting'}
          price={'25/m'}
        />
        <WebsiteHostingHomeView
          img={require('../../Images/Home/windowslogo.png')}
          imgStyle={homeStyle.websiteHostinViewStyleImgStyle1}
          title={'Windows Reseller Hosting'}
          price={'25/m'}
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
        price={'25/m'}
      />
      <WebsiteHostingHomeView
        img={require('../../Images/Home/gsuite-logo.png')}
        imgStyle={homeStyle.websiteHostinViewStyleImgStyle1}
        title={'Google Workspace'}
        price={'25/m'}
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
          price={'25/m'}
        />
        <WebsiteHostingHomeView
          img={require('../../Images/Home/spamexperts.png')}
          imgStyle={homeStyle.websiteHostinViewStyleImgStyle2}
          title={'Spam Experts'}
          price={'25/m'}
        />
      </View>
      <View style={homeStyle.websiteHostinViewStyle}>
        <WebsiteHostingHomeView
          img={require('../../Images/Home/sitelock.png')}
          imgStyle={homeStyle.websiteHostinViewStyleImgStyle2}
          title={'Site Lock'}
          price={'25/m'}
        />
        <WebsiteHostingHomeView
          img={require('../../Images/Home/codeguard-logo.png')}
          imgStyle={homeStyle.websiteHostinViewStyleImgStyle2}
          title={'CodeGuard'}
          price={'25/m'}
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

const HomeScreen = () => {
  return (
    <View>
      <AppBar />
      <ScrollView>
        <View>
          {userTrackingView()}
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
