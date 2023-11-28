import React, {Component, useRef, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  PermissionsAndroid,
  Dimensions,
  Pressable,
  ScrollView,
} from 'react-native';

const Dev_Height = Dimensions.get('window').height;
const Dev_Width = Dimensions.get('window').width;
import TrackPlayer, {
  usePlaybackState,
  useProgress,
  State,
} from 'react-native-track-player';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Slider from '@react-native-community/slider';
// import RNFetchBlob from 'rn-fetch-blob'

import Theme from '../../utils/Theme';
import {Images} from '../../constants/Images';
import Loader from '../../components/Loader';
import NotificationPopup from 'react-native-push-notification-popup';

const AudioPlayer = props => {
  const pop = useRef();

  const playBackstate = usePlaybackState();
  const progress = useProgress();
  const item = props.route.params.data;
  // console.log(item);
  const [modal, setModal] = useState(false);
  const [video, setVideo] = useState('');
  const [name, setname] = useState('');
  const [catagory, setCatagory] = useState('');
  const [tunes, setTunes] = useState('');
  const [isloading, setisloading] = useState(false);
  const [image, setImage] = useState();
  const [openVideo, setOpenVideo] = useState(false);
  const [value, setValue] = React.useState(2.3);
  const [sound, setSound] = React.useState(true);
  const valueChange = value => {
    const x = value.toFixed(2);
    setValue(x);
  };

  const tooglePlay = async playBackstate => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack !== null) {
      if (playBackstate === State.Playing) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.play();
      }
    }
  };
  const renderCustomPopup = ({title}) => (
    <View style={styles.popup}>
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

  const requestToPermissions = async () => {
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
    // const date = new Date();
    // const { config, fs } = RNFetchBlob;
    // let PictureDir = fs.dirs.MusicDir;
    // // const {tunes, token, currentTrackIndex} = this.state;
    // // let {url, name} = tunes[currentTrackIndex];
    // RNFetchBlob.config({
    //     fileCache: true,
    //     appendExt: 'mp3',
    //     addAndroidDownloads: {
    //         useDownloadManager: true,
    //         notification: true,
    //         // title: name,
    //         path:
    //             PictureDir +
    //             '/audios' +
    //             Math.floor(date.getTime() +
    //                 date.getSeconds() / 2),
    //         description: 'Downloading the file',
    //     },
    // })
    //     .fetch('GET', item.downloadSongUrl)
    //     .then(res => {
    //         console.log('res', res);
    //         // console.log('The file is save to ', res.path());
    //         showPopup('The file is save to ' + res.path())
    //         setisloading(false)
    //     }).catch(error)
    //     {
    //         setisloading(false)
    //     }
  };

  useEffect(() => {
    playSound();
    TrackPlayer.play();
    // const dat = props.route.params.data;
    // console.log(dat);
    setname(item.songName.split('.mp3'));
    // setCatagory(dat.catagory);
    setImage(item.imageUrl);

    return () => {
      TrackPlayer.pause();
    };
  }, []);
  const playSound = async () => {
    if (sound) {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add({
        id: 'trackId',
        url: item.downloadSongUrl,
        title: item.songName,
      });
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Loader loading={isloading} />
      <SafeAreaView style={styles.contanier}>
        <View style={styles.mainbar}>
          <Pressable
            style={{marginLeft: '5%'}}
            onPress={() => props.navigation.goBack()}>
            <AntDesign name="left" color={Theme.black} size={24} />
          </Pressable>
          <Text style={styles.now_playing_text}> Now Playing </Text>
          {/* //// */}
          <Entypo
            name="download"
            onPress={() => requestToPermissions()}
            color={Theme.black}
            size={24}
            style={{marginLeft: '20%'}}
          />
        </View>
        <View style={styles.music_logo_view}>
          <Image
            source={
              item.songThumbnail == null
                ? Images.musicicon
                : {uri: item.songThumbnail}
            }
            style={styles.image_view}
          />
        </View>
        <View style={styles.name_of_song_View}>
          <Text style={styles.name_of_song_Text1}>{name}</Text>
          <Text style={styles.name_of_song_Text2}>{catagory}</Text>
        </View>

        <View style={styles.slider_view}>
          <Text style={styles.slider_time}>
            {' '}
            {new Date(progress.position * 1000)
              .toISOString()
              .substr(14, 5)}{' '}
          </Text>
          <Slider
            style={styles.slider_style}
            minimumValue={0}
            maximumValue={progress.duration}
            minimumTrackTintColor={Theme.primary}
            maximumTrackTintColor={Theme.TrackColor}
            thumbTintColor={Theme.primary}
            value={progress.position}
            onSlidingComplete={async value => {
              await TrackPlayer.seekTo(value);
            }}
            onValueChange={value => valueChange(value)}
          />
          <Text style={styles.slider_time}>
            {' '}
            {new Date((progress.duration - progress.position) * 1000)
              .toISOString()
              .substr(14, 5)}{' '}
          </Text>
        </View>
        <View style={styles.functions_view}>
          <Entypo
            name="controller-fast-backward"
            size={24}
            color={Theme.primary}
          />
          <Pressable
            onPress={() => tooglePlay(playBackstate)}
            style={{marginLeft: '12%'}}>
            <AntDesign
              name={
                playBackstate === State.Playing ? 'pausecircleo' : 'playcircleo'
              }
              size={50}
              color={Theme.primary}
            />
          </Pressable>
          <Entypo
            name="controller-fast-forward"
            size={24}
            color={Theme.primary}
            style={{marginLeft: '12%'}}
          />
        </View>
      </SafeAreaView>
      <NotificationPopup
        ref={pop}
        renderPopupContent={renderCustomPopup}
        shouldChildHandleResponderStart={true}
        shouldChildHandleResponderMove={true}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contanier: {
    backgroundColor: Theme.white,
    height: Dev_Height,
    width: Dev_Width,
  },
  mainbar: {
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  now_playing_text: {
    fontSize: Theme.screenHeight / 40,
    color: Theme.black,
    marginLeft: '24%',
    fontFamily: Theme.fontFamily,
  },
  music_logo_view: {
    height: '46%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image_view: {
    height: '100%',
    width: '90%',
    borderRadius: 10,
  },
  name_of_song_View: {
    height: '15%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name_of_song_Text1: {
    width: Theme.screenWidth / 1.8,
    textAlign: 'center',
    fontSize: Theme.screenHeight / 40,
    color: Theme.textColor,
    // fontWeight: "500"
    fontFamily: Theme.fontFamily,
  },
  name_of_song_Text2: {
    color: Theme.textColor,
    marginTop: '4%',
  },
  slider_view: {
    height: '7%',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  slider_style: {
    height: '40%',
    width: '70%',
  },
  slider_time: {
    fontSize: Theme.screenHeight / 60,
    width: 40,
    marginLeft: '2%',
    fontFamily: Theme.fontFamily,
    color: Theme.textColor,
  },
  functions_view: {
    flexDirection: 'row',
    height: '10%',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  recently_played_view: {
    height: '25%',
    width: '100%',
  },
  recently_played_text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Theme.textColor,
    marginLeft: '5%',
    marginTop: '6%',
  },
  recently_played_list: {
    backgroundColor: Theme.lightPink,
    height: '50%',
    width: '90%',
    borderRadius: 10,
    marginLeft: '5%',
    marginTop: '5%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  recently_played_image: {
    height: '80%',
    width: '20%',
    borderRadius: 10,
  },
  recently_played_list_text: {
    height: '100%',
    width: '60%',
    justifyContent: 'center',
  },
  recently_played_list_text1: {
    fontSize: 15,
    marginLeft: '8%',
  },
  recently_played_list_text2: {
    fontSize: 16,
    color: Theme.textColor,
    marginLeft: '8%',
  },
  containerStyle1: {
    backgroundColor: 'rgba(10, 10, 10,0.5)',
    height: Theme.screenHeight / 1,
  },
  popup: {
    backgroundColor: Theme.primary,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: Theme.screenHeight / 40,
  },
});

//make this component available to the app
export default AudioPlayer;
