import * as React from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import AppBar from './AppBar';
import ScreenTitle from './ScreenTitle';
import Colors from '../Themes/Colors';
import {FONT_FAMILY} from '../Config/Constant';
import {connect, useDispatch, useSelector} from 'react-redux';
import {fetchAPIAction} from '../redux/Action';
import {useEffect} from 'react';
import SkeletonLoader from './customUI/SkeletonLoader';
const renderItem = ({item}) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.tileHeadingStyle}>{item?.name}</Text>
      <Text style={styles.nameStyle}>{item?.groupname}</Text>
      <Text style={styles.domainStyle}>{item?.domain}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text
            style={
              styles.dateText
            }>{`Next Due Date\t: ${item?.nextduedate}`}</Text>
          <Text
            style={
              styles.dateText
            }>{`Billing Cycle\t\t: ${item?.billingcycle}`}</Text>
        </View>
        <View style={styles.statusBox}>
          <Text
            style={
              item?.status === 'Active'
                ? styles.statusTextColorGreen
                : styles.statusTextColorRed
            }>
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );
};

const ServiceScreen = props => {
  const dispatch = useDispatch();
  const serviceData = useSelector(state => state.serviceData);
  const isLoading = useSelector(state => state.isLoading);
  useEffect(() => {
    const apiCall = props.navigation.addListener('focus', () => {
      dispatch(
        fetchAPIAction('getclientsproducts.php', {
          action: 'GetClientsProducts',
          clientid: 41,
        }),
      );
    });
    return apiCall;
  }, []);

  return (
    <View style={styles.totalContainer}>
      <AppBar />
      <ScreenTitle title="My Services" />
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <FlatList
          data={serviceData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({
  totalContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 6,
    marginTop: 15,
    padding: 10,
    backgroundColor: Colors.white,
    shadowColor: Colors.GreyBorderWhiteBG,
    shadowOffset: {width: -2, height: 1},
    shadowRadius: 3,
    elevation: 10,
    shadowOpacity: 0.2,
  },
  tileHeadingStyle: {
    alignSelf: 'center',
    color: Colors.headerBlue,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: 14,
  },
  nameStyle: {
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: 14,
    marginTop: 8,
    marginHorizontal: 5,
  },
  domainStyle: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: 14,
    marginTop: 8,
    marginHorizontal: 5,
  },
  dateText: {
    marginHorizontal: 5,
    marginTop: 8,
    color: Colors.DARK_GREY,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  statusBox: {
    minWidth: 70,
    padding: 8,
    backgroundColor: Colors.MEDIUM_GREY,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  statusTextColorGreen: {
    color: Colors.GREEN,
  },
  statusTextColorRed: {
    color: Colors.RED,
  },
});
