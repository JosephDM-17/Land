import React, { useContext, useState, useEffect } from "react";
import house from "../../assets/house.jpg";
import Card from "../card/card";
import "./Landingpage.css";
import { Context } from "../../store/Context";

function LandingPage() {
  const { currentAccount, LandRegistrationContractRef, count } =
    useContext(Context);

  const [lands, setLands] = useState([]);

  const getLandDetails = async (landId) => {
    if (LandRegistrationContractRef.current) {
      const data = await LandRegistrationContractRef.current.methods
        .getLandDetails(landId)
        .call({ from: currentAccount });
      return data;
    }
  };

  useEffect(() => {
    const fetchLandDetails = async () => {
      const landDetails = [];

      for (let i = 1; i <= count; i++) {
        const land = await getLandDetails(i);
        land["landId"] = i;
        landDetails.push(land);
      }

      setLands(landDetails);
    };

    fetchLandDetails();
  }, [count, currentAccount]);

  const buyLand = async (landId, value) => {
    await LandRegistrationContractRef.current.methods
      .buyLand(landId)
      .send({ from: currentAccount, value: value })
      .on("receipt", function (receipt) {
        alert("Transaction successfully");
      })
      .on("error", function (error) {
        alert(error.message);
      })
      .on("myEvent", function (event) {
        alert("My event: ", event);
      });
  };

  return (
    <div className="card-container">
      {lands.map(
        (land, index) =>
          land.isForSale && (
            <Card
              key={index}
              imageSrc={land.imageHash}
              title={`${land.cost / 10 ** 18} ETH`}
              subtitle={land.landId}
              text="Buy Land"
              onClick={() => buyLand(land.landId, land.cost)} // lANDiD CAN BE USED AS TOKENID
              isForSale={land.isForSale}
              documentHash={land.documentHash}
            />
          )
      )}
    </div>
  );
}

export default LandingPage;
