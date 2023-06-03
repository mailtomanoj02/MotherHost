import * as React from 'react';
import {Platform, View} from 'react-native';
import {useEffect} from 'react';
import OneSignal from 'react-native-onesignal';
import {getUserId, isUserLoggedIn} from '../../utils/Utils';
import {isValidElement} from '../../utils/Helper';
import {useDispatch} from 'react-redux';
import {fetchAPIAction} from '../../redux/Action';

const OneSignalNotificationManager = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    OneSignal.setAppId('d5da1e7b-afbe-4395-b296-f962b9db0af5');

    OneSignal.promptForPushNotificationsWithUserResponse();

    //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        console.log(
          'OneSignal: notification will show in foreground:',
          notificationReceivedEvent,
        );
        let notification = notificationReceivedEvent.getNotification();
        // console.log('notification: ', notification);
        const data = notification.additionalData;
        // console.log('additionalData: ', data);
        // Complete with null means don't show a notification.
        notificationReceivedEvent.complete(notification);
      },
    );

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notification => {
      // console.log('OneSignal: notification opened:', notification);
    });
    fetchDeviceState();
  }, [fetchDeviceState]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchDeviceState() {
    const data = await OneSignal.getDeviceState();
    if (isValidElement(data?.userId) && isUserLoggedIn()) {
      const params = {
        clientid: getUserId(),
        playerid: data?.userId,
        usertype: Platform.OS == 'ios' ? 'ios' : 'android',
      };
      dispatch(fetchAPIAction('clientcustom.php', params));
    }
  }

  return <View />;
};

export default OneSignalNotificationManager;
