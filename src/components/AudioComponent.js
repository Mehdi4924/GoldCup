//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native';
import { Card } from 'react-native-paper';
import Theme from '../utils/Theme';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Images } from '../constants/Images';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'

const AudioComponent = ({ image, catagory, name, onPress,url, percent, visi }) => {
    return (
        <View style={{marginTop:4}}>
            <Card elevation={5} style={{ width: '96%', alignSelf: 'center', marginTop: '1%', backgroundColor: Theme.white }}>
                <Pressable style={styles.rowView} onPress={onPress}>
                    <View style={{ flexDirection: 'row' }}>
                        <ShimmerPlaceHolder shimmerColors={['#1c1b1b', '#242424', '#000']} visible={visi} style={styles.image}
                            LinearGradient={LinearGradient} >
                            <Image source={{uri:url}} style={styles.image} />
                        </ShimmerPlaceHolder>
                        <View style={{ marginLeft: Theme.screenWidth / 24, marginTop: Theme.screenHeight / 80 }}>
                            <ShimmerPlaceHolder shimmerColors={['#1c1b1b', '#242424', '#000']} visible={visi}
                                LinearGradient={LinearGradient} >
                                <Text style={{ fontSize: Theme.screenHeight/60,width:Theme.screenWidth/1.9, color: Theme.black,fontFamily:Theme.fontFamily }}>{name}</Text>
                            </ShimmerPlaceHolder>
                            <ShimmerPlaceHolder shimmerColors={['#1c1b1b', '#242424', '#000']} visible={visi} style={{ marginTop: Theme.screenHeight / 90 }}
                                LinearGradient={LinearGradient} >
                                <Text style={{ marginTop: '1%',fontSize:Theme.screenHeight/75, color: Theme.textColor,fontFamily:Theme.fontFamily }}>{catagory}</Text>
                            </ShimmerPlaceHolder>
                        </View>
                    </View>
                    <View>

                        <AntDesign name="play" size={37} color={Theme.primary} style={{ marginTop: "4%" }} />
                        {/* </ProgressCircle> */}
                    </View>
                    {/* <AntDesign name="playcircleo" size={Theme.screenHeight/35} color={Theme.primary}
                   style={{marginRight:Theme.screenWidth/30}}
                   /> */}
                </Pressable>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({

    image: {
        width: Theme.screenWidth / 7,
        height: Theme.screenHeight / 15,
        borderRadius: 6,
    },
    rowView: {
        width: '100%',
        justifyContent: 'space-between',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default AudioComponent;
