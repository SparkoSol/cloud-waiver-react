import React, {useEffect, useState} from 'react';
import QRCode from 'qrcode';
import Button from "./Button";

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
      <div className='py-2 w-fit mr-auto space-y-2'>
        <Button btnText='Generate QR Code' onClick={generateQRCode}
                btnClasses='bg-gray-200 px-5 py-2.5 text-gray-900'/>
        {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" />}
      </div>
  );
};

export default QRCodeComponent;
