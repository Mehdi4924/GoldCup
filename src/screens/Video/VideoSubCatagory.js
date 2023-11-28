import React, {Component, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import Header from '../../components/Header';
import FastImage from 'react-native-fast-image';
import {useFocusEffect} from '@react-navigation/native';
import {Card, Modal} from 'react-native-paper';
import VideoModal from '../../components/VideoModal';
import Theme from '../../utils/Theme';

import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import {MediaSubCategories} from '../../utils/Api/Api_controller';
import {get_data} from '../../components/Controller';
import Loader from '../../components/Loader';
import {useSelector} from 'react-redux';
import {Images} from '../../constants/Images';
import Error from '../../components/Error';

const VideoSubcatagory = props => {
  const second = useSelector((state: RootState) => state.nameReducer.seconds);
  const minute = useSelector((state: RootState) => state.nameReducer.minutes);

  const [modal, setModal] = useState(false);
  const [video, setVideo] = useState('');
  const [seconds, setSeconds] = useState(false);
  const [data, setData] = useState([]);
  const [visible, setvisible] = useState(false);
  const [idd, setId] = useState('');
  const [isloading, setisloading] = useState(false);

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
  useEffect(() => {
    setvisible(false);
    let Id = props?.route?.params?.id;
    console.log(Id);
    getVideoCat(Id);
    setId(Id);
  }, []);
  const getVideoCat = async id => {
    setisloading(true);
    let token = await get_data('token');
    console.log(token);
    const config = {
      headers: {Authorization: `Bearer ` + token},
    };
    let res = await MediaSubCategories(id, config);
    if (res?.data?.mediaSubCategoryMobilesList?.length > 0) {
      console.log('==>>', res?.data?.mediaSubCategoryMobilesList);
      setData(res?.data?.mediaSubCategoryMobilesList);
      setisloading(false);
      setvisible(true);
    } else {
      setisloading(false), setvisible(true);
    }
  };
  return (
    <View style={styles.container}>
      <Loader loading={isloading} />
      <Header
        icon={true}
        title="SubCatagories"
        // onPressIcon={() => props.navigation.navigate('Setting')}
        // iconName="settings"
        backIcon={() => props.navigation.goBack()}
      />
      <ImageBackground style={{flex: 1}} source={Images.background}>
        {data.length < 1 && isloading == false ? (
          <Error error={'No Data Found'} />
        ) : (
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            refreshing={false}
            onRefresh={() => getVideoCat(idd)}
            numColumns={2}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{margin: 1}}
                onPress={() =>
                  props.navigation.navigate('video', {id: item.id})
                }>
                <ShimmerPlaceHolder
                  shimmerColors={['#1c1b1b', '#242424', '#000']}
                  visible={visible}
                  style={{
                    height: Theme.screenHeight / 4,
                    width: Theme.screenWidth / 2,
                  }}
                  LinearGradient={LinearGradient}>
                  <FastImage
                    resizeMode="cover"
                    source={{uri: item.subCategoryThumbnailUrl}}
                    style={{
                      height: Theme.screenHeight / 4,
                      width: Theme.screenWidth / 2,
                    }}
                  />
                </ShimmerPlaceHolder>
              </TouchableOpacity>
            )}
          />
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

export default VideoSubcatagory;
