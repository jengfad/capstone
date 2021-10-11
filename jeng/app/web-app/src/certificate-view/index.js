import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import pdfFile from './vaccine-cert.pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
};

const CertificateView = () => {
    const { certHash } = useParams();
    const [file, setFile] = useState(pdfFile);
    const [numPages, setNumPages] = useState(null);

    console.log('certHash', certHash);

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }
    
    return (
        <div class="container d-flex flex-column align-items-center p-5">
            <div>
                <label htmlFor="file">Load from file:</label>
                {' '}
                <input
                    onChange={onFileChange}
                    type="file"
                />
            </div>
            <div class="d-flex align-items-center">
                <Document
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                    options={options}
                >
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
        </div>
    );
}
 
export default CertificateView;