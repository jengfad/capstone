import React from "react";
const SummaryView = ({ details }) => {

    const {firstName, lastName, address, firstDose, secondDose} = details;

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="mb-3">
                <img width="200" src="https://i.stack.imgur.com/34AD2.jpg" />
            </div>
            <table className="table table-striped">
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