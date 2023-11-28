import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  BackHandler,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Theme from '../../utils/Theme';
import Header from '../../components/Header';
import {useFocusEffect} from '@react-navigation/native';
import YouTube from 'react-native-youtube';
import {Images} from '../../constants/Images';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const PlayVideo = props => {
  const [source, setSource] = useState('');
  const [data, setData] = useState([]);
  const [subdata, setSubData] = useState([]);
  console.log('Url+=======>>>', props.route.params.subarr);

  useFocusEffect(
    React.useCallback(() => {
      let subdat = props?.route?.params?.subdata;
      if (subdat == undefined) {
        let dat = props?.route?.params?.data;
        console.log(dat, 'dfghjklhjkl');
        let arr = props?.route?.params?.arr;
        setSource(dat?.videoUrl);
        setData(arr);
      } else {
        console.log('Subb', subdat);
        let ar = props?.route?.params?.subarr;
        setSource(subdat?.youtubeVideoId);
        setSubData(ar);
      }
      return () => {
        setSource(''), setData([]);
      };
    }, [source]),
  );

  return (
    <View style={{backgroundColor: Theme.white, flex: 1}}>
      <Header
        icon={true}
        // onPressIcon={() => props.navigation.navigate('Setting')}
        // iconName="settings"
        title="Play Video"
        backIcon={() => props.navigation.goBack()}
      />
      <ImageBackground style={{flex: 1}} source={Images.background}>
        <YouTube
          videoId={source}
          apiKey="AIzaSyBVu5OTBmotsUFX6GauJRrCrA9LwUhip8Q"
          play
          loop
          style={{height: Theme.screenHeight / 3}}
        />
        <View>
          <Text
            style={{
              fontSize: Theme.screenHeight / 40,
              fontFamily: Theme.fontFamily,
              marginVertical: Theme.screenHeight / 70,
              marginLeft: Theme.screenWidth / 20,
            }}>
            All Playlist
          </Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={data.length > 0 ? data : subdata}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{
                  marginTop: Theme.screenHeight / 80,
                  flexDirection: 'row',
                  flex: 1,
                }}
                onPress={() => {
                  // setSource(item.videoUrl)
                  console.log('==>>', item.videoUrl, source);
                }}>
                <Text
                  style={{
                    color: Theme.black,
                    fontSize: 17,
                    marginHorizontal: Theme.screenWidth / 20,
                    paddingTop: Theme.screenHeight / 30,
                  }}>
                  {index + 1}
                </Text>
                <Image
                  source={{
                    uri:
                      item.categoryThumbnailUrl == null || undefined
                        ? item.songThumbnail
                        : item.categoryThumbnailUrl,
                  }}
                  style={{height: 80, width: 80}}
                />
                <View style={{marginLeft: Theme.screenWidth / 20}}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: Theme.screenHeight / 60,
                      width: Theme.screenWidth / 2,
                      marginVertical: Theme.screenHeight / 80,
                      fontFamily: Theme.fontFamily,
                    }}>
                    {item.mediaCategoryName == null || undefined
                      ? item.youtubeVideoTitle
                      : item.mediaCategoryName}
                  </Text>
                  <Text
                    style={{color: 'grey', fontSize: Theme.screenHeight / 70}}>
                    {item.mediaSubCategoryName}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    height: screenHeight / 2.5,
    width: '100%',
  },
  mediaControls: {
    width: screenHeight - 170,
    width: '100%',
    flex: 1,
    alignSelf:
      Platform.OS === 'android'
        ? screenHeight < 800
          ? 'center'
          : 'flex-start'
        : 'center',
  },
  backgroundVideoFullScreen: {
    height: screenHeight,
    width: screenWidth,
  },
});

export default PlayVideo;
