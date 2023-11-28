import React, { Component } from 'react';
import { View, Text,Image, StyleSheet } from 'react-native';
import { Images } from '../constants/Images';
import Theme from '../utils/Theme';

const Error = ({error}) => {
    return (
        <View style={styles.containers}>
        {/* <Image source={Images.nodata} style={{height:Theme.screenHeight/6,width:Theme.screenWidth/2}} /> */}
        <Text style={{color:Theme.black,fontSize:Theme.screenHeight/60,marginTop:Theme.screenHeight/50}}>{error}</Text>
        </View>
        );
};

const styles = StyleSheet.create({
    containers: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default Error;
