
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";

const RbSheet = (ref) => {

    return (
        <View style={styles.container}>

            <RBSheet
                ref={ref}
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
                <Text>ksdjfbjaks</Text>
            </RBSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
});

export default RbSheet;
