import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AudioPlayer from '../screens/Audio/AudioPlayer';
import Splash from '../screens/Splash';
import Dashboard from '../screens/Home/Dashboard';

import Signin from '../screens/Auth/Signin';
import Signup from '../screens/Auth/Signup';
import OnBoarding from '../screens/Auth/onBoarding';
import VideoSubcatagory from '../screens/Video/VideoSubCatagory';
import Videos from '../screens/Video/Videos'
import PlayVideo from '../screens/Video/PlayVideo';
import AudioList from '../screens/Audio/AudioList';
import JokesList from '../screens/Jokes/JokesList';
import Setting from '../screens/Settings/setting';
import CompleteProfile from '../screens/Auth/CompleteProfile';
import ResetPassword from '../screens/Auth/ResetPassword';
import AudioSubCatagories from '../screens/Audio/AudioSubCatagories';
import Player from '../screens/Audio/player';


const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
          headerShown:false
      }} >
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="AudioPlayer" component={AudioPlayer} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
          <Stack.Screen name="VideoSubcatagory" component={VideoSubcatagory} />
          <Stack.Screen name="video" component={Videos}/>
          <Stack.Screen name="PlayVideo" component={PlayVideo} />
          <Stack.Screen name="AudioList" component={AudioList} />
          <Stack.Screen name="JokesList" component={JokesList} />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="AudioSubCatagories" component={AudioSubCatagories} />
          <Stack.Screen name="Player" component={Player} />




      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default Routes;