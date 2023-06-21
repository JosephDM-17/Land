import React, { useContext, useState } from "react";
import "../AddLand/Addland.css";
import { uploadToPinata } from "../../IPFS";
import { Context } from "../../store/Context";
// import { getFirestore, getDocs } from "firebase/firestore/lite";
// import { collection, addDoc, getDoc } from "firebase/firestore";
// import { doc, setDoc } from "firebase/firestore";
// import 'firebase/app'
// import 'firebase/firebase'
// import { db } from "../../firebase/config";
// import {FirebaseContext} from '../../store/Context'
// import { useNavigate } from "react-router-dom";

function Addland() {
  // const navigate = useNavigate();
  // const {firebase} = useContext(FirebaseContext)

  const [price, setPrice] = useState(0);
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const { currentAccount, LandRegistrationContractRef } = useContext(Context);

  // const handleSubmit = async () => {
  //   const frankDocRef = doc(db, "lands", "property");
  //   await setDoc(frankDocRef, {
  //     Name: name,
  //     Area: area,
  //     Price: price,
  //     Address: address,
  //   });

  //   const docRef = doc(db, "lands", "property");
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log("No such document!");
  //   }

  //   setName("");
  //   setArea("");
  //   setPrice("");
  //   setAddress("");
  //   navigate("./");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file1 = document.querySelector('input[name="image"]').files[0];
    const imageLink = await uploadToPinata(file1);
    const imageHash = `https://gateway.pinata.cloud/ipfs/${imageLink}`;
    const file2 = document.querySelector('input[name="document"]').files[0];
    const documentLink = await uploadToPinata(file2);
    const documentHash = `https://gateway.pinata.cloud/ipfs/${documentLink}`;
    console.log(documentHash);
    await LandRegistrationContractRef.current.methods
      .createLand(
        area,
        String(price * 10 ** 18),
        address,
        documentHash,
        imageHash
      )
      .send({ from: currentAccount })
      .on("receipt", function (receipt) {
        alert(
          receipt.events.RecordUploaded.returnValues[1] + " added successfully"
        );
      })
      .on("error", function (error) {
        alert(error.message);
      })
      .on("myEvent", function (event) {
        alert("My event: ", event);
      });
  };

  return (
    <div>
      <div className="centerDiv">
        <form>
          <label htmlFor="fname">Wallet Address</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={currentAccount}
            disabled
          />
          <br />
          <label htmlFor="fname">Area</label>
          <br />
          <input
            className="input"
            type="text"
            value={area}
            onChange={(e) => {
              setArea(e.target.value);
            }}
            id="fname"
            name="category"
            placeholder="enter your area"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            id="fname"
            name="Price"
            placeholder="in eth"
          />
          <br />
          <label htmlFor="fname">Address</label>
          <br />
          <input
            className="input"
            type="text"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <br />
          <label
            htmlFor="fname"
            style={{ fontWeight: "bold", marginRight: "46px" }}
          >
            Image
          </label>
          <input type="file" name="image" style={{ margin: "10px" }} />
          <br />
          <label
            htmlFor="fname"
            style={{ fontWeight: "bold", marginRight: "15px" }}
          >
            Document
          </label>
          <input type="file" name="document" style={{ margin: "10px" }} />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addland;
