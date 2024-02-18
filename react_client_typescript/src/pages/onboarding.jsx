import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChatIllustration, DefaultDP } from "@/assets";
import { useStateProvider } from "@/context/StateContext";
import { Avatar, InputField } from "@/components";
import axios from "axios";
import { ONBOARD_NEW_USER_ROUTE } from "@/utils/ApiRoutes";
import { REDUCER_CASES } from "@/context/constants";

const onboarding = () => {
  const [{ userInfo, newUser }, setUser] = useStateProvider();
  const [displayName, setDisplayName] = useState(userInfo?.name || "");
  const [about, setAbout] = useState("");
  const [displayPicture, setDisplayPicture] = useState(DefaultDP);
  const router = useRouter();

  const validateUserDetails = () => {
    if (displayName.length < 3) return false;
    return true;
  };

  const handleOnboardUser = async () => {
    if (validateUserDetails()) {
      const email = userInfo.email;
      try {
        const newUserPayload = {
          name: displayName,
          email,
          about,
          displayPicture: displayPicture.src,
        };
        console.log("Payload of Frontend", newUserPayload);
        const { data } = await axios.post(ONBOARD_NEW_USER_ROUTE, newUserPayload);

        console.log("data from api", data);

        if (data.status) {
          setUser({ type: REDUCER_CASES.SET_NEW_USER, newUser: false });
          setUser({
            type: REDUCER_CASES.SET_USER_INFO,
            userInfo: newUserPayload,
          });
          router.push("/");
        }
      } catch (error) {
        alert("Something went wrong !", error.message);
      }
    }
  };

  useEffect(() => {
    if (!newUser && !userInfo?.email) router.push("/login");
    else if (!newUser && !userInfo?.email) router.push("/");
  }, [newUser, userInfo, router]);

  return (
    <div className=" bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <Image src={ChatIllustration} height={300} width={300} />
        <span className="text-6xl">Nexchat</span>
      </div>
      <div>
        <span className="text-2xl">Create your profile</span>
        <div className="flex grap-6 mt-6">
          <div className="flex flex-col items-center justify-center mt-5 gap-6">
            <InputField name="Display Name" state={displayName} setState={setDisplayName} label />
            <InputField name="About" state={about} setState={setAbout} label />
            <div className="flex items-center justify-center">
              <button
                className="flex flex-row items-center justify-center gap-2 bg-slate-700 text-white px-4 py-2 rounded-full font-semibold hover:bg-black focus:outline-none focus:ring focus:ring-green-300"
                onClick={handleOnboardUser}
              >
                Create Profile
              </button>
            </div>
          </div>
          <div>
            <Avatar type="xl" image={displayPicture} setImage={setDisplayPicture} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default onboarding;
