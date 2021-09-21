import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TextEditor from "../../components/textEditor";
import { useAuthState } from "../../context/userContext";
import { db } from "../../firebase/clientApp";
export default function Doc() {
  const [pageDoc, setPageDoc] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const { user, loading } = useAuthState();
  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
    if (user && !loading) {
      fetchDoc();
    }
  }, [user, loading]);

  async function fetchDoc() {
    const docRef = doc(db, `users/${user.uid}/docs`, `${id}`);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (!docSnap?.data()?.fileName) {
        // Filename will not be present if the user doesnt have access...
        router.replace("/");
      }
      setPageDoc(docSnap.data());
      console.log("doc ", docSnap.data());
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  return (
    <div>
      {loading && (
        <div className=" flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      )}

      {pageDoc && (
        <>
          <header className="flex justify-between items-center p-3 pb-1">
            <span onClick={() => router.push("/")} className="cursor-pointer">
              <Icon name="description" size="5xl" color="blue" />
            </span>
            <div className="flex-grow px-2">
              <h2 className="text-lg text-left">{pageDoc.fileName}</h2>
              <div className="flex items-center text-sm -ml-1 h-8 text-gray-600 space-x-1">
                <p className="option">File</p>
                <p className="option">Edit</p>
                <p className="option">View</p>
                <p className="option">Insert</p>
                <p className="option">Format</p>
                <p className="option">Tools</p>
              </div>
            </div>

            <Button
              color="lightBlue"
              buttonType="filled"
              size="regular"
              className="hidden md:!inline-flex h-10"
              rounded={false}
              block={false}
              iconOnly={false}
              ripple="light"
            >
              <Icon name="people" size="md" /> SHARE
            </Button>
          </header>
          <TextEditor docID={id} user={user} pageDoc={pageDoc} />
        </>
      )}
    </div>
  );
}
