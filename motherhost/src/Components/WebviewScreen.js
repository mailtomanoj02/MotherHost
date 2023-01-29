import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';
import AppBar from './AppBar';

const WebviewScreen = props => {
  const [url, setUrl] = useState('');
  useEffect(() => {
    setUrl(props.route.params.weburl);
  }, [props.route.params.weburl]);
  return (
    <View style={{flex: 1}}>
      <AppBar />
      <WebView
        source={{
          uri: url,
        }}
      />
    </View>
  );
};

export default WebviewScreen;
