import * as React from 'react';
import {FlatList, Text, View, StyleSheet, TouchableOpacity, RefreshControl} from 'react-native';
import AppBar from '../AppBar';
import ScreenTitle from '../ScreenTitle';
import Colors from '../../Themes/Colors';
import {FONT_FAMILY, SCREEN_NAMES} from '../../Config/Constant';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAPIAction} from '../../redux/Action';
import {useEffect, useState} from 'react';
import SkeletonLoader from '../customUI/SkeletonLoader';
import {getUserId} from '../../utils/Utils';

const DomainScreen = props => {
  const dispatch = useDispatch();
  const domainData = useSelector(state => state.domainData);
  const isLoading = useSelector(state => state.isLoading);
  const [refreshing, setRefreshing] = useState(false);
  let params = {
    action: 'GetClientsDomains',
    clientid: getUserId(),
  };
  useEffect(() => {
    dispatch(fetchAPIAction('getclientsdomains.php', params));
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(fetchAPIAction('getclientsdomains.php', params, false));
    setTimeout(() => setRefreshing(false), 2000);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate(SCREEN_NAMES.DOMAIN_DETAIL_SCREEN)
        }>
        <View style={styles.itemContainer}>
          <View style={styles.innerViewTop}>
            <Text style={styles.idText}>{item.domainname}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text
                style={styles.dateText}>{`Date\t\t: ${item?.regdate}`}</Text>
              <Text
                style={
                  styles.dateText
                }>{`Due Date\t: ${item?.nextduedate}`}</Text>
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
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.totalContainer}>
      <AppBar />
      <ScreenTitle title="My Domains" />
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <FlatList
          data={domainData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      )}
    </View>
  );
};

export default DomainScreen;

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
    shadowColor: Colors.MEDIUM_GREY,
    shadowOffset: {width: -2, height: 1},
    shadowRadius: 3,
    elevation: 10,
    shadowOpacity: 0.2,
  },
  innerViewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
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
  idText: {
    fontFamily: FONT_FAMILY.REGULAR,
    color: Colors.headerBlue,
  },
  dateText: {
    marginTop: 8,
    color: Colors.DARK_GREY,
    fontFamily: FONT_FAMILY.REGULAR,
  },
});
