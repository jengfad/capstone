import React from "react";
import { useState, useEffect } from "react";

const CertificateList = () => {
    // check infura file on https://gateway.ipfs.io/ipfs/Qma1vTFaQ2j5HfNjrunDHSJ7ytL1wMCrQnK3vEBsvsgcBy

    const [certificates, setCertificates] = useState();
    const [selectedFileHash, setSelectedFileHash] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('certificates');
            const data = await response.json();
            console.log(data);
            setCertificates(data);
        }

        fetchData();
    }, []);

    const onViewCertClick = async (fileHash) => {
        setSelectedFileHash(fileHash);
        await getFile();
    }

    const getFile = () => {
        // const cid = new CID(selectedFileHash);
        // for await (const file of ipfs.get(cid)) {
        //     console.log(file.path);
        // }
    }

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
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {certificates.map(certificate =>
                <tr key={certificate.id}>
                    <td>{certificate.userId}</td>
                    <td>{certificate.fileHash}</td>
                    <td>
                        <div>
                            <button onClick={() => onViewCertClick(certificate.fileHash)}
                                    className="btn btn-link">View</button>
                        </div>
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    );
}
 
export default CertificateList;