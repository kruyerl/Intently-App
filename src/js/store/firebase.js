import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
    apiKey: 'AIzaSyB8OF46oMOX3fVonwXYjd4wi5ELc8wNnL4',
    authDomain: 'intently-9f8b1.firebaseapp.com',
    databaseURL: 'https://intently-9f8b1.firebaseio.com',
    projectId: 'intently-9f8b1',
    storageBucket: 'intently-9f8b1.appspot.com',
    messagingSenderId: '704310877543',
    appId: '1:704310877543:web:b1ef689baddf43e4',
}

class Firebase {
    constructor() {
        const app = firebase.initializeApp(config)
        this.auth = app.auth()
        this.db = app.firestore()
    }

    login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password)
    }

    logout() {
        return this.auth.signOut()
    }

    async register(name, email, password) {
        await this.auth.createUserWithEmailAndPassword(email, password)
        this.auth.currentUser.updateProfile({
            displayName: name,
        })
        return this.claimUserDoc(name)
    }

    claimUserDoc(name) {
        if (!this.auth.currentUser) {
            return alert('not authed')
        }
        return this.db.doc(`users/${this.auth.currentUser.uid}`).set({
            uid: this.auth.currentUser.uid,
            db: {
                tasks: [],
                objectives: [],
                actions: [],
                habits: [],
            },
            creationTime: Date.now(),
            displayName: name,
            email: this.auth.currentUser.email,
            lastSignInTime: Date.now(),
        })
    }

    async getUserDoc() {
        const data = await this.db
            .doc(`users/${this.auth.currentUser.uid}`)
            .get()
            .then(res => res.data())
            .catch(err => err.message)

        return data
    }

    async postUserDoc(data) {
        const incomingdata = await this.db
            .doc(`users/${this.auth.currentUser.uid}`)
            .update(data)
            .then(res => res)
            .catch(err => err.message)

        return incomingdata
    }
}

export default new Firebase()
