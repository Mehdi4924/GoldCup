//import liraries
import React, { Component } from 'react';
import { View, ImageBackground, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Theme from '../utils/Theme';

const BannerAdd = () => {

    const banner = useSelector((state: RootState) => state.nameReducer.banner);
    return (
        <View style={styles.container}>
             <ImageBackground source={{uri:banner} } imageStyle={{borderRadius:2}}
              style={{ height: Theme.screenHeight / 12,marginVertical:Theme.screenHeight/80 }}
               resizeMode="cover" >
      <Text style={{backgroundColor:'grey',width:Theme.screenWidth/10,padding:2, alignSelf:'flex-end',alignItems:'center',justifyContent:'center',fontSize:Theme.screenHeight/70, textAlign:'center',color:Theme.white}} >Add</Text>
      </ImageBackground>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
flex:1,
// width:'100%'
    },
});

//make this component available to the app
export default BannerAdd;
