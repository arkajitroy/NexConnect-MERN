import React from "react";
import Image from "next/image";
import { ChatIllustration } from "@/assets";
import { useStateProvider } from "@/context/StateContext";

const onboarding = () => {
  const [{ userInfo }] = useStateProvider();

  console.log(userInfo);
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
            <span>{userInfo.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default onboarding;
