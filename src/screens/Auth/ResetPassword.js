import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import ButtonComponent from '../../components/ButtonComponent';
import Header from '../../components/Header';
import TextComponent from '../../components/TextComponent';
import { ForgetPassword } from '../../utils/Api/Api_controller';
import Theme from '../../utils/Theme';
import NotificationPopup from 'react-native-push-notification-popup';
import Loader from '../../components/Loader';
import Popup from '../../components/Popup';
import { Images } from '../../constants/Images';

const ResetPassword = (props) => {
    const [email, setEmail] = useState("")
    const [isloading, setisloading] = useState(false)

    const onSubmit = async () => {
        if(email==""){
            showPopup("Enter Your Email")
        }else{

        
        setisloading(true)
        let mail = { email: email }
        let res = await ForgetPassword(mail);
        if (res !== undefined) {
            setisloading(false)
            // Popup(res?.data)
            showPopup(res?.data+"✅")
            setEmail("")
        }
        else {
            showPopup(res?.data+"❌")
            setisloading(false)
        }
    }
    }

    const renderCustomPopup = ({ appIconSource, appTitle, timeText, title, body }) => (
        <View style={styles.popup}>
            <Text style={{ color: Theme.black, fontSize: Theme.screenHeight / 60, }}>{title}</Text>
        </View>
    );
    const showPopup = (errors) => {
        popup.show({
            appTitle: 'Copied',
            title: errors,
            slideOutTime: 2000
        });

    }
    return (
        <View style={styles.container}>
            <Loader loading={isloading} />

            <Header backIcon={() => props.navigation.goBack()} image={true} />
            <ImageBackground source={Images.background} style={{flex:1}}>
            <View style={{ padding: Theme.screenHeight / 30 }}>
                {/* <Text style={styles.reset}>Forgot Password</Text> */}
                <View style={{ marginVertical: Theme.screenHeight / 50 }}>
                    <Text style={{ marginVertical: Theme.screenHeight / 60,fontFamily:Theme.fontFamily, color: Theme.black }}>Enter Email to reset your password</Text>
                    <TextComponent
                        source="mail"
                        placeholder="Email"
                        value={email}
                        editable={true}

                        onChangeText={(email) => setEmail(email)}
                    />
                    <View style={{ marginVertical: Theme.screenHeight / 30 }}>
                        <ButtonComponent
                            text="Reset"
                            onPress={onSubmit}
                        />
                    </View>
                </View>

            </View>
            </ImageBackground>
            <NotificationPopup
                ref={ref => popup = ref}
                renderPopupContent={renderCustomPopup}
                shouldChildHandleResponderStart={true}
                shouldChildHandleResponderMove={true} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.white,
    },
    reset: {
        fontSize: Theme.screenHeight / 40,
        color: Theme.black
    },
    popup: {
        backgroundColor: Theme.primary,
        padding: 10, alignItems: 'center',
        borderRadius: 5,
        paddingVertical: Theme.screenHeight / 40,
      },
});

export default ResetPassword;
