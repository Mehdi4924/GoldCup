import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import VideoPlayer from 'react-native-video-player';
import { useSelector } from 'react-redux';
import Theme from '../utils/Theme';


const VideoModal = ({ onEnd }) => {
    const result = useSelector((state: RootState) => state.nameReducer.video);
    // console.log("res",result);
    return (
        <View>
            <VideoPlayer
                hideControlsOnStart={true}
                disableSeek={true}
                video={{ uri: result }}
                videoWidth={Theme.screenWidth}
                resizeMode="cover"
                progressUpdateInterval={1000}
                videoHeight={Theme.screenHeight / 3}
                hideControlsOnStart={true}
                autoplay={true}
                style={{ borderRadius: 0 }}
                customStyles={{
                    controls: false,
                }}
                style={{ backgroundColor: Theme.white }}
                onEnd={onEnd}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        marginLeft: 10,
    }
});

export default VideoModal;
