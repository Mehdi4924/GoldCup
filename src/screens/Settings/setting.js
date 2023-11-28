import React, { Component, useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Alert, ImageBackground, TouchableHighlight, alert, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { Images } from '../../constants/Images';
import Theme from '../../utils/Theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TextComponent from '../../components/TextComponent';
import ButtonComponent from '../../components/ButtonComponent';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { get_data, save_data } from '../../components/Controller';
import { LoginManager } from "react-native-fbsdk-next";
import Loader from '../../components/Loader';
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import NotificationPopup from 'react-native-push-notification-popup';
import { getProfile, Signout, UpdateProfile } from '../../utils/Api/Api_controller';
import RBSheet from "react-native-raw-bottom-sheet";
import Ionicons from 'react-native-vector-icons/Ionicons';


const Setting = (props) => {
    const refRBSheet = useRef();
    const pop = useRef()
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [see, setSee] = useState(true)
    const [city, setCity] = useState("");
    const [ProfileImage, setProfileImage] = useState('');
    const [provider, setProvider] = useState("")
    const [isloading, setisloading] = useState(false)
    const [imageType, setImageType] = useState("");
    const [id, setId] = useState("");

    const renderCustomPopup = ({ title }) => (
        <View style={styles.popup}>
            <Text style={{ color: Theme.black, fontSize: Theme.screenHeight / 60, }}>{title}</Text>
        </View>
    );
    const showPopup = (message) => {
        pop.current.show({
            onPress: function () { console.log('Pressed') },
            appTitle: 'Success',
            title: message,
            slideOutTime: 2000
        });
    }

    useEffect(() => {
        retrieveData();
    }, []);

    const retrieveData = async () => {
        try {
            const value = await get_data('email');
            console.log(value);
            console.log(value.email);
            setProvider(value?.provider)
            getProfileData(value?.email)
        } catch (error) {
            console.log(error);
        }
    };
    const getProfileData = async (email) => {
        setisloading(true)
        let res = await getProfile(email);
        console.log(JSON.stringify(res?.data, null, 2));
        if (res?.data !== undefined) {
            setEmail(res?.data?.email)
            setUserName(res?.data?.userName)
            setFirstName(res?.data?.firstName)
            setLastName(res?.data?.lastName)
            setCity(res?.data?.city),
                setProfileImage(res?.data?.profileImage),
                setId(res?.data?.id)
            setisloading(false)
        }
        else {
            setisloading(false)
        }
    }
    const pickImage = () => {
        refRBSheet.current.close()
        launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: true,
                selectionLimit: 1,
            },
            async response => {
                if (response.didCancel) {
                    console.log("cancel");
                } else {
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
                if (response.didCancel) {
                    console.log("cancel");
                } else {
                    setProfileImage(response.assets[0].uri);
                    setImageType(response.assets[0].base64);

                }
            },
        );

    };
    const Logout = async () => {
        setisloading(true)
        if (
            provider !== null &&
            provider == "google"
        ) {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setView();
            setisloading(false)
            setProvider("");
            props.navigation.navigate('Signin')
        } else if (
            provider !== null &&
            provider == "facebook"
        ) {
            LoginManager.logOut();
            setView()
            setisloading(false)
            props.navigation.navigate('Signin');
        } else {
            const res = await Signout();
            if (res) {
                setisloading(false)
                setView();
                props.navigation.navigate('Signin')
            }
            else {
                alert("Some Error")
            }
        }
    };
    const setView = async () => {
        let data = { signin: "false", email: "", provider: "" }
        try {
            await save_data('email', data);
        } catch (error) {
            console.log(error);
        }
    };

    const SubmitData = async () => {
        try {
            setisloading(true)
            let body = {
                id: id, profileImage: imageType, email: email, firstName: firstname, lastName: lastname, userName: username, password: password, phoneNumber: "",
                city: city, provider: provider
            }
            let res = await UpdateProfile(id, body)
            // console.log(res?.data);
            if (res?.data == "User has been updated successfully") {
                showPopup(res?.data);
                setisloading(false)
            }
            else {
                setisloading(false)
            }
        }
        catch (error) {
            showPopup(error);
            setisloading(false)
        }
    }

    const onBackPress = async () => {
        Alert.alert('Logout', 'Are you sure you want to Logout?', [
            {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Yes',
                onPress: () => {
                    Logout();
                },
            },
        ]);
        return true;
    };
    return (
        <View style={styles.container}>
            <Loader loading={isloading} />
            <Header backIcon={() => props.navigation.goBack()} title="EditProfile" icon={true} iconName="log-out-outline" onPressIcon={() => onBackPress()} />
            <ScrollView>
                <ImageBackground imageStyle={{ borderRadius: 80 }} source={ProfileImage == ''
                    ? Images.Profile
                    : { uri: ProfileImage }
                } style={{ height: 100, width: 100, alignSelf: 'center',backgroundColor:'lightgrey',borderRadius:80, marginTop: Theme.screenHeight / 30 }} >
                    <Pressable onPress={() => refRBSheet.current.open()} style={{ backgroundColor: 'grey', width: 35, position: 'absolute', bottom: 0, alignSelf: 'flex-end', alignItems: 'center', borderRadius: 60, padding: 4 }}>
                        <AntDesign name="camera" color={Theme.white} size={22} />
                    </Pressable>
                </ImageBackground>
                <View style={[styles.inputView, { marginTop: '8%' }]}>
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
                        value={username}
                        editable={true}
                        onChangeText={(username) => setUserName(username)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextComponent
                        source="mail"
                        placeholder="Email"
                        value={email}
                        editable={false}
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
                <View style={styles.btnView}>
                    <ButtonComponent
                        text="Save"
                        onPress={() => SubmitData()}
                    /></View>
            </ScrollView>
            <NotificationPopup
                ref={pop}
                renderPopupContent={renderCustomPopup}
                shouldChildHandleResponderStart={true}
                shouldChildHandleResponderMove={true} />

            <RBSheet
                ref={refRBSheet}
                height={Theme.screenHeight / 5}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent"
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
            >
                <TouchableOpacity style={styles.sheetView} onPress={() => pickImageFromCamera()} >
                    <AntDesign name="camera" size={Theme.screenHeight / 40} color={Theme.primary} />
                    <Text style={styles.sheetText}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sheetView} onPress={() => pickImage()} >
                    <Ionicons name="images" size={Theme.screenHeight / 40} color={Theme.primary} />
                    <Text style={styles.sheetText}>Gallery</Text>
                </TouchableOpacity>
            </RBSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.white
    },
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
        color: Theme.black, fontSize: Theme.screenHeight / 30, fontWeight: 'bold',
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
        padding: 15,
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
        borderBottomWidth: 0.6,
        borderBottomColor: 'lightgrey',
        flexDirection: 'row',
        alignItems: 'center'
    },
    sheetText: {
        color: Theme.white,

        paddingHorizontal: Theme.screenWidth / 30
    }
});

export default Setting;
