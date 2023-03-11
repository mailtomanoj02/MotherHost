import React, { useState } from "react";
import { View, TouchableWithoutFeedback, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView,Keyboard } from 'react-native'
import { FONT_FAMILY } from '../Config/Constant';
import AppBar from './AppBar';
import ScreenTitle from './ScreenTitle';
import { getUserId } from '../utils/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAPIAction } from '../redux/Action';
import Colors from '../Themes/Colors';
import { showToastMessage } from "./customUI/FlashMessageComponent/Helper";
import { color } from "react-native-reanimated";

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
const AddTicket = (props) => {
    const dispatch = useDispatch();
    const [ subject, setSubject ] = useState('')
    const [ description, setDescription ] = useState('')

    const handleCreateTicket = () => {

        if(subject === '' && description === ''){
            showToastMessage('Fields should not be empty.', Colors.RED)
        }
        let params = {
            action: 'OpenTicket',
            clientid: getUserId(),
            deptid : 4,
            message: description,
            subject: subject
        };
       dispatch(fetchAPIAction('gettickets.php', params,false,'POST',props.navigation));
       
    }

        return ( 
            <HideKeyboard>
                           <View style={styles.container}>
            <AppBar />
            <ScreenTitle title="Create Ticket" />
            <View style = {{backgroundColor: Colors.white, height: 300, margin: 10, borderColor: Colors.GreyBorderWhiteBG, borderWidth: 0.5, borderRadius: 8, fontFamily: FONT_FAMILY.REGULAR}}>
                <TextInput
                    style = {{flex: 0.2, margin: 10, borderBottomColor: Colors.GreyBorderWhiteBG, borderBottomWidth: 0.5, ontFamily: FONT_FAMILY.REGULAR}}
                    value={subject}
                    onChangeText={(text) => setSubject(text)}
                    placeholder="Subject"
                ></TextInput>
                <TextInput
                    style = {{flex: 0.8, margin: 10}}
                    onChangeText={(text) => setDescription(text)}
                    value={description}
                    placeholder="Description"
                    multiline={true}
                ></TextInput>
                
            </View>
            <TouchableOpacity
             style= {{margin: 10, borderRadius: 10}}
             onPress={handleCreateTicket}
            >
                <View style={styles.addTicketView}>
                    <SafeAreaView> 
                    <Text style={styles.addTicketTxt}>CREATE TICKET</Text>
                    </SafeAreaView> 
                </View>
            </TouchableOpacity>
            </View>
        </HideKeyboard>
        );  
}
export default AddTicket;

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
        borderRadius: 10,
        backgroundColor:Colors.buttonOrange,
        justifyContent: 'center', 
        alignSelf: 'center', 
        alignItems: 'center', 
        width: '100%' 
    }
});