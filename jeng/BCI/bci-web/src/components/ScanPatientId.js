import React from 'react'
import QrReader from 'react-qr-scanner'
import { useState } from "react";

const ScanPatientId = ({ handlePatientDetails }) => {
    
    const [patient, setPatient] = useState({
        firstName: "",
        lastName: "",
        email: "",
        patientId: "",
        address: "",
        birthdate: ""
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

        alert('Successfully retrieved patientId')

        await getPatientDetails(input);
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
            address: data.Address,
            birthdate: data.Birthdate
        });

        const model = {
            patientId: data.ID,
            firstName: data.FirstName,
            lastName: data.LastName,
            email: data.Email,
            address: data.Address,
            birthdate: data.Birthdate
        }

        handlePatientDetails(model);
    }

    return (
        <div className="card">
            <div className="card-body">
                {/* <button onClick={() => getPatientDetails(7)}>Trigger Manually</button> */}
                
                <h5>Scan Patient ID</h5>
                <QrReader
                    delay={delay}
                    style={previewStyle}
                    onError={handleError}
                    onScan={handleScan}
                />
                <div>
                    <table className='table table-striped'>
                        <tbody>
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
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
 
export default ScanPatientId;