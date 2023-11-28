import React, {useEffect, useRef, useState} from 'react';
import {
  PermissionsAndroid,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Share,
  Image,
  Animated,
  ImageBackground,
} from 'react-native';

import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Images} from '../../constants/Images';
import Theme from '../../utils/Theme';
import Header from '../../components/Header';
import RNFetchBlob from 'rn-fetch-blob';
import NotificationPopup from 'react-native-push-notification-popup';
import Loader from '../../components/Loader';

const {width, height} = Dimensions.get('window');
const Player = props => {
  const playBackState = usePlaybackState();
  const progress = useProgress();
  const pop = useRef();
  const [heart, setHeart] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [urls, setUrl] = useState('');
  const [songIndex, setsongIndex] = useState(0);
  const [repeatMode, setRepeatMode] = useState('off');
  const [trackTitle, setTrackTitle] = useState();
  const [trackArtist, setTrackArtist] = useState();
  const [trackArtwork, setTrackArtwork] = useState();

  const ite = props.route.params.data;
  let songs = [];
  ite.map((item, index) => {
    songs.push({
      id: index,
      title: item.songName,
      artwork: item.songThumbnail,
      url: item.downloadSongUrl,
    });
  });
  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
      });
      await TrackPlayer.add(songs);
      await TrackPlayer.play();
    } catch (error) {
      console.log(error);
    }
  };

  const togglePlayBack = async playBackstate => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack !== null) {
      if (playBackstate === State.Playing) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.play();
      }
    }
  };

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const {title, artwork, artist, url} = track;
      setTrackTitle(title);
      setUrl(url);
      setTrackArtist(artist);
      setTrackArtwork(artwork);
    }
  });

  const repeatIcon = () => {
    if (repeatMode == 'off') {
      return 'repeat-off';
    }

    if (repeatMode == 'track') {
      return 'repeat-once';
    }

    if (repeatMode == 'repeat') {
      return 'repeat';
    }
  };

  const changeRepeatMode = () => {
    if (repeatMode == 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeatMode('track');
    }

    if (repeatMode == 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setRepeatMode('repeat');
    }

    if (repeatMode == 'repeat') {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      setRepeatMode('off');
    }
  };

  const skipTo = async trackId => {
    await TrackPlayer.skip(trackId);
  };

  useEffect(() => {
    setupPlayer();

    scrollX.addListener(({value}) => {
      const index = Math.round(value / width);
      skipTo(index);
      setsongIndex(index);
    });

    return () => {
      scrollX.removeAllListeners();
      TrackPlayer.destroy();
    };
  }, []);

  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  };

  const skipToPrevious = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  };
  const shar = async ur => {
    console.log(ur);
    await Share.share({message: ur});
  };

  const requestToPermissions = async () => {
    console.log('sdafads');
    try {
      setisloading(true);
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Music',
          message: 'App needs access to your Files... ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('startDownload...');
        startDownload();
      }
    } catch (err) {
      setisloading(false);
      console.log(err);
    }
  };
  const startDownload = () => {
    const date = new Date();
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.MusicDir;
    // const {tunes, token, currentTrackIndex} = this.state;
    // let {url, name} = tunes[currentTrackIndex];
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'mp3',
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        // title: name,
        path:
          PictureDir +
          '/audios' +
          Math.floor(date.getTime() + date.getSeconds() / 2),
        description: 'Downloading the file',
      },
    })
      .fetch('GET', urls)
      .then(res => {
        console.log('res', res);
        // console.log('The file is save to ', res.path());
        showPopup('The file is save to ' + res.path());
        setisloading(false);
      })
      .catch(error);
    {
      setisloading(false);
    }
  };
  const renderCustomPopup = ({title}) => (
    <View style={style.popup}>
      <Text style={{color: Theme.black, fontSize: Theme.screenHeight / 60}}>
        {title}
      </Text>
    </View>
  );
  const showPopup = message => {
    pop.current.show({
      onPress: function () {
        console.log('Pressed');
      },
      appTitle: 'Success',
      title: message,
      slideOutTime: 2000,
    });
  };
  const renderSongs = ({item, index}) => {
    return (
      <Animated.View style={style.mainWrapper}>
        <View style={[style.imageWrapper, style.elevation]}>
          <Image
            source={{uri: item.artwork}}
            // source={trackArtwork}
            style={style.musicImage}
          />
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <Header
        backIcon={() => props.navigation.goBack()}
        title="Song"
        // onPressIcon={() => props.navigation.navigate('Setting')}
        icon={true}
        // iconName="settings"
      />
      <Loader loading={isloading} />
      <ImageBackground source={Images.background} style={{flex: 1}}>
        {/* music player section */}
        <View style={style.mainContainer}>
          {/* Image */}

          <Animated.FlatList
            ref={songSlider}
            renderItem={renderSongs}
            data={songs}
            keyExtractor={item => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {x: scrollX},
                  },
                },
              ],
              {useNativeDriver: true},
            )}
          />

          {/* Title & Artist Name */}
          <View>
            <Text style={[style.songContent, style.songTitle]}>
              {trackTitle}
            </Text>
            <Text style={[style.songContent, style.songArtist]}>
              {trackArtist}
            </Text>
          </View>

          {/* songslider */}
          <View>
            <Slider
              style={style.progressBar}
              value={progress.position}
              minimumValue={0}
              maximumValue={progress.duration}
              thumbTintColor={Theme.primary}
              minimumTrackTintColor={Theme.primary}
              maximumTrackTintColor="#fff"
              onSlidingComplete={async value => {
                await TrackPlayer.seekTo(value);
              }}
            />

            {/* Progress Durations */}
            <View style={style.progressLevelDuraiton}>
              <Text style={style.progressLabelText}>
                {new Date(progress.position * 1000)
                  .toLocaleTimeString()
                  .substring(3)}
              </Text>
              <Text style={style.progressLabelText}>
                {new Date((progress.duration - progress.position) * 1000)
                  .toLocaleTimeString()
                  .substring(3)}
              </Text>
            </View>
          </View>

          {/* music control */}
          <View style={style.musicControlsContainer}>
            <TouchableOpacity onPress={skipToPrevious}>
              <Ionicons
                name="play-skip-back-outline"
                size={35}
                color={Theme.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => togglePlayBack(playBackState)}>
              <Ionicons
                name={
                  playBackState === State.Playing
                    ? 'ios-pause-circle'
                    : 'ios-play-circle'
                }
                size={75}
                color={Theme.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={skipToNext}>
              <Ionicons
                name="play-skip-forward-outline"
                size={35}
                color={Theme.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* bottom section */}
        <View style={style.bottomSection}>
          <View style={style.bottomIconContainer}>
            <TouchableOpacity onPress={() => setHeart(!heart)}>
              <Ionicons
                name={heart ? 'ios-heart' : 'heart-outline'}
                size={30}
                color={heart ? Theme.primary : '#888888'}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={changeRepeatMode}>
              <MaterialCommunityIcons
                name={`${repeatIcon()}`}
                size={30}
                color={repeatMode !== 'off' ? Theme.primary : '#888888'}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => shar(urls)}>
              <Ionicons name="share-social" size={30} color="#888888" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => requestToPermissions()}>
              <Ionicons name="md-download" size={30} color="#888888" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <NotificationPopup
        ref={pop}
        renderPopupContent={renderCustomPopup}
        shouldChildHandleResponderStart={true}
        shouldChildHandleResponderMove={true}
      />
    </SafeAreaView>
  );
};

export default Player;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSection: {
    borderTopColor: '#393E46',
    borderWidth: 1,
    width: width,
    alignItems: 'center',
    paddingVertical: 15,
  },

  bottomIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },

  mainWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },

  imageWrapper: {
    width: 300,
    height: 340,
    marginBottom: 25,
  },
  musicImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  elevation: {
    elevation: 5,

    shadowColor: '#ccc',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  songContent: {
    textAlign: 'center',
    color: '#EEEEEE',
  },
  songTitle: {
    fontSize: Theme.screenHeight / 50,
    width: Theme.screenWidth / 1.2,
    textAlign: 'center',
    fontFamily: Theme.fontFamily,
    fontWeight: '600',
  },

  songArtist: {
    fontSize: 16,
    fontWeight: '300',
  },

  progressBar: {
    width: Theme.screenWidth / 1,
    height: 40,
    marginTop: Theme.screenHeight / 40,
    flexDirection: 'row',
  },
  progressLevelDuraiton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.screenWidth / 40,
  },
  progressLabelText: {
    color: '#FFF',
    fontFamily: Theme.fontFamily,
  },

  musicControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    width: '60%',
  },
  popup: {
    backgroundColor: Theme.primary,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: Theme.screenHeight / 40,
  },
});
