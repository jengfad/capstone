import React from "react";
import { useState, useEffect } from "react";
import { dataURLtoFile, fileToBinary } from "../../helpers/file-helpers";
import QRCode from "react-qr-code";
import SummaryView from "../SummaryView";
import SummaryDoses from "../SummaryDoses";
import { useParams } from "react-router-dom";

const PatientPage = () => {

    const { patientId } = useParams();
    const [details, setDetails] = useState({
        firstName: "",
        lastName: "",
        address: "",
        file: null,
        fileHash: null,
        summary: null,
        summaryHash: null
    });

    const {file, summaryHash} = details;

    const downloadFile = async () => {
        const binaryFile = await fileToBinary(file);
        var blob = new Blob([binaryFile], {type: "application/pdf"});
        var objectUrl = URL.createObjectURL(blob);
        window.open(objectUrl);
    }

    const fetchSummary = async () => {
        const url = `/api/summary/patient/${patientId}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    const fetchCertificate = async () => {
        const url = `/api/cert/patient/${patientId}`;
        const response = await fetch(url);
        const data = await response.json();
        const base64Param = `data:application/pdf;base64,${data.base64}`;
        return {
            file: dataURLtoFile(base64Param,'cert.pdf'),
            fileHash: data.fileHash
        };
    }

    useEffect(() => {
        const fetchData = async () => {
            const cert = await fetchCertificate();
            const data = await fetchSummary();
            const summary = JSON.parse(data.Summary);
            setDetails({ 
                ...details,
                firstName: data.FirstName,
                lastName: data.LastName,
                address: data.Address,
                summary: summary,
                summaryHash: data.SummaryHash,
                file: cert.file,
                fileHash: cert.fileHash
            });
        }

        fetchData();
    }, []);

    return (
        <div className="d-flex justify-content-center my-5 flex-column flex-lg-row">
            <div className="card m-3">
                <div className="card-body">
                    <SummaryView details={details}></SummaryView>
                </div>
            </div>
            <div className="card m-3">
                <div className="card-body">
                    <SummaryDoses details={details}></SummaryDoses>
                </div>
            </div>
            <div className="card m-3">
                <div className="card-body d-flex flex-column align-items-center">    
                    <h5>Vax Summary Code</h5>
                    {summaryHash !== null && <QRCode value={summaryHash} />}
                    <div className="mt-4">
                        <button onClick={downloadFile} className="btn btn-primary mb-2">Download Certificate</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientPage;