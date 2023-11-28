import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { Images } from '../../constants/Images';
import Theme from '../../utils/Theme';
import { save_data, get_data } from '../../components/Controller'

const OnBoarding = (props) => {
  const setView = async () => {
    try {
      await save_data('value', 'true');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Onboarding
      
      titleStyles={{fontFamily:Theme.fontFamily}}
        bottomBarColor='grey'
        onSkip={() => { setView(), props.navigation.navigate('Signin') }}
        onDone={() => { setView(), props.navigation.navigate('Signin') }}

        pages={[
          {
            backgroundColor: Theme.white,
            image: <Image source={Images.v1} style={{ height: 250, width: 250, alignSelf: 'center' }} />,
            title: 'Trending Videos  ',
            subtitle: 'Trending Videos include HD songs ',
          },
          {
            backgroundColor: Theme.white,
            image: <Image source={Images.audio} style={{ height: 250, width: 250, alignSelf: 'center' }} />,
            title: 'Multi Music ',
            subtitle: 'All your favourite music is here',
          },
          {
            backgroundColor: Theme.white,
            image: <Image source={Images.jokesfunny} style={{ height: 200, width: 200, alignSelf: 'center' }} />,
            title: 'Funny Jokes ',
            subtitle: 'Makes your day happy with our jokes',
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});

export default OnBoarding;
