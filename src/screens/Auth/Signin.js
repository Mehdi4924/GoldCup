import React, { Component,useRef } from 'react';
import { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import ButtonComponent from '../../components/ButtonComponent';
import { get_data, save_data } from '../../components/Controller';
import TextComponent from '../../components/TextComponent';
import { Images } from '../../constants/Images';
import Theme from '../../utils/Theme';
import { SignInApi, UserExistence } from '../../utils/Api/Api_controller';
import NotificationPopup from 'react-native-push-notification-popup';
import {
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk-next";
import FBlogin from '../../utils/FBlogin';
import GoogleLogin from '../../utils/GoogleLogin';
import Loader from '../../components/Loader';
import { loginValidation } from '../../utils/validation';
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/mainSlice';


const Signin = (props) => {
  const [userData, setUserData] = useState();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setisloading] = useState(false)
  const [error, setError] = useState("")
  const [see, setSee] = useState(true)
  const dispatch = useDispatch();
  const popup = useRef()

  const renderCustomPopup = ({ appIconSource, appTitle, timeText, title, body }) => (
    <View style={styles.popup}>
      <Text style={{ color: Theme.black, fontSize: Theme.screenHeight / 60, }}>{title}</Text>
    </View>
  );
  const showPopup = (errors) => {
    popup?.current?.show({
      appTitle: 'Copied',
      title: errors,
      slideOutTime: 2000
    });

  }

  const onSubmit = async () => {
    var login_body = { username: username, password: password };
    let validate = loginValidation(username, password, true);
    if (validate.valid == false) {
      showPopup(validate?.errors);
    } else {
      setError("");
      setisloading(true);
      let resp = await SignInApi(login_body);
      // console.log(resp?.data);
      if (resp?.data === undefined) {
        setisloading(false)
        let errors = "Incorrect Username and Password ❌";
        showPopup(errors);
      }
      else {
        setisloading(false);
        await save_data("token",resp?.data?.token)
        // dispatch(setUser(login_body));
        props.navigation.navigate('Dashboard')
        let sa = { email: username, signin: "true", provider: "internal" }
        await save_data("email", sa)
        // setView(username,"internal");
      }
    }
  };
  const onFacebookButtonPress = async () => {
    setisloading(true);
    let resp = await FBlogin();
    if (!resp.error) {
      const responseInfoCallback = async (error, result) => {
        if (error) {
          console.log(error)
          setisloading(false);
        } else {
          let customerData = {
            firstName: result?.first_name,
            lastname: result?.last_name,
            phoneNumber: result.phoneNumber ? result.phoneNumber : null,
            email: result?.email,
            social: "fb",
            profile: result.picture,
          };


          let ema = { email: result?.email, signin: "true", provider: "facebook" }
          await save_data("data", ema)
          let exis = await UserExistence(ema);
          if (exis?.message === "User with same email already exists") {
            // setView(result?.email,"facebook.com");
            setisloading(false);
            // dispatch(setUser(ema))
            await save_data("email", ema)
            props.navigation.navigate('Dashboard');
          }
          else {
            setUserData(customerData);
            setisloading(false);
            props.navigation.navigate('CompleteProfile', { data: customerData });
          }
        }
      }
      const infoRequest = await new GraphRequest(
        '/me',
        {
          accessToken: resp.response.accessToken,
          parameters: {
            fields: {
              string: 'email,name,first_name,middle_name,last_name,picture.type(large)'
            }
          }
        },
        await responseInfoCallback
      );

      await new GraphRequestManager().addRequest(infoRequest).start()
    } else {
      setisloading(false);
    }
  };
  const onGoogleButtonPress = async () => {
    setisloading(true);
    let resp = await GoogleLogin();
    // console.log(JSON.stringify(resp,null,2));
    if (!resp?.error) {
      let body = {
        Email: resp?.response.user.email,
        FirstName: resp?.response.user.given_name,
        LastName: resp?.response.user.family_name,
        Uid: resp?.response.user.id,
        profile: resp?.response.user.photo,
        fullname: resp?.response.user.name,
      }
      // await save_data("data",body)
      let ema = { email: resp?.response.user.email, signin: "true", provider: "google" }
      // console.log(resp?.response.user.email);
      let body1={email:resp?.response.user.email}
      let exis = await UserExistence(body1);
      // console.log(exis,"existence");
      if (exis?.message == "User with same email already exists") {
        // setView(resp?.response?.user?.email,"google.com");
        await save_data("email", ema)
        setisloading(false);
        dispatch(setUser(ema))
        props.navigation.navigate('Dashboard');
      }
      else {
        setUserData(body);
        setisloading(false);
        // console.log(ema);
        // await save_data("email", ema)
        props.navigation.navigate('CompleteProfile', { data: body, flag: 'google' });
      }
    } else {
      console.log(resp);
      setisloading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Loader loading={isloading} />
      <ImageBackground  source={Images.background} style={{flex:1}} >
      <ScrollView showsHorizontalScrollIndicator={false}>
        <Image source={Images.goldcup} style={styles.image} />
        <Text style={styles.login}>Login</Text>
        <View style={styles.inputView}>
          <TextComponent
            source="mail"
            editable={true}
            placeholder="Email"
            value={username}
            onChangeText={(username) => setUserName(username)}
          />
        </View>
        <View style={styles.passwordView}>
          <TextComponent
            iconPress={() => setSee(!see)}
            source={see ? "ios-eye-off-sharp" : "eye"}
            placeholder="Password"
            value={password}
            editable={true}
            secureTextEntry={see ? true : false}
            onChangeText={(password) => setPassword(password)}
          />
          <TouchableOpacity onPress={() => props.navigation.navigate('ResetPassword')}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnView}>
          <ButtonComponent
            text="Sign In"
            onPress={onSubmit}
          />
          <Pressable style={styles.card} onPress={() => onFacebookButtonPress()}>
            <Image source={Images.facebook} style={styles.facebookIcon} />
            <Text style={styles.socialText}>Continue With Facebook</Text>
          </Pressable>
          <Pressable style={styles.card} onPress={() => onGoogleButtonPress()}>
            <Image source={Images.google} style={styles.googleIcon} />

            <Text style={styles.socialText}>Continue With Google</Text>
          </Pressable>
          <View style={styles.createAccount}>
            <Text style={{ color: Theme.black,fontFamily:Theme.fontFamily }}>
              Don't Have An Account? {''}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Signup')}>
              <Text style={{ color: Theme.primary,fontFamily:Theme.fontFamily }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      </ImageBackground>
      <NotificationPopup
        ref={popup}
        renderPopupContent={renderCustomPopup}
        shouldChildHandleResponderStart={true}
        shouldChildHandleResponderMove={true} />
    </View>
  );

}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Theme.white,
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    marginTop: Theme.screenHeight / 10,
    width: 230,
    height: 56,
  },
  coursesText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: Theme.screenHeight / 15,
    // fontFamily: Theme.fontFamily,
  },
  login: {
    fontFamily:Theme.fontFamilyBold,
    color: Theme.black, fontSize: Theme.screenHeight / 30,
    marginLeft: Theme.screenWidth / 20, marginTop: Theme.screenHeight / 20
  },
  inputView: {
    marginTop: Theme.screenHeight / 40,
    justifyContent: 'center',
    padding: 15,
  },
  btnView: {
    justifyContent: 'center',
    padding: 15,
  },
  passwordView: {
    justifyContent: 'center',
    padding: 15,
  },
  forgotText: {
    color: Theme.primary,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    fontSize: 15,
    fontFamily:Theme.fontFamily,
    marginTop: Theme.screenHeight / 90,
    marginRight: Theme.screenHeight / 90,
  },
  card: {
    marginTop: Theme.screenHeight / 40,
    height: Theme.screenHeight / 20,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: Theme.primary,
    justifyContent: 'center',
    shadowColor: 'grey',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 15,
    elevation: 1,
    flexDirection: 'row',
  },
  createAccount: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: Theme.screenHeight / 40,
  },
  twitterIcon: {
    width: 20,
    height: 20,
    marginRight: '5%',
  },
  facebookIcon: {
    width: 15,
    height: 28,
    marginRight: '5%',
  },
  googleIcon: {
    width: 25,
    height: 25,
    marginRight: '5%',
  },
  socialText: {
    fontFamily: Theme.fontFamilyBold,
    color: Theme.white,
    fontSize: 15,

  },
  popup: {
    backgroundColor: Theme.primary,
    padding: 10, alignItems: 'center',
    borderRadius: 5,
    paddingVertical: Theme.screenHeight / 40,
  },

});
export default Signin;
