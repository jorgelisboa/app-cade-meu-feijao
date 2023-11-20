import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBCejAK8lz0yiTzb5yoHkbhTBokpiGARys",
    authDomain: "cade-feijao.firebaseapp.com",
    projectId: "cade-feijao",
    storageBucket: "cade-feijao.appspot.com",
    messagingSenderId: "83131597894",
    appId: "1:83131597894:web:e12d23bd1208055adff647",
}

const app = initializeApp(firebaseConfig);
export default app