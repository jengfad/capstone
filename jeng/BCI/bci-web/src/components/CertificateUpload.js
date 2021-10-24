import { useState } from "react";

const CertificateUpload = () => {
    const [pageState, setPageState] = useState({
        file: null,
        fileName: null,
        searchText: null
    });
    
    const { searchText } = pageState;

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

    const handleSearchUsers = async (ev) => {
        ev.preventDefault();
        const data = {
            searchText: searchText
        };

        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        const apiResult = await fetch('api/search-users', request);
        const json = await apiResult.json();
        console.log('users', json);
    }

    return (
        <div class="d-flex">
            <form onSubmit={handleSearchUsers} class="d-flex align-items-center">
                <div>
                    <label>Search Text (Name, Email)</label>
                    <input type="text" class="form-control mb-4"
                        name="searchText" value={searchText}
                        onChange={e => onInputChange(e)} />
                </div>
                <div>
                    <button>Search</button>
                </div>
            </form>
            <form onSubmit={handleUploadImage}>
                <div class="form-group">
                    <input type="file" onChange={onFileChange} />
                </div>
                <br />
                <div>
                    <button className="btn btn-primary">Upload</button>
                </div>
            </form>
        </div>
    );
}
 
export default CertificateUpload;