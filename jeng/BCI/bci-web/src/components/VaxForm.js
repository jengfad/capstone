import { useState } from "react";

const VaxForm = ({ title, doseType, sendDataToParent }) => { 
    const [vaxDetails, setVaxDetails] = useState({
        dateAdministered: "",
        brand: "",
        vaccinator: "",
        site: ""
    });

    const onInputChange = e => {
        const details = JSON.parse(JSON.stringify(vaxDetails));
        details[e.target.name] = e.target.value;
        setVaxDetails(details);
        sendDataToParent(doseType, details);
    };
  
    const { dateAdministered, brand, vaccinator, site } = vaxDetails;

    return(
        <div className="card w-100" style={{marginBottom:'10px'}}>
            <div className="card-body">
                <h5>{title}</h5>
                <div className="form-group mb-3">
                    <label>Date Administered</label>
                    <input type="text" className="form-control"
                        name="dateAdministered" value={dateAdministered}
                        onChange={e => onInputChange(e)}/>
                </div>
                <div className="form-group mb-3">
                    <label>Brand</label>
                    <input type="text" className="form-control"
                        name="brand" value={brand}
                        onChange={e => onInputChange(e)}/>
                </div>
                <div className="form-group mb-3">
                    <label>Vaccinator</label>
                    <input type="text" className="form-control"
                        name="vaccinator" value={vaccinator}
                        onChange={e => onInputChange(e)}/>
                </div>
                <div className="form-group mb-3">
                    <label>Site</label>
                    <input type="text" className="form-control"
                        name="site" value={site}
                        onChange={e => onInputChange(e)}/>
                </div>
            </div>
        </div>
    )
}

export default VaxForm;