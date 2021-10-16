import { useState } from "react";

const CertificateUpload = () => {
    const [pageState, setPageState] = useState({
        file: null,
        fileName: null
    });

    const handleUploadImage = (ev) => {
        ev.preventDefault();

        const data = new FormData();
        data.append('file', pageState.file);

        console.log('the file', pageState.file);

        const request = {
            method: 'POST',
            body: data
        };

        fetch('upload', request).then((response) => {
            console.log('done upload')
        });
    }

    const onFileChange = event => {
        setPageState({
            ...pageState,
            file: event.target.files[0]
        });
    };

    return (
        <form onSubmit={handleUploadImage}>
            <div>
                <input type="file" onChange={onFileChange} />
            </div>
            <br />
            <div>
                <button>Upload</button>
            </div>
        </form>
    );
}
 
export default CertificateUpload;