// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js"
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA_2yd3_KIu23n2qDnL4McPL51qBqhTD-w",
    authDomain: "sample-8e49f.firebaseapp.com",
    databaseURL: "https://sample-8e49f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sample-8e49f",
    storageBucket: "sample-8e49f.firebasestorage.app",
    messagingSenderId: "57010539033",
    appId: "1:57010539033:web:eca0a64a97e954c0f7f888"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
alert("Firebase: " + firebase.name + " and db: " + database.name);
database = getDatabase();
alert("Firebase: " + firebase.name + " and db: " + database.name);

function firebaseGetJSON(path, objectname, callback, fallback) {
    var parsedPath = UTF8ToString(path);
    var parsedObjectname = UTF8ToString(objectname);
    var parsedCallback = UTF8ToString(callback);
    var parsedFallback = UTF8ToString(fallback);
    try {
        const dbRef = ref(database);
        get(child(dbRef, `users/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                alert(snapshot.val());
            } else {
                alert("No data available");
            }
        }).catch((error) => {
            alert(error);
        });
        /*
        var starCountRef = window.firebase.database().ref(parsedPath);
        starCountRef.on('value', (snapshot) => {
            const data = snapshot.val();
            alert(JSON.stringify(data));
            //unityInstance.SendMessage(parsedObjectname, parsedCallback, JSON.stringify(data));
        });
        */
        /*
        window.database.ref(parsedPath).once('value').then(function(snapshot) {
            window.unityInstance.SendMessage(parsedObjectname, parsedCallback, JSON.stringify(snapshot.val()));
        });
        */
    }
    catch (error) {

        //unityInstance.SendMessage(parsedObjectname,parsedFallback, JSON.stringify("FirebaseJSlib error: "+error, Object.getOwnPropertyNames(error)));
        alert(JSON.stringify("Unity FirebaseJSlib error: " + error, Object.getOwnPropertyNames(error)));


    }

}