const firebase = require('firebase');
const admin = require('firebase-admin')
const config = require('./firebaseConfig.json')

var serviceAccount = require('../ServiceAccountKey.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "vendingmachine-f3c55.appspot.com"
})

class Firebase {
    constructor() {
        if(!firebase.apps.length){
            firebase.initializeApp(config)
        }
        this.admin = admin
        this.auth = firebase.auth()
        this.db = firebase.firestore()
        this.storage = firebase.storage()
    }
}
module.exports = Firebase;
