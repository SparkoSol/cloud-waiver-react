import React, {useState} from 'react';
import {toast} from "react-hot-toast";
import QRCode from 'qrcode';
import Button from "./Button";

const QRCodeComponent = ({url}) => {
  const [qrCodeUrl, setQRCodeUrl] = useState('');

  const shareQRCode = async () => {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(url);
      setQRCodeUrl(qrCodeDataUrl)
      if (navigator.share) {
        navigator.share({
          title: 'QR Code Image',
          files: [dataURLtoFile(qrCodeDataUrl, 'qrcode.png')]
        });
      } else {
        toast.error('Sharing not supported')
      }
    } catch (error) {
      setQRCodeUrl('')
      console.log(error)
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
    return new File([u8arr], filename, {type: mime});
  };

  return (
    <div className='py-2 w-fit space-y-2'>
      <Button btnText='Generate QR Code' onClick={shareQRCode}
              btnClasses='bg-gray-200 px-5 py-2.5 text-gray-900'/>
      {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code"/>}
    </div>
  );
};

export default QRCodeComponent;
