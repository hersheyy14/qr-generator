import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./qrcode.css";

const Qrcode = () => {
  const [temp, setTemp] = useState("");
  const [word, setWord] = useState("qr-code Generator");
  const [bgColor, setBgColor] = useState("ffffff");
  const [size, setSize] = useState(400);
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    setQrCode(
      `http://api.qrserver.com/v1/create-qr-code/?data=${word}!&size=${size}x${size}&bgcolor=${bgColor}`
    );
  }, [word, bgColor, size]);

  const clickHandle = () => {
    setWord(temp);
  };
  function downloadImage() {
    Axios({
      method: "get",
      url: `http://api.qrserver.com/v1/create-qr-code/?data=${word}!&size=${size}x${size}&bgcolor=${bgColor}`,
      responseType: "arraybuffer",
    })
      .then((response) => {
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/octet-stream" })
        );
        link.download = `${size}.jpg`;
        document.body.appendChild(link);
        link.click();
        setTimeout(function () {
          window.URL.revokeObjectURL(link);
        }, 200);
      })
      .catch((error) => {});
  }
  return (
    <div>
      <div className="nav">
        <h1>QR Code Generator</h1>
      </div>
      <div className="container">
        <div className="input-text">
          <div className="gen">
            <input
              type="text"
              placeholder="Enter text to encode"
              value="qr-Code Generator"
              onChange={(e) => {
                setTemp(e.target.value);
              }}
            />
            <button className="generate-button" onClick={clickHandle}>
              Generate
            </button>
          </div>
          <div className="other">
            <h5>Background Color:</h5>
            <input
              style={{ margintop: "10px" }}
              type="color"
              onChange={(e) => {
                setBgColor(e.target.value.substring(1));
              }}
            />
            <h5>Dimension:</h5>
            <input
              type="range"
              max="600"
              min="200"
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="download">
          <img src={qrCode} alt="" />
          <button type="button" onClick={downloadImage}>
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Qrcode;
