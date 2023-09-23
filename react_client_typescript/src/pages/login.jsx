import { firebaseAuth } from "@/config/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";

function login() {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(firebaseAuth, provider);
    console.log("user-google auth : ", user);
  };

  return (
    <div className="main-page-container">
      <div className="h-40 w-1/4 bg-blue-400 flex flex-col items-center justify-center">
        <h3 className="text-black text-2xl w-max">Login NexChat</h3>
        <button
          onClick={handleGoogleLogin}
          className="bg-black text-white my-2 py-2 px-6 w-max"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default login;
