import * as React from 'react';
import {FlatList, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import AppBar from './AppBar';
import ScreenTitle from './ScreenTitle';
import Colors from '../Themes/Colors';
import {FONT_FAMILY, SCREEN_NAMES} from '../Config/Constant';

const DomainScreen = ({navigation}) => {
  const data = [
    {
      date: '20/10/2000',
      DueDate: '21/10/2000',
      status: 'Active',
      id: '# 12345',
      host: 'maduraihost.com',
    },
    {
      date: '20/10/2000',
      DueDate: '21/10/2000',
      status: 'Active',
      id: '# 12341',
      host: 'maduraihost.com',
    },
    {
      date: '20/10/2000',
      DueDate: '21/10/2000',
      status: 'Active',
      id: '# 12342',
      host: 'maduraihost.com',
    },
    {
      date: '20/10/2000',
      DueDate: '21/10/2000',
      status: 'Active',
      id: '# 12343',
      host: 'maduraihost.com',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(SCREEN_NAMES.DOMAIN_DETAIL_SCREEN)}>
        <View style={styles.itemContainer}>
          <View style={styles.innerViewTop}>
            <Text style={styles.idText}>{item.host}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.dateText}>{`Date\t\t: ${item.date}`}</Text>
              <Text style={styles.dateText}>{`Due Date\t: ${item.date}`}</Text>
            </View>
            <View style={styles.statusBox}>
              <Text
                style={
                  item.status === 'Active'
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
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
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
    fontFamily: FONT_FAMILY.REGULAR,
    color: Colors.headerBlue,
  },
  dateText: {
    marginTop: 8,
    color: Colors.DARK_GREY,
    fontFamily: FONT_FAMILY.REGULAR,
  },
});
