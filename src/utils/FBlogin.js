import {
    LoginManager,
    AccessToken,
  } from "react-native-fbsdk-next";
  import auth from '@react-native-firebase/auth';

  const FBlogin = async () => {

    let error = false;
    let response;
    const dataa = await LoginManager.logInWithPermissions([
      "public_profile",
      "email",
    ]);
    if (dataa.isCancelled) {

      error = true;
      response = "";
      return { error, response };
    }
    // const data = await AccessToken.getCurrentAccessToken();
    // if (!data) {
    //   throw 'Something went wrong obtaining access token';
    // }
    // const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    // let dataa =auth().signInWithCredential(facebookCredential);
    error = false;
    response = dataa
    return { error, response }
  };
  
  export default FBlogin;