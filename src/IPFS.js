async function uploadToPinata(file) {
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  const apiKey = "9790d53fd78d3e4d9181";
  const apiSecret =
    "af14e43cd13cca877d6661445ad2fd2b477a16d72664b42303dbd4d6de83c66d";

  const formData = new FormData();
  formData.append("file", new Blob([file], { type: "application/json" }));

  const response = await fetch(url, {
    method: "POST",
    headers: {
      pinata_api_key: apiKey,
      pinata_secret_api_key: apiSecret,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload file to Pinata");
  }

  const data = await response.json();
  return data.IpfsHash;
}

export { uploadToPinata };
