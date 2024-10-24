import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBJcVYk1RnmMN2sCAjcMiFrv-TouJ8qTqk',
  authDomain: 'parking-inspection.firebaseapp.com',
  projectId: 'parking-inspection',
  storageBucket: 'parking-inspection.appspot.com',
  messagingSenderId: '820455181933',
  appId: '1:820455181933:web:67e9668eaceefa3e977964',
  measurementId: 'G-2R7X8DH9JL',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };
