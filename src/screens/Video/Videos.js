import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Header from '../../components/Header';
import ThumbnailComponent from '../../components/ThumbnailComponent';
import Theme from '../../utils/Theme';
import {useFocusEffect} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Card, Modal} from 'react-native-paper';
import VideoModal from '../../components/VideoModal';

import {get_data} from '../../components/Controller';
import {getVideoSongs} from '../../utils/Api/Api_controller';
import {useSelector} from 'react-redux';
import BannerAdd from '../../components/BanerAdd';
import Loader from '../../components/Loader';
import {Images} from '../../constants/Images';
import Error from '../../components/Error';

const Videos = props => {
  const second = useSelector((state: RootState) => state.nameReducer.seconds);
  const minute = useSelector((state: RootState) => state.nameReducer.minutes);

  const [modal, setModal] = useState(false);
  const [seconds, setSeconds] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [idd, setId] = useState('');
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const {arr} = props.route.params;
  useFocusEffect(
    React.useCallback(() => {
      setVisible(false);
      let id = props?.route?.params?.id;
      console.log(id);
      if (id == '' || id == null || id == undefined) {
        let dataarray = props?.route?.params?.arr;
        console.log(dataarray);
        setData(dataarray);
        setVisible(true);
      } else {
        getVideos(id);
        setId(id);
      }
      var inter = setInterval(() => {
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

  const getVideos = async id => {
    setisloading(true);
    setVisible(false);
    let token = await get_data('token');
    console.log(token);
    const config = {
      headers: {Authorization: `Bearer ` + token},
    };
    let res = await getVideoSongs(id, config);
    console.log(res?.data, 'adadasd');
    setData1(res?.data);
    setVisible(true);
    setisloading(false);
  };

  return (
    <View style={styles.container}>
      <Loader loading={isloading} />
      <Header
        // onPressIcon={() => props.navigation.navigate('Setting')}
        title="All Videos"
        // iconName="settings"
        backIcon={() => props.navigation.goBack()}
        icon={true}
      />
      <ImageBackground style={{flex: 1}} source={Images.background}>
        <View style={{marginBottom: '2%', flex: 1}}>
          {data.length < 1 && data1.length < 1 ? (
            <Error error={'No Data Found'} />
          ) : (
            <FlatList
              onRefresh={() => getVideos(idd)}
              refreshing={isloading}
              showsHorizontalScrollIndicator={false}
              numColumns={1}
              data={data.length > 0 ? data : data1}
              renderItem={({item, index}) => (
                <View>
                  {index == 2 && <BannerAdd />}
                  <TouchableOpacity
                    style={{
                      marginLeft: '1%',
                      marginTop: '1%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderBottomColor: Theme.black,
                      borderBottomWidth: 0.5,
                    }}
                    onPress={() =>
                      props.navigation.navigate('PlayVideo', {
                        subdata: item,
                        subarr: data.length > 0 ? data : data1,
                      })
                    }>
                    <View style={{flexDirection: 'row', padding: 10}}>
                      <ThumbnailComponent
                        visible={visible}
                        icon={true}
                        thumb={
                          data == null || data == undefined || data.length < 1
                            ? item.songThumbnail
                            : item.categoryThumbnailUrl
                        }
                        width={Theme.screenWidth / 5}
                        height={Theme.screenHeight / 12}
                      />
                      <View
                        style={{
                          marginHorizontal: Theme.screenWidth / 20,
                          marginVertical: Theme.screenHeight / 80,
                        }}>
                        <Text
                          style={{
                            color: Theme.black,
                            fontSize: Theme.screenHeight / 60,
                            width: Theme.screenWidth / 2,
                            fontFamily: Theme.fontFamily,
                          }}>
                          {data.length > 0
                            ? item.mediaCategoryName
                            : item.youtubeVideoTitle}
                        </Text>
                        <Text
                          style={{
                            color: Theme.black,
                            fontSize: Theme.screenHeight / 70,
                            marginTop: Theme.screenHeight / 80,
                          }}>
                          {item.mediaCategoryName}
                        </Text>
                      </View>
                    </View>
                    <AntDesign
                      name="play"
                      size={37}
                      color={Theme.primary}
                      style={{
                        marginTop: '4%',
                        marginRight: Theme.screenWidth / 30,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </View>
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
  containerStyle: {
    alignItems: 'center',
    width: '100%',
  },
});

export default Videos;
