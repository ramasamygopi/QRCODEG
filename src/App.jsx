import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [img, setImg] = useState('');
  const [loading, setLoading] = useState(false);
  const [qrcode, setQrcode] = useState('https://www.youtube.com/@gygopi');
  const [qrsize, setQrsize] = useState('150');

  async function QRcodegenerate() {
    setLoading(true);
    try {
      const url = `http://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data= ${encodeURIComponent(qrcode)}`;
      setImg(url);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function Qrdownload() {
    fetch(img)
      .then((res) => res.blob())
      .then((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'qr.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }

  return (
    <div className="container">
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please wait.....</p>}
      {img &&<img src={img} alt="QR Code" className='qrimg' />}
      <div>
        <label htmlFor="datainput" className='input-label'>Data for QR code</label>
        <input
          type="text"
          id="datainput"
          value={qrcode}
          placeholder='Enter the QR code data'
          onChange={(e) => setQrcode(e.target.value)}
        />
        <br />
        <label htmlFor="size-input" className='input-label'>Size of QR code</label>
        <input
          type="text"
          id="size-input"
          value={qrsize}
          placeholder='Enter the image size'
          onChange={(e) => setQrsize(e.target.value)}
        />
        <button className='generate' type='button' onClick={QRcodegenerate} disabled={loading}>Generate QR code</button>
        <button className='download' type='button' onClick={Qrdownload}>
          Download QR code
        </button>
      </div>
      <p>
        created By @Gopi webdeveloper</p>
    </div>
  );
}

export default App;
