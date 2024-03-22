import { onAuthStateChanged, signOut } from "firebase/auth"
import { useEffect,useState } from "react"
import { auth, db } from "../../config/firebase"
import { useNavigate } from "react-router-dom"
import {collection, doc, setDoc} from 'firebase/firestore'


const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        console.log(user.uid)
      }
    })

  }, []);

  const handleSignout = () => {
    signOut(auth).then(() => {
      setUser(null)
      console.log("signed out")
      navigate("/login")
    })
  }

  
  const addUserToDatabase= async(email,uid) => {
    const userCollectionRef = collection(db, 'ticketer_user');
    const documentData = {
        email: email,
        uid: uid,
    };
    const documnetRef = doc(userCollectionRef, uid);
    await setDoc(documnetRef, documentData)

}

  return (
    <div>
      <h1>Home</h1>
      {user? <p>Welcome {user.email}</p> : <p>Loading...</p>}
      <button onClick={() => addUserToDatabase('vsygdyg', 'test2')}>ADD DOC</button>
      <button onClick={() => handleSignout()}> Sign Out</button>
    </div>
  )
}

export default Home