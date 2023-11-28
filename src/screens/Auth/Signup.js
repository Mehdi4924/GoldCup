import React, { Component,useRef } from 'react';
import { useState } from 'react';
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
import { Images } from '../../constants/Images';
import Theme from '../../utils/Theme';
import { Checkbox } from 'react-native-paper';
import { launchCamera , launchImageLibrary } from 'react-native-image-picker';
import Loader from '../../components/Loader';
import NotificationPopup from 'react-native-push-notification-popup';
import { SignupApi } from '../../utils/Api/Api_controller';
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/mainSlice';
import { Signup_validation } from '../../utils/validation';
import { save_data } from '../../components/Controller';
import RBSheet from "react-native-raw-bottom-sheet";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Signup = (props) => {
  const refRBSheet = useRef();
  const popup = useRef()
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [see, setSee] = useState(true)
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [checked, setChecked] = useState(false);
  const [ProfileImage, setProfileImage] = useState('');
  const [image, setImage] = useState("");
  const [isloading, setisloading] = useState(false)
  const [imageType, setImageType] = useState("");
  const dispatch = useDispatch();

  const pickImage = () => {
    refRBSheet.current.close()
    launchImageLibrary(
        {
            mediaType: 'photo',
            includeBase64: true,
            selectionLimit: 1,
        },
        async response => {
            if(response.didCancel){
                console.log("cancel");
            }else{
                setProfileImage(response.assets[0].uri);
                setImageType(response.assets[0].base64);
                 
            }
          
        },
    );

};
const pickImageFromCamera = () => {
    refRBSheet.current.close()
    launchCamera(
        {
            mediaType: 'photo',
            includeBase64: true,
            selectionLimit: 1,
        },
        async response => {
            if(response.didCancel){
                console.log("cancel");
            }else{
                setProfileImage(response.assets[0].uri);
                setImageType(response.assets[0].base64);
                
            }
        },
    );

};
  const renderCustomPopup = ({title }) => (
    <View style={styles.popup}>
      <Text style={{ color: Theme.black, fontSize: Theme.screenHeight / 60,fontFamily:Theme.fontFamily }}>{title}</Text>
    </View>
  );
  const showPopup = (errors) => {
    popup.current.show({
      appTitle: 'Copied',
      title: errors,
      slideOutTime: 2000
    });

  }
  const onSubmit = async () => {
    setisloading(true);
    let validate = Signup_validation(firstname, username, lastname, Email, city, password)
    if (validate.valid == true) {
      var body = {
        profileimage: imageType, Email: Email, FirstName: firstname, LastName: lastname, userName: username, password: password, PhoneNumber: "", AidedByBrandAmbassador: checked,
        City: city, provider: "Email"
      }
      let res = await SignupApi(body);
      console.log(JSON.stringify(res));
      if (res?.message == "User Already Exists") {
        
        setisloading(false)
        showPopup("User Already Exist ")
      }
      else if (res?.statusCode === 403) {
        setisloading(false)
        showPopup(res.message)
      }
      else if (res?.data?.message == "User has been registered successfully") {
        setisloading(false)
        let dd = { email: Email, signin:"true" }
        await save_data("email", dd)
        showPopup(res?.data?.message)
        props.navigation.navigate('Dashboard')
        let dis = { Email: Email, password: password }
        dispatch(setUser(dis))
      }
      else if (res.message == "Network Error") {
        showPopup(res.message);
        setisloading(false)
      }
    }
    else {
      setisloading(false)
      console.log(validate.errors);
      showPopup(validate.errors);
    }
  }
  return (
    <View style={styles.mainContainer}>
      <Loader loading={isloading} />
      <ScrollView showsHorizontalScrollIndicator={false}>
        <ImageBackground imageStyle={{ borderRadius: 80 }} source={ProfileImage == ''
          ? Images.Profile
          : { uri: ProfileImage }
        } style={{ height: 100, width: 100, alignSelf: 'center', marginTop: Theme.screenHeight / 30 }} >
          <Pressable onPress={() => refRBSheet.current.open()} style={{ backgroundColor: 'grey', width: 35, position: 'absolute', bottom: 0, alignSelf: 'flex-end', alignItems: 'center', borderRadius: 60, padding: 4 }}>
            <AntDesign name="camera" color={Theme.white} size={22} />
          </Pressable>
        </ImageBackground>
        <Text style={styles.login}>Signup</Text>
        <View style={styles.inputView}>
          <TextComponent
            source="person"
            placeholder="First Name"
            value={firstname}
            editable={true}

            onChangeText={(firstname) => setFirstName(firstname)}
          />
        </View>
        <View style={styles.inputView}>
          <TextComponent
            source="person"
            placeholder="Last Name"
            value={lastname}
            editable={true}

            onChangeText={(lastname) => setLastName(lastname)}
          />
        </View>
        <View style={styles.inputView}>
          <TextComponent
            source="person"
            placeholder="Username"
            editable={true}

            value={username}
            onChangeText={(username) => setUserName(username)}
          />
        </View>
        <View style={styles.inputView}>
          <TextComponent
            source="mail"
            placeholder="Email"
            editable={true}

            value={Email}
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View style={styles.inputView}>
          <TextComponent
            source="business"
            placeholder="City"
            value={city}
            editable={true}

            onChangeText={(city) => setCity(city)}
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
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: Theme.screenHeight / 70 }}>
          <Checkbox
            color={Theme.primary}
            uncheckedColor={Theme.black}
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text style={{color:Theme.black,fontFamily:Theme.fontFamily,fontSize:Theme.screenHeight/60}}>Added by Brand Ambassador </Text>
        </View>
        <View style={styles.btnView}>
          <ButtonComponent
            text="Signup"
            onPress={() => onSubmit()}
          />
          <View style={styles.createAccount}>
            <Text style={{ color: Theme.black ,fontFamily:Theme.fontFamily,}}>
              Already Have An Account? {''}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Signin')}>
              <Text style={{ color: Theme.primary ,fontFamily:Theme.fontFamily}}>Signin</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <NotificationPopup
        ref={popup}
        renderPopupContent={renderCustomPopup}
        shouldChildHandleResponderStart={true}
        shouldChildHandleResponderMove={true} />

<RBSheet
                ref={refRBSheet}
                height={Theme.screenHeight/5}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent"
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}>
                <TouchableOpacity style={styles.sheetView} onPress={()=> pickImageFromCamera()} >
                    <AntDesign name="camera" size={Theme.screenHeight/40} color={Theme.primary}  />
                    <Text style={styles.sheetText}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sheetView} onPress={()=> pickImage()} >
                <Ionicons name="images" size={Theme.screenHeight/40} color={Theme.primary}  />
                    <Text style={styles.sheetText}>Gallery</Text>
                </TouchableOpacity>
            </RBSheet>
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
    color: Theme.black, fontSize: Theme.screenHeight / 30, fontFamily:Theme.fontFamilyBold,
    marginLeft: Theme.screenWidth / 20, marginTop: Theme.screenHeight / 20,
    marginBottom: Theme.screenHeight / 40
  },
  inputView: {
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: Theme.screenHeight / 90
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
    padding: 10, alignItems: 'center',
    borderRadius: 5,
    paddingVertical: Theme.screenHeight / 40,
  },
  sheetView: {
    padding: Theme.screenHeight / 80, marginVertical: Theme.screenHeight / 90,
    borderBottomWidth:0.6,
    borderBottomColor:'lightgrey',
    flexDirection:'row',
    alignItems:'center'
},
sheetText: {
    color: Theme.white,
    
    paddingHorizontal: Theme.screenWidth / 30
}
});
export default Signup;
