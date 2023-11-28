import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Pressable,
} from 'react-native';
import Header from '../../components/Header';
import Theme from '../../utils/Theme';
import {SliderBox} from 'react-native-image-slider-box';
import {Modal} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ThumbnailComponent from '../../components/ThumbnailComponent';
import {useFocusEffect} from '@react-navigation/native';
import VideoModal from '../../components/VideoModal';
import BannerAdd from '../../components/BanerAdd';
import {getVideosCatagory} from '../../utils/Api/Api_controller';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import {useSelector} from 'react-redux';
import {Images} from '../../constants/Images';

const VideoList = props => {
  const second = useSelector((state: RootState) => state.nameReducer.seconds);
  const minute = useSelector((state: RootState) => state.nameReducer.minutes);
  const [modal, setModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [sliderImages, setSliderImages] = useState([]);
  const [top, setTop] = useState([]);
  const [popular, setPopular] = useState([]);
  const [trending, setTrending] = useState([]);
  const [seconds, setSeconds] = useState(false);
  const [banner, setBanner] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      getData();
      var inter = setInterval(() => {
        setSeconds(false);
        setModal(false);
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

  const getData = async () => {
    try {
      setVisible(false);
      let res = await getVideosCatagory();
      // console.log(JSON.stringify(res?.data, null, 2), "data");
      if (res) {
        var lookup1 = {};
        var itemss = res?.data?.top5;
        var resultt = [];
        for (var item, i = 0; (item = itemss[i++]); ) {
          var name = item?.mediaCategoryId;
          if (!(name in lookup1)) {
            lookup1[name] = 1;
            resultt.push({
              categoryThumbnailUrl: item?.categoryThumbnailUrl,
              mediaCategoryId: item?.mediaCategoryId,
              subCategoryId: item?.subCategoryId,
              mediaCategoryName: item?.mediaCategoryName,
            });
          }
        }
        setTop(resultt);
        setTrending(res?.data?.trending);
        var lookup = {};
        var items = res?.data?.popular;
        var result = [];
        for (var item, i = 0; (item = items[i++]); ) {
          var name = item?.mediaCategoryId;
          if (!(name in lookup)) {
            lookup[name] = 1;
            result.push({
              categoryThumbnailUrl: item?.categoryThumbnailUrl,
              mediaCategoryId: item?.mediaCategoryId,
              subCategoryId: item?.subCategoryId,
              mediaCategoryName: item?.mediaCategoryName,
            });
          }
        }
        setPopular(result);
        setSliderImages(res?.data?.sliderImageUrl);
        setVisible(true);
        setBanner(res?.data?.bannerImageUrl);
      } else {
        setTop([]);
        setTrending([]);
        setPopular([]);
        setVisible(true);
      }
    } catch (err) {
      console.log(err);
      setVisible(true);
    }
  };
  const renderSeperator = () => {
    return (
      <View
        style={{
          marginLeft: 6,
        }}
      />
    );
  };
  const renderSeperator1 = () => {
    return (
      <View
        style={{
          marginLeft: Theme.screenWidth / 30,
        }}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header
        // onPressIcon={() => props.navigation.navigate('Setting')}
        image={true}
        icon={true}
        backIcon={() => props.navigation.goBack()}
        // iconName="settings"
      />
      <ImageBackground
        style={{flex: 1, height: Theme.screenHeight, width: Theme.screenWidth}}
        source={Images.background}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{width: Theme.screenWidth / 1, alignSelf: 'center'}}>
            <ShimmerPlaceHolder
              shimmerColors={['#40392f', '#40392f', '#000']}
              visible={visible}
              style={{
                borderRadius: 8,
                width: Theme.screenWidth / 1,
                height: Theme.screenHeight / 1.99,
              }}
              LinearGradient={LinearGradient}>
              <SliderBox
                images={sliderImages}
                sliderBoxHeight={Theme.screenHeight / 1.99}
                dotColor={Theme.primary}
                pagingEnabled={Platform.select({android: true})}
                autoplay={false}
                resizeMode="stretch"
                dotStyle={{
                  width: 0,
                  height: 0,
                }}
                imageLoadingColor={Theme.primary}
                circleLoop={false}
                ImageComponentStyle={{
                  borderRadius: 5,
                  width: Theme.screenWidth / 1,
                  marginTop: 4,
                }}
              />
            </ShimmerPlaceHolder>
          </View>
          <View style={styles.paddingView}>
            <View style={styles.titleView}>
              <Text style={styles.label}>Top Trending Videos</Text>
              <Pressable
                onPress={() =>
                  props.navigation.navigate('video', {arr: trending})
                }>
                <Text style={styles.seeall}>See All</Text>
              </Pressable>
            </View>
            <View style={{marginTop: Theme.screenHeight / 70}}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={trending}
                ItemSeparatorComponent={renderSeperator}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={{width: Theme.screenWidth / 3.5}}
                    onPress={() =>
                      props.navigation.navigate('PlayVideo', {
                        data: item,
                        arr: trending,
                      })
                    }>
                    <ThumbnailComponent
                      visible={visible}
                      icon={true}
                      thumb={item.categoryThumbnailUrl}
                      width={Theme.screenWidth / 3.5}
                      height={Theme.screenHeight / 8}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
            <View style={styles.titleView}>
              <Text style={styles.label}>Popular </Text>
            </View>
            <View style={{marginTop: Theme.screenHeight / 70}}>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={popular}
                ItemSeparatorComponent={renderSeperator1}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={{width: Theme.screenWidth / 3.3,}}
                    onPress={() =>
                      props.navigation.navigate('VideoSubcatagory', {
                        id: item.mediaCategoryId,
                      })
                    }>
                    <ThumbnailComponent
                      visible={visible}
                      thumb={item.categoryThumbnailUrl}
                      width={Theme.screenWidth / 3.3}
                      height={Theme.screenHeight / 4}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
            <BannerAdd sourcee={banner} />
            <View
              style={[styles.titleView, {marginTop: Theme.screenHeight / 97}]}>
              <Text style={styles.label}>Top 10 in Pakistan Today </Text>
            </View>
            <View style={{marginTop: Theme.screenHeight / 70}}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={top}
                ItemSeparatorComponent={renderSeperator1}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={{width: Theme.screenWidth / 3.5}}
                    onPress={() =>
                      props.navigation.navigate('VideoSubcatagory', {
                        id: item.mediaCategoryId,
                      })
                    }>
                    <ThumbnailComponent
                      visible={visible}
                      thumb={item.categoryThumbnailUrl}
                      width={Theme.screenWidth / 3.3}
                      height={Theme.screenHeight / 4}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  titleView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: Theme.screenHeight / 50,
    alignItems: 'center',
  },
  label: {
    fontSize: Theme.screenHeight / 46,
    color: Theme.primary,
    fontFamily: Theme.fontFamily,
  },
  seeall: {
    color: Theme.primary,
    fontFamily: Theme.fontFamily,
  },
  paddingView: {
    padding: Theme.screenHeight / 50,
  },
  containerStyle: {
    backgroundColor: 'rgba(10, 10, 10,0.5)',
    height: Theme.screenHeight / 1,
  },
  containerStyle1: {
    backgroundColor: 'rgba(10, 10, 10,0.5)',
    height: Theme.screenHeight / 1,
  },
  icon: {
    marginLeft: 10,
    top: Theme.screenHeight / -5,
    alignSelf: 'flex-start',
  },
});

export default VideoList;
