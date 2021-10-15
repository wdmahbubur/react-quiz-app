import { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import firebaseAuthentication from '../Firebase/Firebase.initialize';

firebaseAuthentication();

const useFirebase = () => {

    const [user, setUser] = useState({});
    const [error, setError] = useState();

    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
        })
        return unsubscribe;
    }, [auth])

    const signUp = (name, email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                updateProfile(auth.currentUser, { displayName: name })
                    .then(() => {
                        setUser(userCredential.user);
                    });
            })
            .catch(error => {
                setError(error.message);
            })
    }

    const login = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                setUser(userCredential.user);
            })
            .catch(error => {
                if (error.message === "Firebase: Error (auth/user-not-found).") {
                    setError("User Not Found")
                }
                else if (error.message === "Firebase: Error (auth/wrong-password).") {
                    setError("Wrong Password")
                }
                else {
                    setError(error.message)
                }
            })

    }

    const logout = () => {
        signOut(auth).then(() => {
            setUser();
        })
    }

    return {
        user,
        auth,
        signUp,
        login,
        error,
        logout
    }
};

export default useFirebase;