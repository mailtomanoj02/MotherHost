import React, {useEffect, useMemo, useRef, useState} from 'react';

import {Animated, Text, View} from 'react-native';
import {FONT_FAMILY} from '../Config/Constant';
import {ToastValue} from '../utils/Utils';
import {isValidString} from '../utils/Helper';

const Message = props => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        // duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        // duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      props.onHide();
    });
  }, []);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          },
        ],
        margin: 10,
        marginBottom: 5,
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 4,
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 6,
      }}>
      <Text style={{color: 'white', fontFamily: FONT_FAMILY.SEMI_BOLD}}>
        {props.message}
      </Text>
    </Animated.View>
  );
};

const Toast = props => {
  const [message, setMessage] = useState('');
  const [toastValue, setToastValue] = useState(ToastValue);
  const color = props.backgroundColor;

  useEffect(() => {
    setMessage(toastValue);
  }, [toastValue]);

  return (
    <>
      <View
        style={{
          position: 'absolute',
          top: 75,
          left: 0,
          right: 0,
        }}>
        {isValidString(message) ? (
          <Message
            message={message}
            color={color}
            onHide={() => {
              setMessage('');
              setToastValue('');
            }}
          />
        ) : null}
      </View>

      {/*<Button*/}
      {/*  title="Add message"*/}
      {/*  onPress={() => {*/}
      {/*    const message = props.message;*/}
      {/*    setMessages([...messages, message]);*/}
      {/*  }}*/}
      {/*/>*/}
    </>
  );
};

export default Toast;
