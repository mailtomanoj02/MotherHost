import * as React from 'react';
import {FlatList, Text, View, StyleSheet, RefreshControl} from 'react-native';
import AppBar from './AppBar';
import ScreenTitle from './ScreenTitle';
import Colors from '../Themes/Colors';
import {FONT_FAMILY} from '../Config/Constant';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAPIAction} from '../redux/Action';
import SkeletonLoader from './customUI/SkeletonLoader';

const InvoiceScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  let params = {
    action: 'GetInvoices',
    userid: 41,
    orderby: 'duedate',
    order: 'desc',
  };

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(fetchAPIAction('getinvoices.php', params, false));
    setTimeout(() => setRefreshing(false), 2000);
  };
  const dispatch = useDispatch();
  const invoiceData = useSelector(state => state.invoiceData);
  const isLoading = useSelector(state => state.isLoading);
  useEffect(() => {
    dispatch(fetchAPIAction('getinvoices.php', params));
    return () => console.log('called unmount');
  }, []);
  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.innerViewTop}>
          <Text style={styles.idText}>{item.id}</Text>
          <Text style={styles.amountStyle}>{item.amount}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.dateText}>{`Date\t\t: ${item.date}`}</Text>
            <Text style={styles.dateText}>{`Due Date\t: ${item.duedate}`}</Text>
          </View>
          <View style={styles.statusBox}>
            <Text
              style={
                item.status.toLowerCase() === 'paid'
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

  return (
    <View style={styles.totalContainer}>
      <AppBar />
      <ScreenTitle title="My Invoices" />
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <FlatList
          data={invoiceData}
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

export default InvoiceScreen;

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
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    color: Colors.headerBlue,
  },
  dateText: {
    marginTop: 5,
    color: Colors.DARK_GREY,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  amountStyle: {
    color: Colors.black,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
  },
});
