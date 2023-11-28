import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  BackHandler,
  Alert,
  TouchableOpacity,
  Pressable,
  FlatList,
  ImageBackground,
} from 'react-native';
import Header from '../../components/Header';
import {Images} from '../../constants/Images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useFocusEffect} from '@react-navigation/native';
import {Modal} from 'react-native-paper';
import Theme from '../../utils/Theme';
import VideoModal from '../../components/VideoModal';
import BannerAdd from '../../components/BanerAdd';
import {getJokesCategories} from '../../utils/Api/Api_controller';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import {useSelector} from 'react-redux';

const JokesCatagories = props => {
  const second = useSelector((state: RootState) => state.nameReducer.seconds);
  const minute = useSelector((state: RootState) => state.nameReducer.minutes);

  const [modal, setModal] = useState(false);
  const [seconds, setSeconds] = useState(false);
  // const [colur, setColur] = useState("white")
  const [data, setData] = useState('');
  const [isloading, setisloading] = useState(false);
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getJokesCatagoriesData();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
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
    }, []),
  );

  const getJokesCatagoriesData = async () => {
    setVisible(false);
    setisloading(true);
    let res = await getJokesCategories();
    // console.log(res?.data);
    if (res) {
      setData(res?.data);
      setVisible(true);
      setisloading(false);
    } else {
      setError(res?.message);
      setVisible(true);
      setisloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={{flex: 1}} source={Images.background}>
        <Loader loading={isloading} />
        <Header
          title="Jokes Catagories"
          icon={true}
          //   iconName="settings"
          //   onPressIcon={() => props.navigation.navigate('Settings')}
          backIcon={() => props.navigation.goBack()}
          con={true}
          //   onPressIcon={() => props.navigation.navigate('Setting')}
          //   iconName="settings"
        />
        {data?.length > 0 ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            onRefresh={() => getJokesCatagoriesData()}
            refreshing={isloading}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <View>
                {index == 3 && <BannerAdd />}
                <TouchableOpacity
                  style={{
                    marginHorizontal: Theme.screenWidth / 30,
                    backgroundColor: 'rgba(48,48,48,0.6)',
                    marginTop: '2%',
                    padding: 10,
                    borderRadius: 7,
                  }}
                  onPress={() =>
                    props.navigation.navigate('JokesList', {cat: item.id})
                  }>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        padding: 10,
                        backgroundColor: 'rgba(48,48,48,0.9)',
                        borderRadius: 6,
                      }}>
                      <ShimmerPlaceHolder
                        shimmerColors={['#1c1b1b', '#242424', '#000']}
                        visible={visible}
                        style={{
                          height: Theme.screenWidth / 5,
                          width: Theme.screenWidth / 5,
                          borderRadius: 4,
                        }}
                        LinearGradient={LinearGradient}>
                        <Image
                          source={
                            item.jokesCategoryThumbnail === ''
                              ? Images.jokeImage
                              : {
                                  uri:
                                    'http://goldcup.pk:90/JokesCategoryThumbnails/' +
                                    item.jokesCategoryThumbnail,
                                }
                          }
                          style={{
                            height: Theme.screenWidth / 5,
                            width: Theme.screenWidth / 5,
                            borderRadius: 5,
                          }}
                        />
                      </ShimmerPlaceHolder>
                    </View>
                    <View
                      style={{
                        marginLeft: Theme.screenWidth / 20,
                        marginTop: Theme.screenHeight / 70,
                      }}>
                      <ShimmerPlaceHolder
                        shimmerColors={['#474747', '#474747', '#474747']}
                        visible={visible}
                        LinearGradient={LinearGradient}>
                        <Text
                          style={{
                            color: Theme.black,
                            fontSize: Theme.screenHeight / 50,
                            fontFamily: Theme.fontFamily,
                          }}>
                          {item?.jokesCategoryName}
                        </Text>
                      </ShimmerPlaceHolder>
                      <ShimmerPlaceHolder
                        shimmerColors={['#474747', '#474747', '#474747']}
                        visible={visible}
                        style={{marginTop: Theme.screenHeight / 40}}
                        LinearGradient={LinearGradient}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '64%',
                            alignItems: 'center',
                            marginTop: Theme.screenHeight / 40,
                          }}>
                          <Text
                            style={{
                              color: Theme.black,
                              fontFamily: Theme.fontFamily,
                            }}>
                            See all
                          </Text>
                          <AntDesign
                            name="arrowright"
                            style={{marginRight: 10}}
                            size={20}
                            color={Theme.black}
                          />
                        </View>
                      </ShimmerPlaceHolder>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <Error error={error} />
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
});

export default JokesCatagories;
