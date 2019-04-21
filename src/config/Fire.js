import * as firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyBjh_slFpHUvImMsoPq_Yt8VVhyinpVmDo",
    authDomain: "overwatch-web-app.firebaseapp.com",
    databaseURL: "https://overwatch-web-app.firebaseio.com",
    projectId: "overwatch-web-app",
    storageBucket: "overwatch-web-app.appspot.com",
    messagingSenderId: "1095764019962"
};
const fire = firebase.initializeApp(config);

export default fire;