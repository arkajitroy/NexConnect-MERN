import React from "react";
import axios from "axios";
import { firebaseAuth } from "@/config/firebase";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import { REDUCER_CASES } from "@/context/constants";

const login = () => {
  const [{}, setUser] = useStateProvider();

  const router = useRouter();
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: profileImage },
    } = await signInWithPopup(firebaseAuth, provider);

    try {
      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, { email });
        console.log(data);

        const userInfoPayload = {
          name,
          email,
          profileImage,
          status: "",
        };
        console.log("userInfoPayload", userInfoPayload);

        if (!data.status) {
          setUser({ type: REDUCER_CASES.SET_NEW_USER, newUser: true });
          setUser({
            type: REDUCER_CASES.SET_USER_INFO,
            userInfo: userInfoPayload,
          });
          router.push("/onboarding");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-page-container">
      <div class="flex flex-col bg-white p-8 rounded shadow-md w-96 text-center">
        <h2 class="text-2xl font-semibold mb-4">Login to Nexchat</h2>
        <button
          onClick={handleGoogleLogin}
          class="flex flex-row items-center justify-center gap-2 bg-slate-700 text-white px-4 py-2 rounded-full font-semibold hover:bg-black focus:outline-none focus:ring focus:ring-green-300"
        >
          <FcGoogle />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default login;
