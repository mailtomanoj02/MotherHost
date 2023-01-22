import React, {useEffect, useRef, useState} from 'react';

import {Animated, Button, Text, View} from 'react-native';
import {FONT_FAMILY} from '../Config/Constant';

const Message = props => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
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
        backgroundColor: props.color,
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
  const [messages, setMessages] = useState([]);
  console.log(props.backgroundColor);
  const color = props.backgroundColor;
  useEffect(() => {
    const message = props.message;
    setMessages([...messages, message]);
  }, []);

  return (
    <>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}>
        {messages.map(message => (
          <Message
            key={message}
            message={message}
            color={color}
            onHide={() => {
              setMessages(messages =>
                messages.filter(currentMessage => currentMessage !== message),
              );
            }}
          />
        ))}
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
