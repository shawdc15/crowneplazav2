// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDZVFXezkiJdAD4sIyulbw5vjKgnddYNLQ',
  authDomain: 'crowneplaza-ca5b0.firebaseapp.com',
  projectId: 'crowneplaza-ca5b0',
  storageBucket: 'crowneplaza-ca5b0.appspot.com',
  messagingSenderId: '228644163081',
  appId: '1:228644163081:web:436f60564110eecae3b2d8',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
