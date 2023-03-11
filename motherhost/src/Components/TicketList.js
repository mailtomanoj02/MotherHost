import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, RefreshControl, TouchableOpacity, SafeAreaView } from 'react-native'
import ScreenTitle from './ScreenTitle';
import Colors from '../Themes/Colors';
import { FONT_FAMILY, SCREEN_NAMES } from '../Config/Constant';
import AppBar from './AppBar';
import SkeletonLoader from './customUI/SkeletonLoader';
import { getUserId } from '../utils/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAPIAction } from '../redux/Action';


let params = {
    action: 'GetTickets',
    clientid: getUserId()
};


const TicketList = (props) => {
    const dispatch = useDispatch();
    const tiketData = useSelector(state => state.ticketData);
    const isLoading = useSelector(state => state.isLoading);
    const [refreshing, setRefreshing] = useState(false);
    useEffect(() => {
        dispatch(fetchAPIAction('gettickets.php', params));
    }, []);
    const handleRefresh = () => {
        setRefreshing(true);
        dispatch(fetchAPIAction('gettickets.php', params, false));
        setTimeout(() => setRefreshing(false), 2000);
    };


    const renderItem = ({ item }) => {
        return (
            <View
                style={styles.itemContainer}>
                <View style={styles.innerViewTop}>
                    <Text style={styles.idText}>{`# ${item.id}`}</Text>
                    <View style={styles.statusBox}>
                        <Text style={styles.statusText}>
                            {item.status}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={styles.subjectTxt}>{item?.subject}</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <AppBar />
            <ScreenTitle title="My Tickets" />
            {isLoading ? (
                <SkeletonLoader />
            ) : (
                <FlatList
                    data={tiketData}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                    } />
            )}
            <TouchableOpacity
             onPress={() =>
                props.navigation.navigate(SCREEN_NAMES.ADD_TICKETS)}
            >
                <View style={styles.addTicketView}>
                    <SafeAreaView> 
                    <Text style={styles.addTicketTxt}>CREATE TICKET</Text>
                    </SafeAreaView> 
                </View>
            </TouchableOpacity>
        </View>

    );

}
export default TicketList;


const styles = StyleSheet.create({
    container: {
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
        shadowOffset: { width: -2, height: 1 },
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
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        fontFamily: FONT_FAMILY.REGULAR,
    },
    idText: {
        fontFamily: FONT_FAMILY.SEMI_BOLD,
        color: Colors.headerBlue,
    },
    subjectTxt: {
        marginTop: 5,
        color: Colors.DARK_GREY,
        fontFamily: FONT_FAMILY.REGULAR,
        fontSize: 16
    },
    statusText: {
        fontFamily: FONT_FAMILY.REGULAR,
        fontSize: 12
    },
    addTicketTxt: {
        fontFamily: FONT_FAMILY.BOLD,
        fontSize: 18,
        color: Colors.white,
        justifyContent: 'center',
        textAlign: 'center',
        margin: 8
    },
    addTicketView: {    
        backgroundColor:Colors.buttonOrange,
        justifyContent: 'center', 
        alignSelf: 'center', 
        alignItems: 'center', 
        width: '100%' 
    }
});
