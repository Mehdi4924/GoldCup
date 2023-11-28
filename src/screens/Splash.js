import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Animated, ImageBackground} from 'react-native';
import {get_data} from '../components/Controller';
import {Images} from '../constants/Images';
import {setMinutes, setSeconds, setVideo} from '../store/mainSlice';
import {GetPopUpVideo} from '../utils/Api/Api_controller';
import Theme from '../utils/Theme';
import {useDispatch} from 'react-redux';

const Splash = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    spring();
    setTimeout(() => {
      getVideos();
      // getData();
    }, 2000);
  }, []);

  const getVideos = async () => {
    let res = await GetPopUpVideo();
    // console.log(res);
    if (res?.data != null || undefined) {
      let sec = await parseInt(res?.data?.hideVideoAfterFollowingSecs + '000');
      const minute = await parseInt(
        res?.data?.showSkippableVideoAfterFollowingMins * 60 + '000',
      );
      await dispatch(setMinutes(minute));
      await dispatch(setSeconds(sec));
      await dispatch(setVideo(res?.data?.videoUrl));
      // console.log("URL ", res?.data?.videoUrl);
      getData();
    }
  };
  const getData = async () => {
    const value = await get_data('value');
    try {
      const valusdfe = await get_data('email');
      // console.log("dsadasdasda", valusdfe?.signin);
      const myObj = valusdfe;
      if (value == null) {
        props.navigation.navigate('OnBoarding');
      } else {
        if (myObj?.signin == 'false'||myObj?.signin==undefined ||myObj?.signin==null ) {
          props.navigation.navigate('Signin');
        } else {
          // dispatch(setUser(valusdfe))
          props.navigation.navigate('Dashboard');
        }
      }
    } catch (error) {
      // console.log(error);
    }
  };

  var springValue = new Animated.Value(1);
  const spring = () => {
    springValue.setValue(-2);
    Animated.timing(springValue, {
      useNativeDriver: true,
      toValue: 1,
    }).start();
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{
          flex: 1,
          height: Theme.screenHeight,
          width: Theme.screenWidth,
          justifyContent: 'center',
        }}
        source={Images.background}>
        {/* <Image source={Images.left} style={styles.right} /> */}
        <Animated.View
          style={{
            transform: [{scale: springValue}],
          }}>
          <Image source={Images.logo} style={styles.logo} />
        </Animated.View>
        {/* <Image source={Images.right} style={styles.left} /> */}
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: Theme.screenHeight / 4.5,
    width: Theme.screenHeight / 4,
    alignSelf: 'center',
  },
  right: {
    width: Theme.screenWidth / 6.5,
    height: Theme.screenHeight / 3.5,
    alignSelf: 'flex-end',
  },
  left: {
    width: Theme.screenWidth / 6.5,
    height: Theme.screenHeight / 3.5,
    alignSelf: 'flex-start',
  },
});

export default Splash;
