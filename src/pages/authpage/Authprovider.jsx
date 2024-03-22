import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect } from "react";
import { useState } from "react";
import { auth } from "../../config/firebase";
import { toast } from "react-toastify";
import PropTypes from 'prop-types'
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const createUser = async(email, password) => {
        try {
            setLoading(true)
            await createUserWithEmailAndPassword(auth, email,password);
            toast.success('Sign Up Successful');
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }

    }

    const loginUser = async(email, password) => {
        try {
            setLoading(true)
            await signInWithEmailAndPassword(auth, email, password)
            toast.success('Sign In Successful');
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }

    }

    const logOut = () => {
        setLoading(true)
        signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const authValue = {
        createUser,
        loading,
        user,
        loginUser,
        logOut,
    }

    return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default AuthProvider