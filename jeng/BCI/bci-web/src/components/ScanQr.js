import React from 'react'
import QrReader from 'react-qr-scanner'
import { useState } from "react";

const ScanQr = () => {
    
    const [pageState, setPageState] = useState({
        result: 'No Result'
    });

    const previewStyle = {
      height: 240,
      width: 320,
    }

    const delay = 100;

    const handleScan = (data) => {
        if (!data) return;
        setPageState({ ...pageState, result: data['text'] });
        alert(data['text'])
    }
    
    const handleError = (err) => {
        console.log('qr scan error', err);
    }

    return (
        <div>
            <QrReader
            delay={delay}
            style={previewStyle}
            onError={handleError}
            onScan={handleScan}
            />
            <p>{pageState.result}</p>
        </div>
    );
}
 
export default ScanQr;