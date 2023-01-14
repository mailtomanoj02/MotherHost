import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AppBar from './AppBar';
import ScreenTitle from './ScreenTitle';
import Colors from '../Themes/Colors';
import {FONT_FAMILY} from '../Config/Constant';
const HostingScreen = ({route}) => {
  const {headerTitle} = route.params;
  const data = [
    {
      id: '1',
      header: 'Start Up',
      description:
        '10 WebsitesFree domain with annual plan2 GB SSD Storage Unlimited Data Transfer2 Email Accounts Each Domain20 MySQL databases (200MB each)Free SSL Certificate',
      amount: '499',
    },
    {
      id: '2',
      header: 'Start Up',
      description:
        '10 WebsitesFree domain with annual plan2 GB SSD Storage Unlimited Data Transfer2 Email Accounts Each Domain20 MySQL databases (200MB each)Free SSL Certificate',
      amount: '499',
    },
    {
      id: '3',
      header: 'Start Up',
      description:
        '10 WebsitesFree domain with annual plan2 GB SSD Storage Unlimited Data Transfer2 Email Accounts Each Domain20 MySQL databases (200MB each)Free SSL Certificate',
      amount: '499',
    },
    {
      id: '4',
      header: 'Start Up',
      description:
        '10 WebsitesFree domain with annual plan2 GB SSD Storage Unlimited Data Transfer2 Email Accounts Each Domain20 MySQL databases (200MB each)Free SSL Certificate',
      amount: '499',
    },
    {
      id: '5',
      header: 'Start Up',
      description:
        '10 WebsitesFree domain with annual plan2 GB SSD Storage Unlimited Data Transfer2 Email Accounts Each Domain20 MySQL databases (200MB each)Free SSL Certificate',
      amount: '499',
    },
  ];

  const renderButton = () => {
    return (
      <TouchableOpacity
        style={{flexDirection: 'row', justifyContent: 'flex-end', flex: 1}}>
        <View style={styles.buttonContainerStyle}>
          <Text style={styles.buttonTextStyle}>ORDER & CONTINUE</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.innerTitleContainerStyle}>
          <Text style={styles.innerTitleTextStyle}>{item.header}</Text>
        </View>
        <Text style={styles.descriptionTextStyle}>{item.description}</Text>
        <View style={styles.amountContainerStyle}>
          <Text style={styles.amountTextStyle}>{`$ ${item.amount}`}</Text>
          <Text style={styles.perMonthTextStyle}>{'  /mo'}</Text>
          {renderButton()}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.totalContainer}>
      <AppBar />
      <ScreenTitle title={headerTitle} />
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
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
    fontSize: 12,
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
