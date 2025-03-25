import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId:
    '782454003523-jslhpbrg6ct7mihmpg54gf2l1d8j81n6.apps.googleusercontent.com', // Get this from Firebase Console
});

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    console.log('Google Sign-In Response:', userInfo); // Debugging

    const idToken = userInfo?.data?.idToken; // Ensure idToken is correctly accessed

    if (!idToken) {
      throw new Error('Google Sign-In failed: No ID Token received');
    }
    // Authenticate with Firebase using the Google ID Token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userCredential = await auth().signInWithCredential(googleCredential);

    // Retrieve the Firebase ID Token
    const firebaseToken = await userCredential.user.getIdToken(); 

    return {user: userCredential.user, token: firebaseToken}; // 🔹 Return token
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
};
