import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { collection, onSnapshot, query } from "firebase/firestore";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AddDocModal from "../components/addDocModal";
import DocumentRow from "../components/docRow";
import Header from "../components/header";
import { useAuthState } from "../context/userContext";
import { db } from "../firebase/clientApp";
export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const { user, loading } = useAuthState();
  const [goobleDocs, setGoobleDocs] = useState([]);
  const router = useRouter();
  //when component mounts, run this function
  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading]);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, `users/${user.uid}/docs`));
      const unsub = onSnapshot(q, (querySnapshot) => {
        setGoobleDocs(
          querySnapshot.docs.map((d) => {
            const docObj = {
              id: d.id,
              fileName: d.data().fileName,
              timestamp: d.data().timestamp,
            };
            return docObj;
          })
        );
      });
      return unsub;
    }
  }, [user]);
  return (
    <div>
      <Head>
        <title>Google Docs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading && (
        <div className=" flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      )}
      {user && !loading && (
        <>
          <Header />
          <AddDocModal showModal={showModal} setShowModal={setShowModal} />
          <section className="bg-[#F8F9FA] pb-10 px-10 md:px-0">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between py-6">
                <h2 className="text-gray-700 text-lg">Start a new document</h2>

                <Button
                  color="gray"
                  buttonType="outline"
                  iconOnly={true}
                  ripple="dark"
                  className="border-0"
                >
                  <Icon name="more_vert" size="3xl" />
                </Button>
              </div>
              <div>
                <div
                  className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-400"
                  onClick={(e) => setShowModal(true)}
                >
                  <Image src="https://links.papareact.com/pju" layout="fill" />
                </div>
                <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">
                  Blank
                </p>
              </div>
            </div>
          </section>
          <section className="bg-white px-10 md:px-0">
            <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
              <div className="flex items-center justify-between pb-5">
                <h2 className="font-medium  flex-grow">My Documents</h2>
                <p className="mr-12">Date Created</p>
                <Icon name="folder" size="3xl" color="gray" />
              </div>

              {goobleDocs.map((doc) => (
                <DocumentRow
                  key={doc.id}
                  id={doc.id}
                  fileName={doc.fileName}
                  date={doc.timestamp}
                  userID={user.uid}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
