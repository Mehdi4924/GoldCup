import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { Images } from '../constants/Images';
import Theme from '../utils/Theme';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';


const Header = ({ icon, iconName, onPressIcon, title, image, backIcon }) => {
    return (
        <Card elevation={5} style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Theme.screenWidth / 30 }}>
                <Pressable onPress={backIcon}>
                    <Ionicons name="arrow-back" color={Theme.black} size={Theme.screenHeight / 35} />
                </Pressable>
                {!image ? (
                    <Text style={{color:Theme.primary,fontSize:22,fontFamily:'LBRITED'}}> {title}</Text>
                ) : (
                    <Image source={Images.goldcup} style={styles.image} />
                )}
                {icon ? (
                    <Pressable onPress={onPressIcon}>
                        <Ionicons name={iconName} color={Theme.black} size={Theme.screenHeight / 35} />
                    </Pressable>
                ) : (
                    <View></View>
                )}
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: Theme.screenHeight / 60,
        backgroundColor: Theme.white,
        elevation: 5
    },
    image: {
        width: Theme.screenWidth / 3,
        height: Theme.screenHeight / 30,
        alignSelf: 'center'
    }
});

export default Header;
