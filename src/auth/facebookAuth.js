import auth from '@react-native-firebase/auth';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';

export const signInWithFacebook = async () => {
  try {
    // Request Facebook Login
    await LoginManager.logInWithPermissions(['public_profile', 'email']);
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw new Error('Facebook Sign-In failed: No access token received');
    }

    console.log('Facebook Access Token:', data.accessToken); // Debugging

    // Create Firebase credential with Facebook token
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    // Sign in with Firebase
    const userCredential = await auth().signInWithCredential(facebookCredential);

    // Get Firebase ID Token
    const firebaseToken = await userCredential.user.getIdToken();

    return { user: userCredential.user, token: firebaseToken };
  } catch (error) {
    console.error('Facebook Sign-In Error:', error);
    throw error;
  }
};
