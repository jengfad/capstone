import React from "react";
import { useState, useEffect } from "react";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

const CertificateView = () => {
    const options = {
        cMapUrl: 'cmaps/',
        cMapPacked: true,
    };
    
    const [details, setDetails] = useState({
        userId: "",
        cid: "",
        file: null,
        numPages: 1
    });

    const onInputChange = e => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    const { userId, cid, file, numPages } = details;

    const handleViewCert = async (ev) => {
        ev.preventDefault();

        const data = new FormData();
        data.append('cid', details.cid);
        data.append('userId', details.userId);

        const request = {
            method: 'POST',
            body: data
        };

        const response = await fetch('api/view-cert', request);
        const responseJson = await response.json();

        const base64Param = `data:application/pdf;base64,${responseJson.base64}`;
        const file = dataURLtoFile(base64Param,'cert.pdf');

        setDetails({ ...details, file });
    }

    const dataURLtoFile = (dataurl, filename) => {
 
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    }

    const onDocumentLoadSuccess = ({ numPages }) => {
        setDetails({ ...details, numPages });
    }
    
    return (
        <div className="my-4">
            <h2>View Cert</h2>
            <form onSubmit={handleViewCert} className="w-50 mt-4">
                <div class="form-group">
                    <label>User Id</label>
                    <input type="text" class="form-control  mb-4"
                        name="userId" value={userId}
                        onChange={e => onInputChange(e)}/>
                </div>
                <div class="form-group">
                    <label>CID</label>
                    <input type="text" class="form-control  mb-4"
                        name="cid" value={cid}
                        onChange={e => onInputChange(e)}/>
                </div>
                <button type="submit" class="btn btn-primary mt-4">View</button>
            </form>

            <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                options={options}>
                {
                    Array.from(
                        new Array(numPages),
                        (el, index) => (
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                        />
                        ),
                    )
                }
            </Document>
        </div>
    );
}
 
export default CertificateView;