import React, {Component, useEffect} from 'react';
import {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ButtonComponent from '../../components/ButtonComponent';
import TextComponent from '../../components/TextComponent';
import {Images} from '../../constants/Images';
import Theme from '../../utils/Theme';
import {Checkbox} from 'react-native-paper';
import axios from 'axios';
import {launchImageLibrary} from 'react-native-image-picker';
import Loader from '../../components/Loader';
import NotificationPopup from 'react-native-push-notification-popup';
import {SignupApi} from '../../utils/Api/Api_controller';
import {useDispatch} from 'react-redux';
import {setUser} from '../../store/mainSlice';
import {Signup_validation} from '../../utils/validation';
import ImgToBase64 from 'react-native-image-base64';
import {save_data} from '../../components/Controller';

const CompleteProfile = props => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [checked, setChecked] = useState(false);
  const [ProfileImage, setProfileImage] = useState('');
  const [image, setImage] = useState('');
  const [isloading, setisloading] = useState(false);
  const [imageType, setImageType] = useState('');
  const [filename, setFilename] = useState('');
  const [provider, setProvider] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.route.params.flag == 'google') {
      const gdata = props?.route?.params?.data;
      setFirstName(gdata.FirstName),
        setLastName(gdata.LastName),
        setEmail(gdata.Email),
        setUserName(gdata.fullname);
      ImgToBase64.getBase64String(gdata.profile)
        .then(res => {
          setImageType(res);
        })
        .catch(err => console.log(err));
      setProfileImage(gdata.profile), setProvider('google.com');
    } else {
      const dataa = props?.route?.params?.data;
      // console.log(dataa);
      setFirstName(dataa.firstName),
        setLastName(dataa.lastname),
        setEmail(dataa.email);
      ImgToBase64.getBase64String(dataa.profile.data.url)
        .then(res => {
          setImageType(res);
        })
        .catch(err => doSomethingWith(err));
      setProfileImage(dataa.profile.data.url), setProvider('facebook.com');
    }
  }, []);

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        selectionLimit: 1,
      },
      async response => {
        setProfileImage(response.assets[0].uri);
        setImageType(response.assets[0].base64);
        setFilename(response.assets[0].fileName);
      },
    );
  };
  const renderCustomPopup = ({title}) => (
    <View style={styles.popup}>
      <Text style={{color: Theme.black, fontSize: Theme.screenHeight / 60}}>
        {title}
      </Text>
    </View>
  );
  const showPopup = errors => {
    popup.show({
      appTitle: 'Copied',
      title: errors,
      slideOutTime: 2000,
    });
  };
  const onSubmit = async () => {
    setisloading(true);
    let validate = Signup_validation(
      firstname,
      username,
      lastname,
      Email,
      city,
      password,
    );
    if (validate.valid == true) {
      var body = {
        profileimage: imageType == '' ? ProfileImage : imageType,
        Email: Email,
        FirstName: firstname,
        LastName: lastname,
        userName: username,
        password: password,
        PhoneNumber: '',
        AidedByBrandAmbassador: checked,
        City: city,
        provider: provider,
      };
      let res = await SignupApi(body)
        .then(async res => {
          console.log('sucess response', res);
          if (res?.statusCode === 502) {
            setisloading(false);
            showPopup('User Already Exist');
          } else if (res?.statusCode === 403) {
            setisloading(false);
            showPopup(res.message);
          } else {
            setisloading(false);
            showPopup(res?.data?.message);
            let ema = { email: props?.route?.params?.data?.Email, signin: "true", provider: provider}
            // let dis = {Email: Email, password: password};
            console.log(ema);
            dispatch(setUser(ema));
            await save_data("email", ema)
            // setView(Email,provider);
            props.navigation.navigate('Dashboard');
          }
        })
        .catch(err => {
          console.log('err==>', err);
          if (err?.statusCode === 502) {
            setisloading(false);
            showPopup('User Already Exist');
          } else if (res?.statusCode === 403) {
            setisloading(false);
            showPopup(err.message);
          }
        })
        .finally(() => {
          setisloading(false);
        });
    }
  };

  // const setView = async (email) => {
  //     let data={
  //         signin:"true",
  //         email:email,
  //         provider:provider
  //     }
  //     try {
  //       await save_data('data', JSON.stringify(data));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  return (
    <View style={styles.mainContainer}>
      <Loader loading={isloading} />
      <ScrollView showsHorizontalScrollIndicator={false}>
        <ImageBackground
          imageStyle={{borderRadius: 80}}
          source={ProfileImage == '' ? Images.Profile : {uri: ProfileImage}}
          style={{
            height: 100,
            width: 100,
            alignSelf: 'center',
            marginTop: Theme.screenHeight / 30,
          }}>
          <Pressable
            onPress={() => pickImage()}
            style={{
              backgroundColor: 'grey',
              width: 35,
              position: 'absolute',
              bottom: 0,
              alignSelf: 'flex-end',
              alignItems: 'center',
              borderRadius: 60,
              padding: 4,
            }}>
            <AntDesign name="camera" color={Theme.white} size={22} />
          </Pressable>
        </ImageBackground>
        <Text style={styles.login}>Complete Profile</Text>
        <View style={styles.inputView}>
          <TextComponent
            source="person"
            placeholder="First Name"
            value={firstname}
            onChangeText={firstname => setFirstName(firstname)}
          />
        </View>
        <View style={styles.inputView}>
          <TextComponent
            source="person"
            placeholder="Last Name"
            value={lastname}
            onChangeText={lastname => setLastName(lastname)}
          />
        </View>
        <View style={styles.inputView}>
          <TextComponent
            source="person"
            placeholder="Username"
            value={username}
            onChangeText={username => setUserName(username)}
          />
        </View>
        <View style={styles.inputView}>
          <TextComponent
            source="mail"
            placeholder="Email"
            value={Email}
            onChangeText={email => setEmail(email)}
          />
        </View>
        <View style={styles.inputView}>
          <TextComponent
            source="business"
            placeholder="City"
            value={city}
            onChangeText={city => setCity(city)}
          />
        </View>
        <View style={styles.passwordView}>
          <TextComponent
            source="ios-eye-off-sharp"
            placeholder="Password"
            value={password}
            onChangeText={password => setPassword(password)}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: Theme.screenHeight / 70,
          }}>
          <Checkbox
            color={Theme.primary}
            uncheckedColor={Theme.black}
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text>Added by Brand Ambassador </Text>
        </View>
        <View style={styles.btnView}>
          <ButtonComponent text="Signup" onPress={() => onSubmit()} />
          <View style={styles.createAccount}>
            <Text style={{color: Theme.black}}>
              Already Have An Account? {''}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Signin')}>
              <Text style={{color: Theme.primary}}>Signin</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <NotificationPopup
        ref={ref => (popup = ref)}
        renderPopupContent={renderCustomPopup}
        shouldChildHandleResponderStart={true}
        shouldChildHandleResponderMove={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Theme.white,
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    marginTop: Theme.screenHeight / 20,
    width: 230,
    height: 56,
  },
  coursesText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: Theme.screenHeight / 15,
  },
  login: {
    color: Theme.black,
    fontSize: Theme.screenHeight / 30,
    fontWeight: 'bold',
    marginLeft: Theme.screenWidth / 20,
    marginTop: Theme.screenHeight / 20,
    marginBottom: Theme.screenHeight / 40,
  },
  inputView: {
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: Theme.screenHeight / 90,
  },
  btnView: {
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  passwordView: {
    justifyContent: 'center',
    padding: 15,
  },

  createAccount: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: Theme.screenHeight / 40,
  },
  socialText: {
    color: Theme.white,
    fontSize: 15,
  },
  popup: {
    backgroundColor: Theme.primary,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: Theme.screenHeight / 40,
  },
});
export default CompleteProfile;
