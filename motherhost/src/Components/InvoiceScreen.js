import * as React from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import AppBar from './AppBar';
import ScreenTitle from './ScreenTitle';
import Colors from '../Themes/Colors';
import {FONT_FAMILY} from '../Config/Constant';
// import {fetchInvoiceData} from '../redux/Action';
import {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchAPIRequest} from './../Api/Api';

const InvoiceScreen = props => {
  useEffect(() => {
    console.log('fetched');
    fetchAPIRequest('getinvoices.php', {
      action: 'GetInvoices',
      userid: 41,
      orderby: 'duedate',
      order: 'desc',
    });
    return () => {
      console.log('unmounted');
    };
  }, [props.fetchData]);
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
      {props.isLoading ? <Text> Loading </Text> : null}
      <ScreenTitle title="My Invoices" />
      <FlatList
        data={props.data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    data: state.data,
    isLoading: state.isLoading,
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchData: dispatch(fetchInvoiceData),
//   };
// };

export default connect(mapStateToProps, null)(InvoiceScreen);

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
