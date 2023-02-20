import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AppBar from './AppBar';
import ScreenTitle from './ScreenTitle';
import Colors from '../Themes/Colors';
import {FONT_FAMILY, SCREEN_NAMES} from '../Config/Constant';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAPIAction} from '../redux/Action';
import {isValidElement} from '../utils/Helper';
import {useEffect} from 'react';
import SkeletonLoader from './customUI/SkeletonLoader';

const HostingScreen = props => {
  const hostingData = useSelector(state => state.hostingData);
  const {headerTitle, groupId} = hostingData;
  const dispatch = useDispatch();
  const productData = useSelector(state => state.productData);
  const isLoading = useSelector(state => state.isLoading);
  let params = {
    action: 'GetProducts',
    gid: groupId,
  };

  useEffect(() => {
    dispatch(fetchAPIAction('getproducts.php', params));
  }, []);

  let productList = isValidElement(productData)
    ? productData.products?.product
    : '';
  const renderButton = item => {
    return (
      <TouchableOpacity
        style={{flexDirection: 'row', justifyContent: 'flex-end', flex: 1}}
        onPress={() =>
          props.navigation.navigate(SCREEN_NAMES.DOMAIN_NAME_SCREEN, {
            pid: item.pid,
          })
        }>
        <View style={styles.buttonContainerStyle}>
          <Text style={styles.buttonTextStyle}>ORDER & CONTINUE</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => {
    console.log(item.pid);
    let description = item.description.replace(/<[^>]+>/g, '');
    let itemPrice = item.pricing.INR.monthly;
    return (
      <View style={styles.itemContainer}>
        <View style={styles.innerTitleContainerStyle}>
          <Text style={styles.innerTitleTextStyle}>{item.name}</Text>
        </View>
        <Text style={styles.descriptionTextStyle}>{description}</Text>
        <View style={styles.amountContainerStyle}>
          <Text style={styles.amountTextStyle}>{`$ ${itemPrice}`}</Text>
          <Text style={styles.perMonthTextStyle}>{'  /mo'}</Text>
          {renderButton(item)}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.totalContainer}>
      <AppBar />
      <ScreenTitle title={headerTitle} />
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <FlatList
          data={productList}
          keyExtractor={item => item.pid}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default HostingScreen;

const styles = StyleSheet.create({
  totalContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 6,
    marginTop: 10,
    padding: 10,
    backgroundColor: Colors.white,
    shadowColor: Colors.GreyBorderWhiteBG,
    shadowOffset: {width: -2, height: 1},
    shadowRadius: 3,
    elevation: 10,
    shadowOpacity: 0.2,
  },
  innerTitleContainerStyle: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.GREEN,
  },
  innerTitleTextStyle: {
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    color: Colors.GREEN,
    marginBottom: 5,
    fontSize: 14,
  },
  descriptionTextStyle: {
    marginTop: 6,
    fontFamily: FONT_FAMILY.REGULAR,
    color: Colors.DARK_GREY,
    fontSize: 13,
  },
  amountTextStyle: {
    color: Colors.headerBlue,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    marginTop: 2,
  },
  perMonthTextStyle: {
    color: Colors.headerBlue,
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: 12,
    marginTop: 4,
  },
  buttonContainerStyle: {
    backgroundColor: Colors.ORANGE,
    borderRadius: 3,
    padding: 5,
  },
  buttonTextStyle: {
    fontSize: 12,
    alignSelf: 'flex-end',
    color: Colors.white,
  },
  amountContainerStyle: {flexDirection: 'row', marginTop: 15, flex: 1},
});
