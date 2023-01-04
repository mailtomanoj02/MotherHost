import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import WebView from "react-native-webview";
import AppBar from './AppBar'

const WebviewScreen = (props) => {
    const [url, setUrl] = useState('')
    useEffect(() => {
        console.log('useEffect');
        setUrl(props.route.params.weburl)
    }, [])
    return (
                <View style={{flex: 1}}>
                <AppBar/>
                <WebView
                    source={{
                        uri: url
                      }}
                ></WebView>
                </View>
    );
}

export default WebviewScreen;
