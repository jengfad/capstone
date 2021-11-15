import React from "react";
import { useState, useEffect } from "react";
import { dataURLtoFile, fileToBinary } from "../../helpers/file-helpers";
import PdfDisplay from "../PdfDisplay";
import "./style.scss";

const CertificateView = () => {

    useEffect(() => {
        const fetchData = async () => {
            const data = new FormData();
            data.append('cid', 'bafybeig4mxqm4yt44uiimtmtlp6fa3fwdlm6yl7xdjrwgq7uc4hqk2kxw4');
            data.append('userId', 1);
    
            const request = {
                method: 'POST',
                body: data
            };
    
            const response = await fetch('api/view-cert', request);
            const responseJson = await response.json();
    
            const base64Param = `data:application/pdf;base64,${responseJson.base64}`;
            const file = dataURLtoFile(base64Param,'cert.pdf');
            const fileBinary = await fileToBinary(file);
            setDetails({ ...details, file: fileBinary });
        }

        fetchData();
    }, []);

    const [details, setDetails] = useState({
        userId: "",
        cid: "",
        file: null,
        numPages: 1
    });

    const { file } = details;
    
    return (
        <main>
            <section className="pdf-holder">
            <PdfDisplay source={file} />
            </section>
        </main>
    );
}
 
export default CertificateView;