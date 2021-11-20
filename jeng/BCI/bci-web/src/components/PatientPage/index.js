import React from "react";
import { useState, useEffect } from "react";
import { dataURLtoFile, fileToBinary } from "../../helpers/file-helpers";
import QRCode from "react-qr-code";
import SummaryView from "../SummaryView";
import { useParams } from "react-router-dom";

const PatientPage = () => {

    const { patientId } = useParams();
    const [details, setDetails] = useState({
        firstName: "",
        lastName: "",
        address: "",
        firstDose: "",
        secondDose: "",
        file: null,
        fileHash: null
    });

    const {file, fileHash} = details;

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
                firstDose: summary.firstDose,
                secondDose: summary.secondDose,
                file: cert.file,
                fileHash: cert.fileHash
            });
        }

        fetchData();
    }, []);

    return (
        <div className="d-flex align-items-center justify-content-center">
            <div className="card mx-5">
                <div className="card-body">
                    <SummaryView details={details}></SummaryView>
                </div>
            </div>
            <div className="card">
                <div className="card-body">    
                    <h5>Vax Summary Code</h5>
                    {fileHash !== null && <QRCode value={fileHash} />}
                    <div className="mt-4">
                        <button onClick={downloadFile} className="btn btn-primary mb-2">Download Certificate</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientPage;