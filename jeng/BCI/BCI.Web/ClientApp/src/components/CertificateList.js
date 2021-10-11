import React from "react";
import { useState, useEffect } from "react";
const CertificateList = () => {
    const [certificates, setCertificates] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('certificate/all');
            const data = await response.json();
            setCertificates(data);
        }

        fetchData();
    }, []);

    if (!certificates || certificates.length === 0) {
        return (
            <div>No records found</div>
        );
    }

    return (
        <table className='table table-striped'>
            <thead>
            <tr>
                <th>UserId</th>
                <th>FileHash</th>
            </tr>
            </thead>
            <tbody>
            {certificates.map(certificate =>
                <tr key={certificate.id}>
                    <td>{certificate.userId}</td>
                    <td>{certificate.fileHash}</td>
                </tr>
            )}
            </tbody>
        </table>
    );
}
 
export default CertificateList;