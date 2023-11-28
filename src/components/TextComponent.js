import React, {Component} from 'react';
import {View, Text, TextInput, Image} from 'react-native';
import Theme from '../utils/Theme';

import Ionicons from 'react-native-vector-icons/Ionicons'

const TextComponent = ({
  placeholder,
  value,
  editable,
  onChangeText,
  keyboardType,
  image,
  source,
  secureTextEntry,
  iconPress
}) => {
  return (
    <View
      style={{
        backgroundColor: '#383838',
        flexDirection: 'row',
        elevation: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        paddingLeft: 4,
      }}>
      <TextInput
      editable={editable}
        value={value}
       
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        style={{
          flex: 1,
          fontFamily:Theme.fontFamily,
          height: Theme.screenHeight/18,
          color:editable?Theme.black:'grey',
          fontSize: Theme.screenWidth/18,
          backgroundColor: '#383838',
          borderColor:Theme.black,
        //   borderWidth:0.1,
          paddingLeft: 10,
          fontSize: 15,
          // color: Theme.black,
          borderRadius: 10,
        //   fontFamily: Theme.fontFamily,
        }}
        placeholder={placeholder}
        placeholderTextColor={Theme.black}
        onChangeText={onChangeText}
      />
      <Ionicons
      onPress={iconPress}
        name={source}
        size={18}
        color={Theme.black}
        style={{
            padding:2,
            // borderColor:'red',
            // borderWidth:1,
         marginHorizontal:Theme.screenWidth/26
        //   marginRight: Theme.screenWidth/10,
        }}
      />
    </View>
  );
};
export default TextComponent;