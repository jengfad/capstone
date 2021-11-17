import { useState, useEffect } from "react";

const CertificateValidate = () => {
    const [pageState, setPageState] = useState({
        file: null,
        fileName: null,
        searchText: null
    });

    const handleUploadFile = async (ev) => {
        ev.preventDefault();

        const data = new FormData();
        data.append('file', pageState.file);

        const request = {
            method: 'POST',
            body: data
        };

        const response = await fetch('api/cert/validate', request);
        const result = await response.json();
        alert(result);
    }

    const onFileChange = event => {
        setPageState({
            ...pageState,
            file: event.target.files[0]
        });
    };

    return (
        <div className="d-flex justify-content-center">
            <form onSubmit={handleUploadFile}>
                <div class="form-group">
                    <input type="file" onChange={onFileChange} />
                </div>
                <br />
                <div>
                    <button className="btn btn-primary">Validate</button>
                </div>
            </form>
        </div>
    );
}
 
export default CertificateValidate;