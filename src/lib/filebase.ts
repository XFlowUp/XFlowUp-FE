'use client';
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC-IAE3C9TiT2_ByOYrAfnnp87Wfuq7q6M',
  authDomain: 'xflowup.firebaseapp.com',
  projectId: 'xflowup',
  storageBucket: 'xflowup.firebasestorage.app',
  messagingSenderId: '840473784492',
  appId: '1:840473784492:web:4de48c700d833d6804af09',
  measurementId: 'G-C5QMR0Z3SS',
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { app, db };
