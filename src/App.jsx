import './App.css'
import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import app from './Firebase/Firebase.config';
import { useState } from 'react';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function App() {
  const [user,setUser] = useState(null);  //
  const handleSignIn = () => {
     signInWithPopup(auth, googleProvider)
     .then(result =>{
      const loggedUser = result.user;   // ?
      console.log(loggedUser);
      setUser(loggedUser)
     })
     .catch(error => {
      console.log(error);
     })
  }
  const handleSignOut = () => {
     //SignOutWithPopup(auth,googleProvider)
     signOut(auth,googleProvider)
     .then(result => {
     //   const loggedOut = result.user;
        console.log(result);
        setUser(null);
     })
     .catch(error => {
      console.log(error);
     })
  }
  return (
    <>
      <div className="text-center">It's Hamed Special</div>

      <div>
        {
          user? <button onClick={handleSignOut}>
             Google Sign Out </button> : 
          <button onClick={handleSignIn}>
            Google Sign In
         </button>
        }
      </div>

      {
        user && <div className="car">
          <h3>User: {user.displayName}</h3>
          <h3>Email: {user.email} </h3>
          <img src={user.photoURL} alt=""/>
        </div>
      }
       
    </>
  )
}

export default App
