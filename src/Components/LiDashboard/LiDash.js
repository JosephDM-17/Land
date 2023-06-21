import React, { useContext, useState, useEffect } from "react";
import "./LiDash.css";
import { Context } from "../../store/Context";

function LiDashboard() {
  const { currentAccount, LandRegistrationContractRef, count } =
    useContext(Context);

  const [landDetails, setLandDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const details = [];
      for (let i = 1; i <= count; i++) {
        const data = await getLandDetails(i);
        details.push(data);
      }
      setLandDetails(details);
    };
    fetchData();
  }, [count]);

  const approve = async (landId) => {
    if (LandRegistrationContractRef.current) {
      await LandRegistrationContractRef.current.methods
        .verifyLand(landId)
        .send({ from: currentAccount })
        .on("receipt", function (receipt) {
          alert("Approved successfully");
        })
        .on("error", function (error) {
          alert(error.message);
        })
        .on("myEvent", function (event) {
          alert("My event: ", event);
        });
    }
  };

  const getLandDetails = async (landId) => {
    if (LandRegistrationContractRef.current) {
      const data = await LandRegistrationContractRef.current.methods
        .getLandDetails(landId)
        .call({ from: currentAccount });
      return data;
    }
  };

  return (
    <div className="body">
      <header>
        <h1>Document Approval Page</h1>
      </header>
      <section className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Owner</th>
              <th>Area</th>
              <th>Cost</th>
              <th>Address</th>
              <th>Document Link</th>
              <th>Image Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {landDetails.map((data, index) => (
              <tr key={index}>
                <td>{data.owner}</td>
                <td>{data.area}</td>
                <td>{data.cost / 10 ** 18} Eth</td>
                <td>{data.addressStr}</td>
                <td>
                  <a href={data.documentHash} target="_blank">
                    Document
                  </a>
                </td>
                <td>
                  {" "}
                  <a href={data.imageHash} target="_blank">
                    Image
                  </a>
                </td>
                <td>
                  {data.isVerified ? (
                    "Approved"
                  ) : (
                    <button
                      className="approve"
                      onClick={async () => await approve(index + 1)}
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default LiDashboard;
