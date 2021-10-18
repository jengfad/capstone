import { useState } from "react";

const CertificateUpload = () => {
    const [pageState, setPageState] = useState({
        file: null,
        fileName: null,
        userId: null
    });
    
    const { userId } = pageState;

    const handleUploadImage = (ev) => {
        ev.preventDefault();

        const data = new FormData();
        data.append('file', pageState.file);
        data.append('userId', pageState.userId);
        console.log(pageState.userId);

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

    const onInputChange = e => {
      setPageState({ ...pageState, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleUploadImage}>
            <div class="form-group">
                <label>User Id</label>
                <input type="text" class="form-control mb-4"
                    name="userId" value={userId}
                    onChange={e => onInputChange(e)}/>
            </div>
            <div class="form-group">
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