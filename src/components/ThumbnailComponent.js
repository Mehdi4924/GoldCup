import React, {Component} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Theme from '../utils/Theme';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

const ThumbnailComponent = ({thumb, width, height, icon, visible}) => {
  return (
    <View>
      <ShimmerPlaceHolder
        shimmerColors={['#40392f', '#40392f', '#000']}
        visible={visible}
        style={{borderRadius: 8, width: width, height: height}}
        LinearGradient={LinearGradient}>
        <ImageBackground
          source={{uri: thumb}}
          resizeMode="cover"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: width,
            height: height,
          }}
          imageStyle={{borderRadius: 8}}>
          {icon && (
            <AntDesign
              name="play"
              color={Theme.black}
              size={Theme.screenHeight / 40}
            />
          )}
        </ImageBackground>
      </ShimmerPlaceHolder>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ThumbnailComponent;
