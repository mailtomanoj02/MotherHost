import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import Colors from '../Themes/Colors';
import AppBar from './AppBar';

const WebviewScreen = props => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUrl(props.route.params.weburl);
  }, [props.route.params.weburl]);
  const handleLoad = () => {
    setIsLoading(false);
  };
  return (
    <View style={styles.rootContainer}>
      <AppBar />
      <WebView
        source={{
          uri: url,
        }}
        onLoad={handleLoad}
      />
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Colors.headerBlue} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default WebviewScreen;
