import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AppBar from '../AppBar';
import Colors from '../../Themes/Colors';
import {FONT_FAMILY} from '../../Config/Constant';
import {TextInput} from 'react-native-gesture-handler';
const DomainDetailScreen = props => {
  const domainData = props.route.params.domain;

  const RenderPlaceHolder = ({title, placeHolderValue}) => {
    return (
      <View style={styles.nameServerPlaceHolderView}>
        <View style={styles.nameServerPaddingStyle}>
          <Text style={styles.dateText}>{title}</Text>
        </View>
        <TextInput style={styles.textInputStyle} value={placeHolderValue} />
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <AppBar />

      <View style={styles.itemContainer}>
        <View style={styles.innerViewTop}>
          <Text style={styles.hostText}>{domainData.domainname}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.dateText}>
              {`Registration Date\t: ${domainData.regdate}`}
            </Text>
            <Text style={styles.dateText}>
              {`Expiry Date\t\t\t: ${domainData.nextduedate}`}
            </Text>

            <View style={styles.statusStyle}>
              <Text style={styles.dateText}>{'Status : '}</Text>
              <View style={styles.statusBox}>
                <Text
                  style={
                    domainData?.status === 'Active'
                      ? styles.statusTextColorGreen
                      : styles.statusTextColorRed
                  }>
                  {domainData.status}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.nameServerHeaderTextStyle}>Name Servers</Text>
        <Text style={styles.nameServerDescriptionStyle}>
          Name Servers are used to point your Domain Name to your website or
          email service. We require that you maintain at least two Name Servers
          for your Domain Name.
        </Text>
        <View>
          <RenderPlaceHolder title={'Name Server 1:'} placeHolderValue="" />
          <RenderPlaceHolder title={'Name Server 2:'} placeHolderValue="" />
          <TouchableOpacity style={styles.buttonContainerStyle} disabled={true}>
            <Text style={styles.buttonTextStyle}>UPDATE NAME SERVERS</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DomainDetailScreen;

const styles = StyleSheet.create({
  totalContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  itemContainer: {
    borderRadius: 6,
    marginTop: 8,
    padding: 10,
  },
  innerViewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusStyle: {
    marginTop: 10,
    flexDirection: 'row',
    fontFamily: FONT_FAMILY.REGULAR,
  },
  hostText: {
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    color: Colors.headerBlue,
  },
  dateText: {
    marginTop: 8,
    color: Colors.DARK_GREY,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  nameServerHeaderTextStyle: {
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    color: Colors.headerBlue,
    marginTop: 15,
  },
  nameServerDescriptionStyle: {
    fontFamily: FONT_FAMILY.REGULAR,
    color: Colors.DARK_GREY,
    marginTop: 8,
  },
  nameServerPlaceHolderView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  nameServerPaddingStyle: {
    paddingBottom: 6,
  },
  textInputStyle: {
    borderWidth: 1,
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 1,
    borderRadius: 4,
    justifyContent: 'center',
    borderColor: Colors.PLACEHOLDER_GREY,
    paddingHorizontal: 7,
    color: Colors.DARK_GREY,
  },
  buttonContainerStyle: {alignItems: 'flex-end', marginTop: 10, padding: 5},
  buttonTextStyle: {
    backgroundColor: Colors.headerBlue,
    padding: 4,
    color: 'white',
    opacity: 0.5,
  },
  statusBox: {
    minWidth: 70,
    padding: 8,
    backgroundColor: Colors.MEDIUM_GREY,
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
