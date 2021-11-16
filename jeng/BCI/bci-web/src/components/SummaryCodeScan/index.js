import React from 'react';
import { useState, useEffect } from "react";
import SummaryView from "../SummaryView";

const SummaryCodeScan = () => {

    const [details, setDetails] = useState({
        firstName: "",
        lastName: "",
        address: "",
        firstDose: "",
        secondDose: "",
        userId: 1
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchSummary();
            const summary = JSON.parse(data.Summary);
            setDetails({ 
                ...details,
                firstName: data.FirstName,
                lastName: data.LastName,
                address: data.Address,
                firstDose: summary.firstDose,
                secondDose: summary.secondDose
            });
        }

        fetchData();
    }, []);
    
    const fetchSummary = async () => {
        const fileHash = 'f13ed0bb965ef05541f5b6e8b88e80a65ac19da185f68e3fabd47b77a8edd2c9';
        const url = `api/summary/filehash/${fileHash}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    return (
        <div class="d-flex justify-content-center">
            <div className="card mx-5">
                <div className="card-body">
                    <SummaryView details={details}></SummaryView>
                </div>
            </div>
        </div>
    );
}
 
export default SummaryCodeScan;