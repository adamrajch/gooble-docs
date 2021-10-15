import {
  DocumentTextIcon,
  FolderAddIcon,
  MenuIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import Button from "@material-tailwind/react/Button";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
export default function Header() {
  const router = useRouter();
  function signOutUser() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.push("/login");
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
  }
  return (
    <div className="sticky top-0 z-50 flex items-center px-4 py-2 shadow-md bg-white">
      <Button
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        color="blue"
        className="h-20 w-20 border-0"
      >
        <MenuIcon className="h-6 w-6 text-blue-500" />
      </Button>
      <DocumentTextIcon className="h-8 w-8 text-blue-500" />
      <h1 className="ml-2 text-gray-700 text-2xl">Docs</h1>
      <div className="mx-5 md:mx-20 flex flex-grow items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg group focus-within:text-gray-600 focus:border-none focus-within:shadow-md ">
        <SearchIcon className="h-6 w-6 text-blue-500" />
        <input
          placeholder="Search"
          className="flex-grow px-5 text-base bg-transparent outline-none focus:border-none "
          type="text"
        />
      </div>
      <Button onClick={signOutUser}>Sign Out</Button>
      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="hidden md:inline-flex ml-5 md:ml-20 h-20 w-20 border-0"
      >
        <FolderAddIcon className="h-8 w-8 text-blue-500" />
      </Button>
      {/* 
      <img
        loading="lazy"
        onClick={signOut}
        className="cursor-pointer h-12 w-12 rounded-full ml-2"
        src={session.user.image}
        alt=""
      /> */}
    </div>
  );
}
