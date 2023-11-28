import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, BackHandler } from 'react-native';
import VideoList from '../Video/VideoList';

import SelfieCamera from '../SelfieCamera/Selfie';
import Theme from '../../utils/Theme';
import Icon from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Home from './Home';
import LinearGradient from 'react-native-linear-gradient';
import AudioCatagories from '../Audio/AudioCatagories';
import JokesCatagories from '../Jokes/JokesCatagories';

const Tab = createBottomTabNavigator();

const Dashboard = () => {
  function handleBackButton() {
    BackHandler.exitApp();
    return true;
  }
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Post':
              iconName = 'edit';
              break;
            default:
              iconName = 'circle';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Theme.primary,
        inactiveTintColor: '#777',
      }}
    >
      <Tab.Screen name="Home" component={Home}
        // listeners={{
        //   focus: () => BackHandler.addEventListener('hardwareBackPress', handleBackButton)
        //   , blur: () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton)
        // }}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen name="Videos" component={VideoList}
        options={{
          tabBarLabel: 'Videos',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="message-video" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={SelfieCamera}

        options={() => ({
          tabBarLabel: "",
          tabBarIcon: ({ tintColor }) => (
            <View>
              <LinearGradient style={styles.iconTabRound} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} colors={['#000', Theme.primary]}>
                <Icon name="camera" size={26} color='#FFF' />
              </LinearGradient>
            </View>
          ),
        })}
      />
      <Tab.Screen name="Audios" component={AudioCatagories}
        options={{
          tabBarLabel: 'Audios',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="audiotrack" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen name="JokesCatagories" component={JokesCatagories}
        options={{
          tabBarLabel: 'Jokes',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="sticker-emoji" color={color} size={26} />
          ),
        }}
      />

    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  iconTabRound: {
    width: 60,
    height: 60,
    borderRadius: 30,
    top: -10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: Theme.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  }
});

export default Dashboard;

