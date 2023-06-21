import React, { useContext, useState, useEffect } from "react";
import Card from "../card/card";
import "./Sellpage.css";
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

  const putLandOnSale = async (landId) => {
    await LandRegistrationContractRef.current.methods
      .putLandOnSale(landId)
      .send({ from: currentAccount })
      .on("receipt", function (receipt) {
        alert("Transaction successfull");
      })
      .on("error", function (error) {
        alert(error.message);
      })
      .on("myEvent", function (event) {
        alert("My event: ", event);
      });
  };

  const sellLand = async (landId, cost, documentHash) => {
    await LandRegistrationContractRef.current.methods
      .sellLand(landId, cost, documentHash)
      .send({ from: currentAccount })
      .on("receipt", function (receipt) {
        alert("Transaction successfull");
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
          String(land.owner).toUpperCase() === currentAccount.toUpperCase() && (
            <Card
              key={index}
              imageSrc={land.imageHash}
              title={`${land.cost / 10 ** 18} ETH`}
              subtitle={land.landId}
              text={land.isForSale ? "On Sale" : "Sell Land"}
              onClick={
                land.isForSale ? () => {} : () => putLandOnSale(land.landId)
              }
              isForSale={land.isForSale}
              updateSell={sellLand}
              landId={land.landId}
              documentHash={land.documentHash}
            />
          )
      )}
    </div>
  );
}

export default LandingPage;
