import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

const QRCodeComponent = () => {
  const [qrCodeUrl, setQRCodeUrl] = useState('');
  const [originalUrl] = useState('https://www.google.com');

  useEffect(() => {
    if (qrCodeUrl && originalUrl) {
      shareQRCode();
    }
  }, [qrCodeUrl, originalUrl]);

  const generateQRCode = async () => {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(originalUrl);
      setQRCodeUrl(qrCodeDataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const shareQRCode = () => {
    try {
      if (navigator.share) {
        navigator.share({
          title: 'QR Code Image',
          files: [dataURLtoFile(qrCodeUrl, 'qrcode.png')]
        });
      } else {
        console.log('Sharing not supported');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  const dataURLtoFile = (dataUrl, filename) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
      <div>
        <h1>QR Code</h1>
        <button onClick={generateQRCode}>Generate QR Code</button>
        {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" />}
      </div>
  );
};

export default QRCodeComponent;
