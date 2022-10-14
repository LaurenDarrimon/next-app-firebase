//GOAL - to connect our app with Firebase Database



const admin = require("firebase-admin");

const serviceAccount = require("../firebase-auth.json");


try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_URL,
      });
} catch (error) {
   console.log("you've had a Firebase error: ", error.stack) 
}

export default admin.firestore();