import React from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import Theme from '../utils/Theme';
import LottieView from 'lottie-react-native';

const Loader = (props) => {
  
  const { loading, ...attributes } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <LottieView source={require('../components/loaders/loader4.json')}
            style={{ width: Theme.screenWidth / 6, height: Theme.screenHeight / 5 }}
            autoPlay loop />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(135, 135, 135,0.5)',
  },
  activityIndicatorWrapper: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    height: Theme.screenHeight / 1,
    width: Theme.screenWidth / 1,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});