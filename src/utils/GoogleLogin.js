import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({

    webClientId: '967665907401-gbep86104ogkf18t0jb2are9t5ktlhtj.apps.googleusercontent.com',
    offlineAccess: true
});

const GoogleLogin = async () => {
    try {
        let error = false
        // Get the users ID token
        const response = await GoogleSignin.signIn();
        // console.log(userInfo);
        // Create a Google credential with the token
        // const response = auth.GoogleAuthProvider.credential(idToken);
        // Sign-in the user with the credential
        // let response = await auth().signInWithCredential(googleCredential)
        error = false;
        return { error, response }

    } catch (e) {
        if (Platform.OS == 'ios') {
            // Toast.show(e.userInfo.NSLocalizedDescription, Toast.LONG)
        } else {
            console.log(e);
            // Toast.show(e.message, Toast.LONG)
        }
        let response = ""
        error = true
        return { error, response }
    }
}

export default GoogleLogin