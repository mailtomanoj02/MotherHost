import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
  Platform
} from 'react-native';
import AppBar from './AppBar';
import Colors from '../Themes/Colors';
import {FONT_FAMILY} from '../Config/Constant';
import {useDispatch, useSelector} from 'react-redux';
import {getAddress, getUserName} from '../utils/Utils';
import {useEffect, useState} from 'react';
import {fetchAPIAction} from '../redux/Action';
import {isValidElement} from '../utils/Helper';
import RazorpayCheckout from 'react-native-razorpay';
import {showToastMessage} from './customUI/FlashMessageComponent/Helper';
import {fetchRazorAPIRequest} from '../Api/Api';
import DeviceInfo from 'react-native-device-info';
const InvoiceDetailScreen = props => {
  let useAddress = getAddress();
  let dispatch = useDispatch();
  let invoiceId = props.route.params.invoiceData;
  let invoiceDetailData = useSelector(state => state.invoiceDetailData);
  let loginData = useSelector(state => state.loginData);
  let status = invoiceDetailData?.status;
  let invoiceDetailsList = invoiceDetailData?.items?.item;
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentType, setPaymentType] = useState('');

  let params = {
    action: 'GetInvoice',
    invoiceid: invoiceId,
  };
  useEffect(() => {
    dispatch(fetchAPIAction('getinvoices.php', params));
  }, []);
  useEffect(() => {
    const total = invoiceDetailsList?.reduce(
      (a, v) => (a = a + parseFloat(v?.amount)),
      0,
    );
    const taxes = ((total * 9) / 100).toFixed(2);
    const netTotal = parseFloat((taxes * 2) + total).toFixed(2);
    setTotal(netTotal) ;
    setTax(taxes * 2)
  }, [invoiceDetailsList]);

  const invoicePaymentInvoiceAdd = paymentId => {
    params = {
      action: 'AddInvoicePayment',
      invoiceid: invoiceId,
      transid: paymentId,
      gateway: 'razorpay',
      date: Date(),
    };
    dispatch(
      fetchAPIAction('addinvoicepayment.php', params, 'POST'),
    );
    params = {
      action: 'GetInvoice',
      invoiceid: invoiceId,
    };
    setTimeout(() => {
      dispatch(fetchAPIAction('getinvoices.php', params));
    }, 1000)
  };

  const onTapPay = async () => {
    const orderResponse = await fetchRazorAPIRequest(total, invoiceId);
    let userName = getUserName();
    if (isValidElement(orderResponse?.id) && isValidElement(userName)) {
      let options = {
        description: `Invoice # ${invoiceId.toString()}`,
        note: Platform.OS.toLowerCase() === 'ios' ? 'IOSApp' : 'AndroidApp',
        image: require('./../Images/Logo/razerpaylogo.png'),
        currency: 'INR',
        key: 'rzp_live_NRitIpeIamRiYC', // Your api key
        amount: total * 100,
        name: 'Mothersoft Technologies',
        order_id: orderResponse?.id,
        prefill: {
          email: loginData?.email,
          contact: loginData?.phonenumber,
          name: userName,
        },
        theme: {color: Colors.buttonBlue},
      };
      await RazorpayCheckout.open(options)
        .then(data => {
          setPaymentType('S');
          setModalVisible(true);
          invoicePaymentInvoiceAdd(data.razorpay_payment_id);
        })
        .catch(error => {
          setPaymentType('F');
          setModalVisible(true);
        });
    } else {
      showToastMessage('Oops! payment failed try again later.', Colors.RED);
    }
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
                    {fontFamily: FONT_FAMILY.REGULAR, flex: 0.85},
                  ]}>
                  {item.description}
                </Text>
                <Text
                  style={[
                    styles.boxTextStyle,
                    {fontFamily: FONT_FAMILY.REGULAR, flex: 0.15},
                  ]}>
                  {item.amount}
                </Text>
              </View>
            ))
          : null}
      </View>
    );
  };

  const paymentStatusModel = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <TouchableOpacity
          style={{flex: 1}}
          activeOpacity={1}
          onPressOut={() => {
            setModalVisible(false);
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.BLUR_BLACK,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: 300,
                height: 200,
                backgroundColor:
                  paymentType === 'S' ? Colors.GREEN : Colors.RED,
                borderRadius: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  margin: 5,
                  backgroundColor: Colors.backgroundColor,
                  borderRadius: 10,
                  alignItems: 'center',
                  borderColor: paymentType === 'S' ? Colors.GREEN : Colors.RED,
                  borderWidth: 1,
                }}>
                <Image
                  style={{
                    width: 124,
                    height: 124,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  source={
                    paymentType === 'S'
                      ? require('../Images/Common/patyment_success.png')
                      : require('../Images/Common/payment_failed.png')
                  }
                />
                <Text
                  style={{
                    fontFamily: FONT_FAMILY.SEMI_BOLD,
                    fontSize: 20,
                    color: paymentType === 'S' ? Colors.GREEN : Colors.RED,
                  }}>
                  {paymentType === 'S'
                    ? 'Payment Successful!'
                    : 'Payment Failed!'}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  const renderDetailView = () => {
    const statusCheck = () => {
      return (
        status?.toLowerCase() !== 'paid' &&
        status?.toLowerCase() !== 'cancelled'
      );
    };
    return (
      <ScrollView style={styles.totalContainerStyle}>
        <Text style={styles.headerStyle}>Mothersoft Technologies</Text>
        <View style={styles.invoiceNoRowStyle}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <Text style={styles.textRowStyle}>Invoice No</Text>
            <Text style={styles.textRowStyle}>{`\t${invoiceId}`}</Text>
          </View>
          <View style={styles.statusViewStyle}>
            <Text
              style={[
                styles.statusText,
                {
                  color:
                    status?.toLowerCase() === 'paid'
                      ? Colors.GREEN
                      : Colors.RED,
                },
              ]}>
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
              {backgroundColor: Colors.white},
            ]}>
            <Text
              style={[
                styles.boxTextStyle,
                {fontFamily: FONT_FAMILY.SEMI_BOLD, flex: 0.85},
              ]}>
              Tax (CGST 9% & SGST 9%)
            </Text>
            <Text
              style={[
                styles.boxTextStyle,
                {fontFamily: FONT_FAMILY.SEMI_BOLD, flex: 0.15},
              ]}>
              {tax}
            </Text>
          </View>
          <View
            style={[
              styles.invoiceNoRowStyle,
              styles.boxInnerViewStyle,
              {backgroundColor: Colors.MEDIUM_GREY},
            ]}>
            <Text
              style={[
                styles.boxTextStyle,
                {fontFamily: FONT_FAMILY.SEMI_BOLD, flex: 0.85},
              ]}>
              Total
            </Text>
            <Text
              style={[
                styles.boxTextStyle,
                {fontFamily: FONT_FAMILY.SEMI_BOLD, flex: 0.15},
              ]}>
              {total}
            </Text>
          </View>
        </View>

        {statusCheck() ? (
          <TouchableOpacity style={styles.buttonViewStyle} onPress={onTapPay}>
            <Text style={styles.buttonTextStyle}>PAY NOW</Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    );
  };
  return (
    <View style={{flex: 1}}>
      <AppBar />
      {renderDetailView()}
      {paymentStatusModel()}
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
