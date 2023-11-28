import React, {useState, useRef} from 'react';
import {
  View,
  Alert,
  Text,
  Modal,
  BackHandler,
  Platform,
  StyleSheet,
  Pressable,
  FlatList,
  ImageBackground,
} from 'react-native';
import Theme from '../../utils/Theme';
import NetInfo from '@react-native-community/netinfo';
import {SliderBox} from 'react-native-image-slider-box';
import {Images} from '../../constants/Images';
// import { Modal } from 'react-native-paper';
import Header from '../../components/Header';
import {useFocusEffect} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import VideoModal from '../../components/VideoModal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useEffect} from 'react';
import BannerAdd from '../../components/BanerAdd';
import {getHomeData} from '../../utils/Api/Api_controller';
import Loader from '../../components/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {setbanner, setVideo} from '../../store/mainSlice';

const Home = props => {
  const second = useSelector((state: RootState) => state.nameReducer.seconds);
  const minute = useSelector((state: RootState) => state.nameReducer.minutes);

  // console.log(second,minute);
  const [seconds, setSeconds] = useState(false);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState('');
  const [slider, setSlider] = useState([]);
  const [ss, setSe] = useState(0);
  const [visible, setvisible] = useState(false);
  const [isloading, setisloading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let f = setTimeout(() => {
      setModal(false)
      setTimeout(() => {
        setModal(true);
      }, 2000);
      let t = setTimeout(() => {
        setSeconds(true);
      }, 5000);
      return () => {
        clearTimeout(t);
      };
    }, 1000);
    CheckConnectivity();
    getData();
    return () => {
      clearTimeout(f);
    };
  }, []);
  const onBackPa = async () => {
    Alert.alert('Logout', 'Do you really want to exit the application?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          BackHandler.exitApp();
        },
      },
    ]);
    return true;
  };
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = async () => {
        Alert.alert('Logout', 'Do you really want to exit the application?', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              BackHandler.exitApp();
            },
          },
        ]);
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const CheckConnectivity = async () => {
    if (Platform.OS === 'android') {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          console.log('connected');
        } else {
          alert('No Internet Connection');
        }
      });
    }
  };
  const mediaJSON = [
    {
      id: 0,
      name: 'Videos',
      image: Images.vid,
      move: 'Videos',
    },
    {
      id: 1,
      name: 'Jokes',
      image: Images.jok,
      move: 'JokesCatagories',
    },
    {
      id: 2,
      name: 'Audios',
      image: Images.aud,
      move: 'Audios',
    },
    {
      id: 3,
      name: 'Frames',
      image: Images.frame,
      move: 'Camera',
    },
  ];
  const renderSeperator = () => {
    return <View style={{marginVertical: 10}}></View>;
  };

  const getData = async () => {
    setisloading(true);
    setvisible(false);
    let res = await getHomeData();
    if (res?.data) {
      console.log('array containing images', res?.data?.sliderImagesUrls);
      setSlider(res?.data?.sliderImagesUrls);
      dispatch(setbanner(res?.data?.bannerImageUrl));
      setvisible(true);
      setisloading(false);
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
        clearInterval(inter);
      };
    } else {
      setError(res?.message);
      setvisible(true);
      setisloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Loader loading={isloading} />
      <Header
        icon={true}
        image={true}
        onPressIcon={() => props.navigation.navigate('Setting')}
        backIcon={() => onBackPa()}
        iconName="settings"
      />
      <ImageBackground
        style={{flex: 1, height: Theme.screenHeight, width: Theme.screenWidth}}
        source={Images.background}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={
            <View
              style={{
                width: Theme.screenWidth / 2,
                marginTop: Theme.screenHeight / 90,
                marginBottom: Theme.screenHeight / 40,
              }}>
              <ShimmerPlaceHolder
                shimmerColors={['#1c1b1b', '#242424', '#000']}
                visible={visible}
                style={{
                  borderRadius: 15,
                  width: Theme.screenWidth / 1,
                  height: Theme.screenHeight / 5,
                }}
                LinearGradient={LinearGradient}>
                <SliderBox
                  images={slider}
                  pagingEnabled={Platform.select({android: true})}
                  activeOpacity={0.5}
                  sliderBoxHeight={Theme.screenHeight / 5}
                  dotColor={Theme.primary}
                  // autoplay={true}

                  resizeMode="stretch"
                  resizeMode={'contain'}
                  imageLoadingColor={Theme.primary}
                  circleLoop={true}
                  ImageComponentStyle={{
                    borderRadius: 15,
                    width: '96%',
                    marginTop: 4,
                  }}
                />
              </ShimmerPlaceHolder>
            </View>
          }
          style={{alignSelf: 'center'}}
          data={mediaJSON}
          numColumns={2}
          ListFooterComponent={<BannerAdd />}
          ItemSeparatorComponent={renderSeperator}
          renderItem={({item}) => (
            <Pressable
              onPress={() => props.navigation.navigate(item.move)}
              style={{
                width: Theme.screenWidth / 2.2,
                borderRadius: 9,
                marginHorizontal: Theme.screenWidth / 40,
              }}>
              <ImageBackground
                source={item.image}
                style={{height: Theme.screenHeight / 4.7}}
                imageStyle={{borderRadius: 9}}>
                <View style={styles.gradient}>
                  <Text
                    style={{
                      color: Theme.black,
                      fontSize: Theme.screenHeight / 40,
                      textAlign: 'center',
                      fontFamily: Theme.fontFamily,
                    }}>
                    {item.name}
                  </Text>
                </View>
              </ImageBackground>
            </Pressable>
          )}
        />
      </ImageBackground>

      <Modal animationType="fade" transparent={true} visible={modal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {seconds && (
              <Pressable
                style={{
                  zIndex: 1,
                  alignSelf: 'flex-end',
                  right: 20,
                  bottom: 20,
                }}
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
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  gradient: {
    backgroundColor: 'rgba(3,3,3,0.3)',
    padding: Theme.screenHeight / 80,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  centeredView: {
    flex: 1,
    width: Theme.screenWidth,
    backgroundColor: 'rgba(3,3,3,0.3)',
  },
  modalView: {
    flex: 1,
    width: Theme.screenWidth,
    justifyContent: 'center',
    // borderRadius: 20,
  },
});

export default Home;
