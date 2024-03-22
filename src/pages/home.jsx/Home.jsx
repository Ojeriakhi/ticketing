import { onAuthStateChanged, signOut } from "firebase/auth"
import { useEffect,useState } from "react"
import { auth } from "../../config/firebase"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        console.log(user)
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
  return (
    <div>
      <h1>Home</h1>
      {user? <p>Welcome {user.email}</p> : <p>Loading...</p>}
      <button onClick={() => handleSignout()}> Sign Out</button>
    </div>
  )
}

export default Home