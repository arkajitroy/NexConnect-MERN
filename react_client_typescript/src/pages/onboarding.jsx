import React, { useState } from "react";
import Image from "next/image";
import { ChatIllustration, DefaultDP } from "@/assets";
import { useStateProvider } from "@/context/StateContext";
import { Avatar, InputField } from "@/components";

const onboarding = () => {
  const [{ userInfo }] = useStateProvider();
  const [displayName, setDisplayName] = useState(userInfo?.name || "");
  const [about, setAbout] = useState("");
  const [displayPicture, setDisplayPicture] = useState(DefaultDP);

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
            <InputField
              name="Display Name"
              state={displayName}
              setState={setDisplayName}
              label
            />
            <InputField name="About" state={about} setState={setAbout} label />
          </div>
          <div>
            <Avatar
              type="xl"
              image={displayPicture}
              setImage={setDisplayPicture}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default onboarding;
