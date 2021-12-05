import React from "react";
import "./style.scss";
const SummaryDoses = ({ details }) => {

    const {summary} = details;

    let vaxDoses = [];
    for (let key in summary) {
        let dose = summary[key];
        let vaxDate = dose["dateAdministered"];
        let brand = dose["brand"];
        let num = key.replace("dose", "");
        vaxDoses.push({
            vaxDate,
            brand,
            num
        });
    }

    const listItems = vaxDoses.map((dose) => {
        return (
            <div key={dose.num} style={{border: "1px solid lightgray", padding: "10px", minWidth: "200px"}}>
                <div className="detail">
                    <div className="small-label">Dose#</div>
                    <div>{dose.num}</div>
                </div>
                <div className="detail">
                    <div className="small-label">Date Administered</div>
                    <div>{dose.vaxDate}</div>
                </div>
                <div className="detail">
                    <div className="small-label">Brand</div>
                    <div>{dose.brand}</div>
                </div>
            </div>
        ); 
    });

    return (
        <div style={{width: "100%"}}>
            {listItems}
        </div>
    );
}

export default SummaryDoses;