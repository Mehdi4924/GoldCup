import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../../components/Header';
import {Images} from '../../constants/Images';
import Theme from '../../utils/Theme';
import {Modal} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';

import VideoModal from '../../components/VideoModal';
import BannerAdd from '../../components/BanerAdd';
import {
  getAudioCategories,
  getAudioSubCatagories,
} from '../../utils/Api/Api_controller';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import {useSelector} from 'react-redux';

const AudioSubCatagories = props => {
  const second = useSelector((state: RootState) => state.nameReducer.seconds);
  const minute = useSelector((state: RootState) => state.nameReducer.minutes);
  const [modal, setModal] = useState(false);
  const [seconds, setSeconds] = useState(false);
  const [colur, setColur] = useState('white');
  const [isloading, setisloading] = useState(false);
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getAudioCatagoriesData();
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
  const getAudioCatagoriesData = async () => {
    setVisible(false);
    let idd = props?.route?.params?.id;
    setisloading(true);
    let res = await getAudioSubCatagories(idd);
    console.log(res?.data?.musicSubCategoryMobilesList);
    if (res?.data) {
      if (res) setData(res.data.musicSubCategoryMobilesList);
      setVisible(true);
      setisloading(false);
    } else {
      setError(res?.message);
      setisloading(false);
      setVisible(true);
    }
  };
  return (
    <View style={styles.container}>
      <Header
        backIcon={() => props.navigation.goBack()}
        title="Audio SubCatagories"
        // onPressIcon={() => props.navigation.navigate('Setting')}
        icon={true}
        // iconName="settings"
      />
      <ImageBackground style={{flex: 1}} source={Images.background}>
        {isloading ? (
          <Loader loading={isloading} />
        ) : data.length > 0 ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            onRefresh={() => getAudioCatagoriesData()}
            refreshing={isloading}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <View>
                <ShimmerPlaceHolder
                  shimmerColors={['#1c1b1b', '#242424', '#000']}
                  visible={visible}
                  style={{
                    borderRadius: 10,
                    height: Theme.screenHeight / 10,
                    width: Theme.screenWidth / 1,
                    marginVertical: Theme.screenHeight / 99,
                  }}
                  LinearGradient={LinearGradient}>
                  <TouchableOpacity
                    style={{borderRadius: 10, paddingHorizontal: 10}}
                    onPress={() =>
                      props.navigation.navigate('AudioList', {
                        id: item.id,
                        catname: item.subCategoryName,
                      })
                    }>
                    <ImageBackground
                    resizeMode="contain"
                      imageStyle={{borderRadius: 10}}
                      source={{
                        uri:
                          item.subCategoryThumbnailUrl === ''
                            ? Images.song
                            : item.subCategoryThumbnailUrl,
                      }}
                      style={styles.image}>
                      <View style={styles.backView}>
                        <View>
                          <Text style={styles.name}>
                            {item.subCategoryName}
                          </Text>
                          <Text style={styles.count}>{item.count}</Text>
                        </View>
                        <AntDesign
                          name="right"
                          size={22}
                          color={Theme.black}
                          style={{marginRight: Theme.screenWidth / 50}}
                        />
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                </ShimmerPlaceHolder>
                {index == 0 && <BannerAdd />}
              </View>
            )}
          />
        ) : (
          <Error error={'No Data Found'} />
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
  name: {
    color: Theme.black,
    fontSize: Theme.screenHeight / 40,
    fontWeight: '700',
    marginHorizontal: Theme.screenWidth / 22,
  },
  count: {
    color: Theme.black,
    marginTop: '5%',
    fontSize: Theme.screenHeight / 62,
    marginHorizontal: Theme.screenWidth / 22,
  },
  image: {
    height: Theme.screenHeight / 10,
    marginVertical: Theme.screenHeight / 99,
  },
  backView: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default AudioSubCatagories;
