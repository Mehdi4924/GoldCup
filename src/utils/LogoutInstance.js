import { LoginManager } from "react-native-fbsdk-next";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const logoutInstance = async () => {
  LoginManager.logOut();
  let authState = auth()._user;
  if (
    authState !== null &&
    authState.providerData[0].providerId == "google.com"
  ) {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    await auth().signOut();
    return true;
  } else if (
    authState !== null &&
    authState.providerData[0].providerId == "facebook.com"
  ) {
    LoginManager.logOut();
    await auth().signOut();
    return true;
  } else {
    return false;
    // console.log('there is nothing');
  }
// return true;
};

export default logoutInstance;
