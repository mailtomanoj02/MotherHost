import React, {useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AppBar from './AppBar';
import ScreenTitle from './ScreenTitle';
import Colors from '../Themes/Colors';
import {FONT_FAMILY} from '../Config/Constant';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAPIAction} from '../redux/Action';
import {FlatList} from 'react-native-gesture-handler';
import {isValidElement, isValidString} from '../utils/Helper';

const CouponsScreen = () => {
  const dispatch = useDispatch();
  const promotions = useSelector(state => state.promotions);
  const [couponList, setCouponList] = useState([]);
  const [searchValue, setSearchedValue] = useState('');
  const [isSearchedList, setIsSearchValue] = useState(false);
  useEffect(() => {
    const params = {
      action: 'GetPromotions',
      code: '',
    };
    dispatch(fetchAPIAction('getpromotions.php', params, true));
  }, []);
  useEffect(() => {
    if (isValidElement(promotions)) {
      const list = isSearchedList
        ? promotions
        : promotions.filter(
            item => new Date(item?.expirationdate) - new Date() > 0,
          );
      setCouponList(list);
    }
  }, [isSearchedList, promotions]);

  const renderItem = ({item}) => {
    return (
      <View style={styles.flatListContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.codeTxtStyle}>{item?.code}</Text>
          <Text style={styles.applyButtonStyle}>Apply</Text>
        </View>

        {isValidString(item?.notes) && (
          <Text style={styles.offerTxtStyle}>{`* ${item?.notes}`}</Text>
        )}
        <Text
          style={
            styles.offerTxtStyle
          }>{`* Offer valid till ${item?.expirationdate}`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AppBar />
      <ScreenTitle title={'Apple Coupons'} />
      <View style={styles.body}>
        <TextInput
          style={styles.searchTxtStyle}
          value={searchValue}
          onChangeText={text => setSearchedValue(text)}
          placeholder={'Enter Coupon Code'}
        />
        <View style={styles.applyButtonViewStyle}>
          <TouchableOpacity
            onPress={() => {
              let params = {
                action: 'GetPromotions',
              };
              if (!isSearchedList) {
                params.code = searchValue;
              } else {
                params.code = '';
                setSearchedValue('');
              }
              console.log('params', params);
              setIsSearchValue(!isSearchedList);
              dispatch(fetchAPIAction('getpromotions.php', params, true));
            }}>
            <Text style={styles.applyButtonStyle}>
              {isSearchedList ? 'Clear' : 'Find'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        style={styles.flatListStyle}
        data={couponList}
        renderItem={renderItem}
        keyExtractor={item => item?.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },

  body: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderRadius: 4,
    marginVertical: 10,
    borderColor: Colors.PLACEHOLDER_GREY,
    backgroundColor: Colors.white,
    marginHorizontal: 10,
  },
  searchTxtStyle: {height: 40, flex: 0.8, marginHorizontal: 10},
  applyButtonViewStyle: {
    flex: 0.2,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  applyButtonStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    color: Colors.ORANGE,
    fontFamily: FONT_FAMILY.BOLD,
  },
  flatListStyle: {
    marginBottom: 25,
  },
  flatListContainer: {
    backgroundColor: Colors.white,
    marginVertical: 5,
    marginHorizontal: 10,
    paddingVertical: 20,
    padding: 10,
    borderRadius: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderLeftColor: Colors.headerBlue,
    borderLeftWidth: 4,
  },
  codeTxtStyle: {
    fontSize: 18,
    color: Colors.headerBlue,
    fontFamily: FONT_FAMILY.BOLD,
    marginBottom: 10,
  },
  offerTxtStyle: {
    fontSize: 14,
    color: Colors.DARK_GREY,
    fontFamily: FONT_FAMILY.REGULAR,
    marginBottom: 10,
  },
});

export default CouponsScreen;
