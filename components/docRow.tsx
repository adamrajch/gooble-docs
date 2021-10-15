import { DocumentTextIcon } from "@heroicons/react/solid";
import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { db } from "../firebase/clientApp";
import DropDown from "./dropDown";
export default function DocumentRow({
  date,
  fileName,
  id,
  userID,
}: any): ReactElement {
  const router = useRouter();
  async function deleteDocument() {
    console.log("deleting doc: ", id);
    await deleteDoc(doc(db, `users/${userID}/docs`, id));
  }
  return (
    <div className="flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer">
      <div
        onClick={() => router.push(`/doc/${id}`)}
        className="flex items-center flex-grow"
      >
        <DocumentTextIcon className="h-7 w-7 text-blue-500" />
        <p className="flex-grow pl-5 w-10 pr-10 truncate">{fileName}</p>
        <p className="pr-5 text-sm">{date?.toDate().toLocaleDateString()}</p>
      </div>
      {/* 
      <Dropdown
        color="lightBlue"
        placement="bottom-start"
        buttonText=""
        buttonType="outline"
        size="sm"
        rounded={false}
        block={false}
        ripple="light"
      >
        <DropdownLink href={`doc/${id}`} ripple="light">
          Edit
        </DropdownLink>
        <DropdownItem color="lightBlue" ripple="light" onClick={deleteDocument}>
          Delete
        </DropdownItem>
      </Dropdown> */}
      <DropDown id={id} deleteDocument={deleteDocument} />
    </div>
  );
}
