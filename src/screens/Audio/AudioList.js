//import liraries
import React, {Component, useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import AudioComponent from '../../components/AudioComponent';
import Header from '../../components/Header';
import {Card, Modal} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';

import VideoModal from '../../components/VideoModal';
import Theme from '../../utils/Theme';
import BannerAdd from '../../components/BanerAdd';
import {getAudios} from '../../utils/Api/Api_controller';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import {useSelector} from 'react-redux';
import { Images } from '../../constants/Images';

const AudioList = props => {
  const second = useSelector((state: RootState) => state.nameReducer.seconds);
  const minute = useSelector((state: RootState) => state.nameReducer.minutes);

  const [modal, setModal] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [seconds, setSeconds] = useState(false);
  const [data, setData] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {}, []);
  useFocusEffect(
    React.useCallback(() => {
      setVisible(false);
      getAudiosData();
      var oneSec = setTimeout(() => {}, 1000);

      var inter = setInterval(() => {
        setSeconds(false);
        setModal(true);
        const timer = setTimeout(() => {
          setSeconds(true);
        }, second);
        return () => {
          clearTimeout(timer);
        };
      }, minute);
      return () => {
        clearTimeout(oneSec);
        clearInterval(inter);
      };
    }, []),
  );

  const getAudiosData = async () => {
    setisloading(true);
    let vari = props.route.params.id;
    let res = await getAudios(vari);
    if (res?.data) {
      console.log(JSON.stringify(res?.data, null, 2), 'sab okkkk');
      setData(res?.data.multiSelectSongsMusicSubCategoriesList);
      setVisible(true);
      setisloading(false);
    } else {
      setisloading(false);

      setVisible(true);
    }
  };

  // const mediaJSON = [{
  //   id: 0,
  //   name: 'Mad Love',
  //   catagory: 'Mabel',
  //   image: Images.song,
  //   percent: 100,
  //   audio: Images.firstaudio,
  // },
  // {
  //   id: 1,
  //   name: 'Madley',
  //   catagory: 'Ariana Grande',
  //   image: Images.song1,
  //   percent: 30,
  //   audio: Images.secondaudio,

  // },
  // {
  //   id: 2,
  //   name: 'Bollywood',
  //   catagory: 'Missi Higens',
  //   image: Images.song3,
  //   percent: 10,
  //   audio: Images.firstaudio,

  // },
  // {
  //   id: 3,
  //   name: 'Ashiq',
  //   catagory: '5 seconds of summer',
  //   image: Images.song1,
  //   percent: 20,
  //   audio: Images.secondaudio,

  // },
  // {
  //   id: 4,
  //   name: 'Remix ',
  //   catagory: 'Kassy Musgraves',
  //   image: Images.song4,
  //   percent: 67,
  //   audio: Images.firstaudio,
  // },
  // {
  //   id: 5,
  //   name: 'Jaguar',
  //   catagory: 'Mabel',
  //   image: Images.song1,
  //   percent: 23,
  //   audio: Images.secondaudio,
  // },
  // {
  //   id: 6,
  //   name: 'Brown Munday',
  //   catagory: 'Missi Higens',
  //   image: Images.song3,
  //   percent: 40,
  //   audio: Images.firstaudio,
  // },
  // {
  //   id: 7,
  //   name: 'Bohemia',
  //   catagory: '5 seconds of summer',
  //   image: Images.song,
  //   percent: 20,
  //   audio: Images.secondaudio,
  // },
  // {
  //   id: 8,
  //   name: 'Gippy  Grewal',
  //   catagory: 'Mabel',
  //   image: Images.song4,
  //   percent: 70,
  //   audio: Images.firstaudio,
  // },
  // {
  //   id: 9,
  //   name: 'Mad Love',
  //   catagory: 'Ariana Grande',
  //   image: Images.song3,
  //   percent: 100,
  //   audio: Images.secondaudio,
  // },

  // ];
  return (
    <View style={styles.container}>
      <Header
        icon={true}
        title="Audio Songs List"
        backIcon={() => props.navigation.goBack()}
        // onPressIcon={() => props.navigation.navigate('Setting')}
        // iconName="settings"
      />
      <ImageBackground source={Images.background} style={{flex:1}}>
      {isloading ? (
        <Loader loading={isloading} />
      ) : data.length > 0 ? (
        <FlatList
          onRefresh={() => getAudiosData()}
          refreshing={isloading}
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <View>
              {index == 2 && <BannerAdd />}
              <AudioComponent
                visi={visible}
                percent={item.percent}
                onPress={() =>
                  props.navigation.navigate('Player', {data: data})
                }
                name={item.songName.split('.mp3')}
                url={item.songThumbnail}
                catagory={props.route.params.catname}
                image={item.image}
              />
            </View>
          )}
        />
      ) : (
        <Error error="No data Found" />
      )}
      <Modal visible={modal}>
        {seconds && (
          <Pressable
            style={{zIndex: 1, alignSelf: 'flex-end', right: 20, bottom: 20}}
            onPress={() => {
              setModal(false), setSeconds(false);
            }}>
            <AntDesign name="closecircle" color={Theme.black} size={25} />
          </Pressable>
        )}
        <VideoModal
          onEnd={() => {
            setModal(false), setSeconds(false);
          }}
          iconPress={true}
        />
      </Modal>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  containerStyle1: {
    backgroundColor: 'rgba(10, 10, 10,0.5)',
    height: Theme.screenHeight / 1,
  },
});

export default AudioList;
