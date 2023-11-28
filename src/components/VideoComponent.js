import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import VideoPlayer from 'react-native-video-player';
import Theme from '../utils/Theme';

const VideoComponent = ({thumb,title,video,size,playPress,pauseOnPress,controls}) => {
    return (
        <View style={{width:size,borderRadius:8}}>
          <VideoPlayer
            video={{ uri: video }}
            videoWidth={Theme.screenWidth/1}
            videoHeight={200}
            resizeMode="stretch"
            showDuration={true}
            pauseOnPress={pauseOnPress}
            hideControlsOnStart={true}
            autoplay={true}
            fullscreen={true}
            thumbnail={{ uri: thumb }}
            style={{borderRadius:6}}
            customStyles={{
                // playControl:false,
                playArrow:{fontSize:50},
                playButton:{height:50,width:50},
            }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
});

export default VideoComponent;
