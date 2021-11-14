import React from 'react'
import QrReader from 'react-qr-scanner'
import { useState } from "react";

const ScanPatientId = ({ emitPatientId }) => {
    
    const [patient, setPatient] = useState({
        firstName: "",
        lastName: "",
        email: "",
        patientId: ""
    });

    const previewStyle = {
      height: 240,
      width: 320,
    }

    const { patientId, firstName, lastName, email } = patient;

    const delay = 100;

    const handleScan = async (data) => {
        if (!data) return;

        let input = null;

        try {
            input = JSON.parse(data['text']);
        } catch {
            alert('Invalid QR Code');
            return;
        }

        if (!input.userId) {
            alert('Invalid QR Code');
            return;
        }

        await getPatientDetails(input.userId);
        emitPatientId(input.userId)
    }
    
    const handleError = (err) => {
        console.log('qr scan error', err);
    }

    const getPatientDetails = async (userId) => {
        const url = `api/patient/${userId}`;
        const response = await fetch(url);
        const data = await response.json();
        setPatient({ 
            ...patient,
            patientId: data.ID,
            firstName: data.FirstName,
            lastName: data.LastName,
            email: data.Email,
        });
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5>Scan Patient ID</h5>
                <QrReader
                    delay={delay}
                    style={previewStyle}
                    onError={handleError}
                    onScan={handleScan}
                />
                <div>
                    <table className='table table-striped'>
                        <tr>
                            <td>Patient ID</td>
                            <td>{patientId}</td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td>{lastName}</td>
                        </tr>
                        <tr>
                            <td>First Name</td>
                            <td>{firstName}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{email}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
}
 
export default ScanPatientId;