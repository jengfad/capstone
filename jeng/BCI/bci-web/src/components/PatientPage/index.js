import React from "react";
import { useState, useEffect } from "react";
import { dataURLtoFile, fileToBinary } from "../../helpers/file-helpers";

const PatientPage = () => {

    const [details, setDetails] = useState({
        firstName: "",
        lastName: "",
        address: "",
        firstDose: "",
        secondDose: "",
        file: null,
        userId: 1
    });

    const {firstName, lastName, address, firstDose, secondDose, file, userId} = details;

    const downloadFile = async () => {
        const binaryFile = await fileToBinary(file);
        var blob = new Blob([binaryFile], {type: "application/pdf"});
        var objectUrl = URL.createObjectURL(blob);
        window.open(objectUrl);
    }

    const fetchSummary = async () => {
        const url = `api/view-summary/${userId}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    const fetchCertificate = async () => {
        const url = `api/view-cert/${userId}`;
        const response = await fetch(url);
        const data = await response.json();
        const base64Param = `data:application/pdf;base64,${data.base64}`;
        const result = dataURLtoFile(base64Param,'cert.pdf');
        return result;
    }

    useEffect(() => {
        const fetchData = async () => {
            const certFile = await fetchCertificate();
            const data = await fetchSummary();
            const summary = JSON.parse(data.Summary);
            setDetails({ 
                ...details,
                firstName: data.FirstName,
                lastName: data.LastName,
                address: data.Address,
                firstDose: summary.firstDose,
                secondDose: summary.secondDose,
                file: certFile
            });
        }

        fetchData();
    }, []);

    return (
        <div>
            <button onClick={downloadFile} className="btn btn-primary mb-2">Download File</button>
            <table>
                <tr>
                    <td>Full Name</td>
                    <td>{`${firstName} ${lastName}`}</td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td>{address}</td>
                </tr>
                <tr>
                    <td>First Dose</td>
                    <td>{firstDose}</td>
                </tr>
                <tr>
                    <td>Second Dose</td>
                    <td>{secondDose}</td>
                </tr>
            </table>
        </div>
    );
}

export default PatientPage;