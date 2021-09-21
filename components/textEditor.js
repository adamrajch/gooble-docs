import Button from "@material-tailwind/react/Button";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { doc, setDoc } from "firebase/firestore";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { db } from "../firebase/clientApp";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);
export default function TextEditor({ docID, user, pageDoc }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const router = useRouter();

  useEffect(() => {
    if (pageDoc.editorState) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(pageDoc.editorState))
      );
    }
  }, [pageDoc]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  async function saveDocument() {
    console.log("saving document!");
    const docRef = doc(db, `users/${user.uid}/docs`, `${docID}`);
    await setDoc(
      docRef,
      { editorState: convertToRaw(editorState.getCurrentContent()) },
      { merge: true }
    );
  }
  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-16">
      <Editor
        editorState={editorState}
        toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
        editorClassName="mt-6 xl:mt-6 p-10 max-w-6xl mx-auto shadow-lg mb-12 border bg-white"
        onEditorStateChange={onEditorStateChange}
      />
      <Button className="mx-auto" onClick={saveDocument}>
        Save
      </Button>
    </div>
  );
}
