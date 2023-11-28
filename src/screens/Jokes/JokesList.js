//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Share,
  Image,
  Pressable,
  ImageBackground,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {Card, Modal} from 'react-native-paper';
import Header from '../../components/Header';
import Theme from '../../utils/Theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NotificationPopup from 'react-native-push-notification-popup';
import {useFocusEffect} from '@react-navigation/native';
import VideoModal from '../../components/VideoModal';
import BannerAdd from '../../components/BanerAdd';
import {Images} from '../../constants/Images';
import {getJokes} from '../../utils/Api/Api_controller';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import {useSelector} from 'react-redux';

const JokesList = props => {
  const second = useSelector((state: RootState) => state.nameReducer.seconds);
  const minute = useSelector((state: RootState) => state.nameReducer.minutes);

  const [modal, setModal] = useState(false);
  const [video, setVideo] = useState('');
  const [seconds, setSeconds] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [data, setData] = useState('');
  const [hide, sethide] = useState(false);
  // const mediaJSON = [
  //   {
  //     id: 0,
  //     name: 'Ek Pathan Ladies Ward Me Admit Ho Gay Nurse : Tum Ko Sharam Nahi Ati  Pathan Bola : Sharam Kasi Hum Tu Padha He Ladies Ward Ma Hoa Ta',
  //   },
  //   {
  //     id: 1,
  //     name: "ہٹلر سیز ، دیئر اِس نو ورڈ لائک امپوسیبل ان مائی دکشنر' سردار : اب بولنے سے کیا فائدہ ' جب خریدی تھی تب ہی چیک کرنا تھا نا '",
  //   },
  //   {
  //     id: 2,
  //     name: 'Ek Pathan Ladies Ward Me Admit Ho Gay Nurse : Tum Ko Sharam Nahi Ati  Pathan Bola : Sharam Kasi Hum Tu Padha He Ladies Ward Ma Hoa Ta',
  //   },
  //   {
  //     id: 3,
  //     name: ' 1 سردار ریل کی پٹری پر سو گیا .1 آدمی نے کہا کیا کر رہے ہو ؟ ٹرین آئیگی تو مر جاؤگے !سردار : میرے اوپر سے ہوائی جھاز گزر گیا تو کچھ نہیں ہوا ، ٹرین کیا چیز ہے ؟',
  //   },
  //   {
  //     id: 4,
  //     name: 'پہلا سردار : اوئے اگر نیند نا آئے تو کیا کیا جائے ؟دوسرا سردار : نیند کا انتظار کرنے سے اچھا ہے کی بندہ سو ہی جائے',
  //   },
  //   {
  //     id: 5,
  //     name: 'Pathan : Ek Kilo Bhanse Ka Doodh Day Do Dhood Wala : Tumhara Barthan Chota Ha  Pathan : Oo ! Shit Yaar Acha Chalo Bakri Ka Da Do',
  //   },
  //   {
  //     id: 6,
  //     name: 'پولیس : تمہیں کل صبح 5 بجے پھانسی دی جائے گی .  سردار : ہا ہا ہا ہا !  پولیس : کیوں ہنس رہے ہو ؟  سردار : میں تو اٹھتا ہی صبح 9 بجے ہوں  ',
  //   },
  //   {
  //     id: 7,
  //     name: 'Pathan : Ek Kilo Bhanse Ka Doodh Day Do Dhood Wala : Tumhara Barthan Chota Ha  Pathan : Oo ! Shit Yaar Acha Chalo Bakri Ka Da Do',
  //   },
  // ];
  const renderCustomPopup = ({title}) => (
    <View style={styles.popup}>
      <Text style={{color: Theme.black,fontFamily:Theme.fontFamily, fontSize: Theme.screenHeight / 60}}>
        {title}
      </Text>
    </View>
  );
  const showPopup = () => {
    popup.show({
      onPress: function () {
        console.log('Pressed');
      },
      appTitle: 'Copied',
      title: 'Joke Copied Succesfully ✅',
      slideOutTime: 2000,
    });
  };
  useEffect(() => {
    getJokesData();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      var inter = setInterval(() => {
        setModal(false);
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
    }, []),
  );

  const getJokesData = async () => {
    setisloading(true);
    let id = props.route.params.cat;
    console.log(id);
    let res = await getJokes(id);
    console.log(JSON.stringify(res?.data, null, 2));
    if (res?.data === undefined) {
      setisloading(false);
    } else {
      setData(res?.data);
      setisloading(false);
    }
  };
  const shar = async text => {
    await Share.share({message: text});
    setisloading(false);
  };
  return (
    <View style={styles.container}>
      <ImageBackground style={{flex: 1}} source={Images.background}>
        <Header
          title="All Jokes"
          icon={true}
          // onPressIcon={() => props.navigation.navigate('Setting')}
          backIcon={() => props.navigation.goBack()}
          // iconName="settings"
        />
        {isloading ? (
          <Loader loading={isloading} />
        ) : data?.length > 0 ? (
          <FlatList
            data={data}
            onRefresh={() => getJokesData()}
            refreshing={isloading}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <View>
                {index == 2 && <BannerAdd />}
                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: '1%',
                    width: '97%',
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                      borderColor: Theme.black,
                    }}>
                    <View style={{padding: 10}}>
                      <Text
                        style={{
                          color: Theme.black,
                          fontFamily: Theme.fontFamily,
                          lineHeight: 30,
                          width: '100%',
                          fontSize: Theme.screenHeight / 47,
                        }}>
                        {item.jokeDescription}
                      </Text>
                      <View
                        style={{
                          backgroundColor: 'lightgrey',
                          height: 0.3,
                          marginTop: '1%',
                        }}></View>
                      <View
                        style={{
                          paddingTop: Theme.screenHeight / 60,
                          justifyContent: 'space-evenly',
                          flexDirection: 'row',
                        }}>
                        <Pressable
                          onPress={() => {
                            Clipboard.setString(item.jokeDescription),
                              showPopup();
                          }}>
                          <Feather
                            name="copy"
                            color={Theme.primary}
                            size={Theme.screenHeight / 40}
                          />
                        </Pressable>
                        <Pressable
                          onPress={() => {
                            setisloading(true),
                              setTimeout(() => {
                                shar(item.jokeDescription);
                              }, 2000);
                          }}>
                          <FontAwesome
                            name="share-square-o"
                            color={Theme.primary}
                            size={Theme.screenHeight / 40}
                          />
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        ) : (
          <Error error={'No Data Found'} />
        )}
        <NotificationPopup
          ref={ref => (popup = ref)}
          renderPopupContent={renderCustomPopup}
          shouldChildHandleResponderStart={true}
          shouldChildHandleResponderMove={true}
        />
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
  popup: {
    backgroundColor: Theme.primary,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: Theme.screenHeight / 40,
  },
  containerStyle1: {
    backgroundColor: 'rgba(10, 10, 10,0.5)',
    height: Theme.screenHeight / 1,
  },
});
export default JokesList;
