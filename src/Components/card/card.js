import React, { useContext, useState } from "react";
import "./card.css";
import { uploadToPinata } from "../../IPFS";

const Card = ({
  imageSrc,
  title,
  subtitle,
  onClick,
  text,
  isForSale,
  updateSell,
  landId,
  documentHash,
}) => {
  const [price, setPrice] = useState(0);

  const handleSubmit = async () => {
    const file = document.querySelector('input[name="document"]').files[0];
    const documentLink = await uploadToPinata(file);
    const documentHash = `https://gateway.pinata.cloud/ipfs/${documentLink}`;
    await updateSell(landId, String(price * 10 ** 18), documentHash);
  };

  return (
    <div className="card">
      <a href={documentHash} target="_blank" rel="noopener noreferrer">
        <img
          src={imageSrc}
          alt={title}
          className="house_image"
          height="200px"
          width="200px"
        />
      </a>

      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="card-subtitle mb-1">TokenId:- {subtitle}</p>
        <button className="btn btn-success" onClick={onClick}>
          {text}
        </button>
        {!isForSale && (
          <>
            <button
              type="button"
              className="btn m-2"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Update & Sell
            </button>
            <div
              className="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog  modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">
                      Update Details
                    </h5>
                    <button
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <label
                      style={{
                        fontWeight: "bold",
                        display: "flex",
                        margin: "15px",
                      }}
                    >
                      Price
                    </label>
                    <input
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                      style={{ backgroundColor: "lightgrey", padding: "2px" }}
                      name="price"
                      type="number"
                    ></input>
                    <label
                      style={{
                        fontWeight: "bold",
                        margin: "15px",
                        display: "flex",
                      }}
                    >
                      Document
                    </label>
                    <input
                      onChange={() => {}}
                      name="document"
                      type="file"
                    ></input>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn"
                      type="button"
                      data-bs-dismiss="modal"
                      onClick={handleSubmit}
                    >
                      Sell
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
