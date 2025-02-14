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