import React from "react";
import { useState, useEffect } from "react";

const SummaryView = () => {

    const [details, setDetails] = useState({
        firstName: "",
        lastName: "",
        address: "",
        firstDose: "",
        secondDose: ""
    });

    const {firstName, lastName, address, firstDose, secondDose} = details;

    useEffect(() => {
        const fetchData = async () => {
            const userId = 1;
            const url = `api/view-summary/${userId}`;
            const response = await fetch(url);
            const data = await response.json();
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

    return (
        <div>
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

export default SummaryView;