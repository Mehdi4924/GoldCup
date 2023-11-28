import React, { Component,useEffect,useRef,useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../utils/Theme';
import NotificationPopup from 'react-native-push-notification-popup';
const Popup = ({message}) => {

if(message!==""){
    popup.show({
        // onPress: function() {console.log('Pressed')},
        appTitle: 'Copied',
        title: mess,
        slideOutTime: 2000
      });
}
    const renderCustomPopup = ({ appIconSource, appTitle, timeText, title, body }) => (
        <View style={styles.popup}>
          <Text style={{color:Theme.black,fontSize:Theme.screenHeight/60 ,}}>{title}</Text>
        </View>
      );

        
    
      
    return (
        <View style={styles.container}>
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

    },
    popup:{backgroundColor:Theme.primary,
        padding:10,alignItems:'center',
        borderRadius:5,
        paddingVertical:Theme.screenHeight/40,
        },
});

export default Popup;
