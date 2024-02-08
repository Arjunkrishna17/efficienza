"use client";

import Image from "next/image";

import { signIn, signOut, useSession } from "next-auth/react";

const Auth = () => {
  const { data, status } = useSession();

  let button = (
    <button
      onClick={() => signIn("github")}
      className="flex justify-center items-center border border-black py-5 px-5 space-x-5 hover:bg-black rounded-lg group"
    >
      <Image
        src="/github.svg"
        alt="github"
        className="group-hover:invert"
        width={30}
        height={30}
        priority
      />

      <span className="font-bold group-hover:text-white">
        Log In with GitHub
      </span>
    </button>
  );

  if (status === "authenticated") {
    button = (
      <button
        onClick={() => signOut()}
        className="flex justify-center items-center w-44 border py-2 bg-black text-white rounded-lg"
      >
        Sign Out
      </button>
    );
  }
  return (
    <div className="flex w-full h-full justify-center items-center ">
      {button}
    </div>
  );
};

export default Auth;
