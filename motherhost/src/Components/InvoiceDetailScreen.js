import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppBar from './AppBar';
import Colors from '../Themes/Colors';
import {FONT_FAMILY} from '../Config/Constant';
import {useDispatch, useSelector} from 'react-redux';
import {getAddress, getUserId} from '../utils/Utils';
import {useEffect, useState} from 'react';
import {fetchAPIAction} from '../redux/Action';
import {isValidElement} from '../utils/Helper';
import RazorpayCheckout from 'react-native-razorpay';
const InvoiceDetailScreen = props => {
  let useAddress = getAddress();
  let dispatch = useDispatch();
  let invoiceId = props.route.params.invoiceData;
  let invoiceDetailData = useSelector(state => state.invoiceDetailData);
  let status = invoiceDetailData?.status;
  let invoiceDetailsList = invoiceDetailData?.items?.item;
  const [total, setTotal] = useState(0);

  const data = [
    {
      id: '1',
      Test: 'Test',
      amount: '3.0',
    },
    {
      id: '2',
      Test: 'Test 1',
      amount: '3.0',
    },
    {
      id: '3',
      Test: 'Test 2',
      amount: '3.0',
    },
  ];
  let params = {
    action: 'GetInvoice',
    invoiceid: invoiceId,
  };
  useEffect(() => {
    dispatch(fetchAPIAction('getinvoices.php', params));
  }, []);
  useEffect(() => {
    console.log('useEffect called');
    const total = invoiceDetailsList?.reduce(
      (a, v) => (a = a + parseFloat(v?.amount)),
      0,
    );
    setTotal(total);
  }, [invoiceDetailsList]);

  const onTapPay = () => {
    let options = {
      description: 'Motherhost.com',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_live_NRitIpeIamRiYC', // Your api key
      amount: '5000',
      name: 'foo',
      prefill: {
        email: 'void@razorpay.com',
        contact: '9191919191',
        name: 'Razorpay Software',
      },
      theme: {color: '#F37254'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };
  const renderItem = () => {
    return (
      <View>
        {isValidElement(invoiceDetailsList)
          ? invoiceDetailsList.map(item => (
              <View
                key={item.id}
                style={[
                  styles.invoiceNoRowStyle,
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <Text
                  style={[
                    styles.boxTextStyle,
                    {fontFamily: FONT_FAMILY.REGULAR},
                  ]}>
                  {item.description}
                </Text>
                <Text
                  style={[
                    styles.boxTextStyle,
                    {fontFamily: FONT_FAMILY.REGULAR},
                  ]}>
                  {item.amount}
                </Text>
              </View>
            ))
          : null}
      </View>
    );
  };

  const renderDetailView = () => {
    return (
      <ScrollView style={styles.totalContainerStyle}>
        <Text style={styles.headerStyle}>Mothersoft Technologies</Text>
        <View style={styles.invoiceNoRowStyle}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <Text style={styles.textRowStyle}>Invoice No</Text>
            <Text style={styles.textRowStyle}>{`\t${invoiceId}`}</Text>
          </View>
          <View style={styles.statusViewStyle}>
            <Text style={[styles.statusText, {color: Colors.RED}]}>
              {status}
            </Text>
          </View>
        </View>
        <Text style={styles.textStyle}>Invoice To</Text>
        <Text style={styles.textStyle}>{useAddress}</Text>
        <View style={styles.invoiceNoRowStyle}>
          <Text style={styles.textStyle}>{'Invoice Date:\t'}</Text>
          <Text style={styles.textStyle}>{'2023-02-02'}</Text>
        </View>
        <Text style={styles.textStyle}>{'Invoice Items'}</Text>
        <View style={styles.boxContainer}>
          <View
            style={[
              styles.invoiceNoRowStyle,
              styles.boxInnerViewStyle,
              {backgroundColor: Colors.PLACEHOLDER_GREY},
            ]}>
            <Text
              style={[
                styles.boxTextStyle,
                {fontFamily: FONT_FAMILY.SEMI_BOLD},
              ]}>
              Description
            </Text>
            <Text
              style={[
                styles.boxTextStyle,
                {fontFamily: FONT_FAMILY.SEMI_BOLD},
              ]}>
              Amount
            </Text>
          </View>
          {renderItem()}
          <View
            style={[
              styles.invoiceNoRowStyle,
              styles.boxInnerViewStyle,
              {backgroundColor: Colors.MEDIUM_GREY},
            ]}>
            <Text
              style={[
                styles.boxTextStyle,
                {fontFamily: FONT_FAMILY.SEMI_BOLD},
              ]}>
              Total
            </Text>
            <Text
              style={[
                styles.boxTextStyle,
                {fontFamily: FONT_FAMILY.SEMI_BOLD},
              ]}>
              {total?.toFixed(2)}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.buttonViewStyle} onPress={onTapPay}>
          <Text style={styles.buttonTextStyle}>PAY NOW</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };
  return (
    <View style={{flex: 1}}>
      <AppBar />
      {renderDetailView()}
    </View>
  );
};

const styles = StyleSheet.create({
  totalContainerStyle: {
    backgroundColor: Colors.white,
    margin: 14,
    borderRadius: 10,
    padding: 10,
  },
  headerStyle: {
    fontFamily: FONT_FAMILY.BOLD,
    color: Colors.headerBlue,
  },
  invoiceNoRowStyle: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  textRowStyle: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.REGULAR,
    color: Colors.DARK_GREY,
  },
  textStyle: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.REGULAR,
    color: Colors.DARK_GREY,
    marginTop: 6,
  },
  statusViewStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 8,
  },
  statusText: {
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: 12,
    backgroundColor: Colors.MEDIUM_GREY,
    padding: 5,
  },
  boxContainer: {
    borderWidth: 1,
    borderColor: Colors.PLACEHOLDER_GREY,
    marginTop: 5,
  },
  boxInnerViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxTextStyle: {
    marginHorizontal: 10,
    marginBottom: 3,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: 13,
  },
  buttonViewStyle: {
    flexDirection: 'row',
    backgroundColor: Colors.buttonBlue,
    marginTop: 10,
    padding: 5,
    justifyContent: 'center',
  },
  buttonTextStyle: {color: Colors.white, fontFamily: FONT_FAMILY.SEMI_BOLD},
});

export default InvoiceDetailScreen;
