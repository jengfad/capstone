import React from "react";
import "./style.scss";
const SummaryView = ({ details }) => {

    const {firstName, lastName, address} = details;

    return (
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-column align-items-center">
                <div className="mb-3">
                    <img width="200" src="https://i.stack.imgur.com/34AD2.jpg" />
                </div>
                <div style={{width: "100%"}}>
                    <div className="detail">
                        <div className="small-label">Name</div>
                        <div>{`${firstName} ${lastName}`}</div>
                    </div>
                    <div className="detail">
                        <div className="small-label">Address</div>
                        <div>{address}</div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default SummaryView;