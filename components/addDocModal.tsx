import Button from "@material-tailwind/react/Button";
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { ReactElement, useState } from "react";
import { useAuthState } from "../context/userContext";
import { db } from "../firebase/clientApp";
export default function AddDocModal(props: any): ReactElement {
  const { showModal, setShowModal } = props;
  const { loading, user } = useAuthState();

  const [input, setInput] = useState("");

  const createDocument = async () => {
    if (!input) return;
    //create doc
    await addDoc(collection(db, `users/${user.uid}/docs`), {
      fileName: input,
      timestamp: serverTimestamp(),
    });
    // db.collection("userDocs")
    //   .doc(session.user.email)
    //   .collection("docs")
    //   .add({
    //     fileName: input,
    //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //   })
    //   .then((doc) => router.push(`/doc/${doc.id}`));

    setInput("");
    setShowModal(false);
  };

  return (
    <Modal size="sm" active={showModal} toggler={() => setShowModal(false)}>
      <ModalBody>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="outline-none w-full"
          placeholder="Enter name of document..."
          onKeyDown={(e) => e.key === "Enter" && createDocument()}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="blue"
          buttonType="link"
          onClick={(e) => setShowModal(false)}
          ripple="dark"
        >
          Cancel
        </Button>

        <Button color="blue" onClick={createDocument} ripple="light">
          Create
        </Button>
      </ModalFooter>
    </Modal>
  );
}
