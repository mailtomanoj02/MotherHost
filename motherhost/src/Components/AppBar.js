import React from "react";
import {View, StyleSheet, Text, Image, Pressable, Touchable} from 'react-native';
import Colors from '../Themes/Colors';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const AppBar = (props) => {
        const navigation = useNavigation()
        return(
                <View style={styles.containerStyle}>
                    <Pressable
                    style={styles.leftPressableStyle}
                    onPress={() => { navigation.goBack()}}
                    >
                    <Image 
                        style={styles.leftIconStle}
                        source={require('./../Images/AppBar/left-arrow.png')}
                    />
                    </Pressable>
                    <Image 
                        style={styles.logoStyle}
                        source={require('./../Images/Logo/NameLogo-White.png')}
                    />
                </View>
        )

}

const styles = StyleSheet.create({
        safeArea: {
            backgroundColor: Colors.headerBlue
        },
        leftPressableStyle:{
            width: 30, 
            height: '100%',
            justifyContent:'center',
        },
        leftIconStle:{
            width: 25, 
            height: 25,
            margin: 10,
        },
        containerStyle:{
                marginTop: 50,
                height: 80,
                backgroundColor: Colors.headerBlue,
                flexDirection:'row'
        },
        logoStyle:{
            width:120,
            height:'100%',
            marginLeft: 10,
            resizeMode: 'contain',
            justifyContent:'center',
         },
    
        
})

export default AppBar;