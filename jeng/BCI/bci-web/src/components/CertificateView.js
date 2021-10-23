import React from "react";
import { useState, useEffect } from "react";

const CertificateView = () => {
    const [details, setDetails] = useState({
        userId: "",
        cid: "",
    });

    const onInputChange = e => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    const { userId, cid } = details;

    const handleViewCert = async (ev) => {
        ev.preventDefault();

        const data = new FormData();
        data.append('cid', details.cid);
        data.append('userId', details.userId);

        const request = {
            method: 'POST',
            body: data
        };

        const response = await fetch('api/view-cert', request);
        const responseJson = await response.json();
        console.log('view cert result', responseJson);
    }
    
    return (
        <div className="my-4">
            <h2>View Cert</h2>
            <form onSubmit={handleViewCert} className="w-50 mt-4">
                <div class="form-group">
                    <label>User Id</label>
                    <input type="text" class="form-control  mb-4"
                        name="userId" value={userId}
                        onChange={e => onInputChange(e)}/>
                </div>
                <div class="form-group">
                    <label>CID</label>
                    <input type="text" class="form-control  mb-4"
                        name="cid" value={cid}
                        onChange={e => onInputChange(e)}/>
                </div>
                <button type="submit" class="btn btn-primary mt-4">View</button>
            </form>
        </div>
    );
}
 
export default CertificateView;