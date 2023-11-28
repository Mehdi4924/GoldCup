import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  FlatList,
  Image,
  ImageBackground,
  ToastAndroid,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Header from '../../components/Header';
import { Images } from '../../constants/Images';
import Theme from '../../utils/Theme';
import { useFocusEffect } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Modal } from 'react-native-paper';
import VideoModal from '../../components/VideoModal';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import { getFramesData } from '../../utils/Api/Api_controller';
import Loader from '../../components/Loader';
import RBSheet from 'react-native-raw-bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

// import RNFS from 'react-native-fs'
import RNFetchBlob from 'rn-fetch-blob';
import CameraRoll from '@react-native-community/cameraroll';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  GestureHandlerRootView,
  PinchGestureHandler,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
const SelfieCamera = props => {
  const second = useSelector((state: RootState) => state.nameReducer.seconds);
  const minute = useSelector((state: RootState) => state.nameReducer.minutes);
  const refRBSheet = useRef();
  const [modal, setModal] = useState(false);
  const viewShot = useRef();
  const [seconds, setSeconds] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [colur, setColur] = useState('green');
  // const [saving, setSaving] = useState(false)
  // const [url, setUrl] = useState("")


  const [frames, setFrames] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getFrames();

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

  // const  getPermissionAndroid = async () => {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //         {
  //           title: 'Image Download Permission',
  //           message: 'Your permission is required to save images to your device',
  //           buttonNegative: 'Cancel',
  //           buttonPositive: 'OK',
  //         },
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         return true;
  //       }
  //       Alert.alert(
  //         'Save remote Image',
  //         'Grant Me Permission to save Image',
  //         [{text: 'OK', onPress: () => console.log('OK Pressed')}],
  //         {cancelable: false},
  //       );
  //     } catch (err) {
  //       Alert.alert(
  //         'Save remote Image',
  //         'Failed to save Image: ' + err.message,
  //         [{text: 'OK', onPress: () => console.log('OK Pressed')}],
  //         {cancelable: false},
  //       );
  //     }
  //   };
  //  const handleDownload = async () => {
  //   if (Platform.OS === 'android') {
  //     const granted = await getPermissionAndroid();
  //     if (!granted) {
  //       return;
  //     }
  //   }

  //   viewShot.current.capture().then(uri => {
  //     // const { config, fs } = RNFetchBlob;
  //     RNFetchBlob.fs
  //     .stat(uri)
  //     .then((stats) => {
  //       console.log(stats.path);
  //  //output: /storage/emulated/0/WhatsApp/Media/WhatsApp Images/IMG-20200831-WA0019.jpg
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //     // let PictureDir = fs.dirs.PictureDir;
  //     // let options = {
  //     //   fileCache: true,
  //     //   addAndroidDownloads: {
  //     //     //Related to the Android only
  //     //     useDownloadManager: true,
  //     //     notification: true,
  //     //     path:
  //     //       PictureDir +
  //     //       '/image_',
  //     //     description: 'Image',
  //     //   },
  //     // };
  //     // config(options)
  //     //   .fetch('GET', uri)
  //     //   .then(res => {
  //     //     //Showing alert after successful downloading
  //     //     console.log('res -> ', JSON.stringify(res));
  //     //     alert('Image Downloaded Successfully.');
  //     //   });


  //   });

  //   }
  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.CAMERA_ROLL,
        {
          title: 'Image Download Permission',
          message: 'Your permission is required to save images to your device',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Alert.alert(
        'Save remote Image',
        'Grant Me Permission to save Image',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      );
    } catch (err) {
      Alert.alert(
        'Save remote Image',
        'Failed to save Image: ' + err.message,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      );
    }
  };

  const handleDownload = async () => {
    setisloading(true)
    try {
      if (Platform.OS === 'android') {
        const granted = await getPermissionAndroid();
        if (granted) {
          viewShot.current.capture().then(uri => {
            let path = `${RNFetchBlob.fs.dirs.CacheDir}/${(Math.floor(5.95))}/image.png`
            CameraRoll.save(uri).then((result) => {
              ToastAndroid.show("File save Succesfully", ToastAndroid.LONG)
              setisloading(false)
            }).catch((error) => {
              setisloading(false)
              console.log(error);
            })
          })
        }
      }
      else {
        console.log("ads");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFrames = async () => {
    setisloading(true);
    try {
      let res = await getFramesData();
      // console.log(res?.data);
      if (res) {
        setFrames(res?.data);
        setImage(res?.data[0].image);
        setisloading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const colors = [
    {
      id: 11,
      color: 'black',
    },
    {
      id: 0,
      color: 'red',
    },
    {
      id: 1,
      color: 'green',
    },
    {
      id: 2,
      color: 'pink',
    },
    {
      id: 3,
      color: 'white',
    },
    {
      id: 4,
      color: 'grey',
    },
    {
      id: 5,
      color: 'blue',
    },
    {
      id: 6,
      color: 'yellow',
    },
    {
      id: 7,
      color: 'orange',
    },
    {
      id: 8,
      color: 'purple',
    },
  ];
  const [ProfileImage, setProfileImage] = useState();
  const [croppedimage, setCroppedimage] = useState();
  const [image, setImage] = useState('');
  const X = useSharedValue(0);
  const Y = useSharedValue(0);
  const scaleImage = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const pickImage = () => {
    refRBSheet.current.close();
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        selectionLimit: 1,
      },
      async response => {
        if (response.didCancel) {
          console.log('cancel');
        } else {
          console.log('image pick response', response?.assets[0]);
          setProfileImage(response?.assets[0]);
          X.value = 0;
          Y.value = 0;
          scaleImage.value = 1;
          savedScale.value = 1;
        }
      },
    );
  };
  const pickImageFromCamera = () => {
    refRBSheet.current.close();

    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: true,
        selectionLimit: 1,
      },
      async response => {
        if (response?.didCancel) {
          console.log('cancel');
        } else {
          setProfileImage(response?.assets[0]);
          X.value = 0;
          Y.value = 0;
          scaleImage.value = 1;
          savedScale.value = 1;
        }
      },
    );
  };

  const renderSeperator1 = () => {
    return <View style={{ marginLeft: Theme.screenWidth / 20 }}></View>;
  };
  const screenShot = async () => {
    viewShot.current.capture().then(uri => {
      setisloading(false);
      Share.open({ url: uri == '' ? Images?.upload : uri })
        .then(res => {
          setisloading(false);
        })
        .catch(err => {
          setisloading(false);
        });
    });
  };

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.x = X.value;
      ctx.y = Y.value;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      X.value = ctx.x + translationX;
      Y.value = ctx.y + translationY;
    },
    onEnd: (_, ctx) => {
      if (X.value > Theme.screenWidth - 200) {
        X.value = 0;
      } else if (-X.value > Theme.screenWidth - 200) {
        X.value = 0;
      }
      if (Y.value > Theme.screenHeight / 2.2 - 100) {
        Y.value = 0;
      } else if (-Y.value > Theme.screenHeight / 2.2 - 100) {
        Y.value = 0;
      }
      console.log(X, Y);
    },
  });

  const pinchHandler = Gesture.Pinch()
    .onUpdate(e => {
      scaleImage.value = savedScale.value * e.scale;
      console.log(e);
    })
    .onEnd(() => {
      savedScale.value = scaleImage.value;
    });

  const reAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: X.value }, { translateY: Y.value }],
    };
  });

  const reAnimatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleImage.value }],
    };
  });
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container} pointerEvents={'box-none'}>
        <Loader loading={isloading} />
        <Header
          icon={true}
          iconName="share"
          title="Selfie Frames"
          backIcon={() => props.navigation.goBack()}
          onPressIcon={() => {
            screenShot();

            // setisloading(true),
            //   setTimeout(() => {
            //     screenShot();
            //   }, 3000);
          }}
        />
        <ImageBackground style={{ flex: 1 }} source={Images.background}>
          <ViewShot ref={viewShot} options={{ format: 'jpg' }}>
            <View
              style={[
                styles.pro,
                { marginTop: '2%', overflow: 'hidden', borderColor: colur, borderWidth: 5, borderBottomWidth: Theme.screenHeight / 30 },
              ]}>
              <GestureDetector gesture={pinchHandler}>
                <Animated.View style={reAnimatedImageStyle}>
                  <PanGestureHandler onGestureEvent={panGestureEvent}>
                    <Animated.View style={reAnimatedStyle}>
                      <Animated.Image
                        resizeMode="contain"
                        source={
                          ProfileImage ? { uri: ProfileImage.uri } : Images.upload
                        }
                        style={styles.mainImage}
                      />
                    </Animated.View>
                  </PanGestureHandler>
                </Animated.View>
              </GestureDetector>
              <View pointerEvents="none" style={{ position: 'absolute' }}>
                <Image
                  source={{ uri: image }}
                  style={[
                    styles.pro1,
                    {
                      ...StyleSheet.absoluteFillObject,
                      borderColor: colur,
                      borderWidth: 4,
                    },
                  ]}
                  resizeMode="stretch"
                />
              </View>
            </View>
          </ViewShot>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: Theme.screenWidth / 20, marginVertical: Theme.screenHeight / 50 }}>
            <TouchableOpacity
              onPress={() => refRBSheet.current.open()}
              style={styles.imageBtn}>
              <Image
                source={Images.uploadImage}
                style={{ width: Theme.screenHeight / 50, height: Theme.screenHeight / 50 }}
              />
              <Text style={{ fontSize: Theme.screenHeight / 60, fontFamily: Theme.fontFamily }} >Upload</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDownload()}
              style={styles.imageBtn}>
              <Ionicons name="download-sharp" size={Theme.screenHeight / 50} color={Theme.white} />
              <Text style={{ fontSize: Theme.screenHeight / 60, fontFamily: Theme.fontFamily }} >Download </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.titleText}>Background Colors</Text>
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={colors}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setColur(item.color)}>
                  {item.color == 'black' ? (
                    <FontAwesome
                      name="ban"
                      size={30}
                      color={Theme.black}
                      style={{ marginLeft: Theme.screenWidth / 30 }}
                    />
                  ) : (
                    <View
                      style={{
                        height: 30,
                        width: 30,
                        backgroundColor: item.color,
                        borderRadius: 40,
                        borderColor: item.color,
                        marginLeft: Theme.screenWidth / 30,
                      }}></View>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
          <Text style={styles.titleText}>Add Frames</Text>
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={frames}
              contentContainerStyle={{ marginBottom: Theme.screenHeight / 10 }}
              ListHeaderComponent={
                <TouchableOpacity onPress={() => setImage('')}>
                  <Image
                    source={Images.ban}
                    style={{
                      height: 50,
                      width: 50,
                      marginLeft: Theme.screenWidth / 70,
                    }}
                  />
                </TouchableOpacity>
              }
              ListHeaderComponentStyle={{ alignSelf: 'flex-end' }}
              ItemSeparatorComponent={renderSeperator1}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setImage(item.image)}>
                  <Image
                    resizeMode="stretch"
                    source={{ uri: item.image }}
                    style={{
                      height: 100,
                      width: 100,
                      marginLeft: Theme.screenWidth / 70,
                    }}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
          <Modal visible={modal}>
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
          </Modal>

          <RBSheet
            ref={refRBSheet}
            height={Theme.screenHeight / 5}
            closeOnDragDown={true}
            closeOnPressMask={false}
            customStyles={{
              wrapper: {
                backgroundColor: 'transparent',
              },
              draggableIcon: {
                backgroundColor: '#000',
              },
            }}>
            <TouchableOpacity
              style={styles.sheetView}
              onPress={() => pickImageFromCamera()}>
              <AntDesign
                name="camera"
                size={Theme.screenHeight / 40}
                color={Theme.primary}
              />
              <Text style={styles.sheetText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sheetView}
              onPress={() => pickImage()}>
              <Ionicons
                name="images"
                size={Theme.screenHeight / 40}
                color={Theme.primary}
              />
              <Text style={styles.sheetText}>Gallery</Text>
            </TouchableOpacity>
          </RBSheet>
        </ImageBackground>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  mainImage: {
    width: undefined,
    height: undefined,
    aspectRatio: 1,
  },
  box: {
    backgroundColor: 'white',
  },
  pro: {
    height: Theme.screenHeight / 2.2,
    width: Theme.screenWidth / 1.1,
    alignSelf: 'center',
    padding: Theme.screenHeight / 99
  },
  pro1: {
    height: Theme.screenHeight / 2.2,
    width: Theme.screenWidth / 1.1,
    alignSelf: 'center',
  },
  titleText: {
    color: Theme.black,
    marginVertical: Theme.screenWidth / 50,
    fontSize: Theme.screenHeight / 50,
    fontFamily: Theme.fontFamily,
    marginHorizontal: Theme.screenWidth / 30,
  },
  imageBtn: {
    width: Theme.screenWidth / 3.5,
    alignItems: 'center',
    marginVertical: 3,
    backgroundColor: Theme.primary,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    borderRadius: 5,
    padding: 10,
    // marginLeft: Theme.screenWidth / 20,
  },
  sheetView: {
    padding: Theme.screenHeight / 80,
    marginVertical: Theme.screenHeight / 90,
    borderBottomWidth: 0.6,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sheetText: {
    color: Theme.white,
    paddingHorizontal: Theme.screenWidth / 30,
  },
});

export default SelfieCamera;
