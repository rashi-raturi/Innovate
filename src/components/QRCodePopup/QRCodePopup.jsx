import React, { useEffect, useState } from "react";

const QRCodePopup = ({ tokenNo, onClose }) => {
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    // Generate QR code using Google Charts API
    const qrUrl = `https://chart.googleapis.com/chart?cht=qr&chl=Token:${tokenNo}&chs=200x200&choe=UTF-8&chld=H|0`;
    setQrCode(qrUrl);
  }, [tokenNo]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">Your Order Token</h2>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <img src={qrCode} alt="QR Code" className="mx-auto" />
          </div>

          <div className="text-center mb-6">
            <p className="text-gray-600">
              Show this QR code when collecting your order
            </p>
            <p className="text-3xl font-bold text-primary mt-2">#{tokenNo}</p>
          </div>

          <button
            onClick={onClose}
            className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodePopup;
