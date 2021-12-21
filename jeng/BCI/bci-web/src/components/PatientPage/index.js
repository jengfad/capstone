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

    const {file, summaryHash, summary, firstName} = details;

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

        if (!data)
            return null;

        return data;
    }

    const fetchCertificate = async () => {
        const url = `/api/cert/patient/${patientId}`;
        const response = await fetch(url);
        const data = await response.json();

        if (!data)
            return null;

        const base64Param = `data:application/pdf;base64,${data.base64}`;
        return {
            file: dataURLtoFile(base64Param,'cert.pdf'),
            fileHash: data.fileHash
        };
    }

    const fetchPatient = async () => {
        const url = `/api/patient/${patientId}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    useEffect(() => {
        const fetchData = async () => {
            const patient = await fetchPatient();
            const cert = await fetchCertificate();
            const data = await fetchSummary();
            setDetails({ 
                ...details,
                firstName: patient.FirstName,
                lastName: patient.LastName,
                address: patient.Address,
                summary: !!data ? JSON.parse(data.Summary) : null,
                summaryHash: data != null ? data.SummaryHash : null,
                file: cert != null ? cert.file : null,
                fileHash: cert != null ? cert.fileHash : null
            });
        }

        fetchData();
    }, []);

    return (
        <div className="d-flex justify-content-center my-5 flex-column flex-lg-row">
            {
                firstName != null &&
                <div className="card m-3">
                    <div className="card-body">
                        <SummaryView details={details} patientId={patientId}></SummaryView>
                    </div>
                </div>
            }
            {
                !!summary &&
                <div className="card m-3">
                    <div className="card-body">
                        <SummaryDoses summary={summary}></SummaryDoses>
                    </div>
                </div>
            }
            {
                !!summary &&
                <div className="card m-3">
                    <div className="card-body d-flex flex-column align-items-center">    
                        <h5>Vax Summary Code</h5>
                        {summaryHash !== null && <QRCode value={summaryHash} />}
                        <div className="mt-4">
                            <button onClick={downloadFile} className="btn btn-primary mb-2">Download Certificate</button>
                        </div>
                    </div>
                </div>
            }
            
        </div>
    );
}

export default PatientPage;