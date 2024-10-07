// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore'; // Adicione o Firestore

const firebaseConfig = {
    apiKey: "AIzaSyDVaOak1Jl4HUOomcGelVMGfLi5CJbFa88",
    authDomain: "metodologiacrud.firebaseapp.com",
    databaseURL: "https://metodologiacrud-default-rtdb.firebaseio.com",
    projectId: "metodologiacrud",
    storageBucket: "metodologiacrud.appspot.com",
    messagingSenderId: "420721017092",
    appId: "1:420721017092:web:d6d052e3c687356002d051"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa a autenticação
const auth = getAuth(app);

// Inicializa o Realtime Database
const database = getDatabase(app);

// Inicializa o Firestore
const db = getFirestore(app); // Adicione esta linha

export { auth, database, db }; // Exporte a instância do Firestore
