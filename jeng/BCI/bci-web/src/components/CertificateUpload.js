import { useState, useEffect } from "react";
import getWeb3 from "../getWeb3";
import truffleContract from "truffle-contract";
import detectEthereumProvider from '@metamask/detect-provider'
import CertificateContract from "../contracts/Certificate.json"

const CertificateUpload = () => {
    const [pageState, setPageState] = useState({
        file: null,
        fileName: null,
        searchText: null
    });

    const [ethState, setEthState] = useState({
        web3: null,
        accounts: null,
        contract: null,
    })
    
    const { searchText } = pageState;

    useEffect(() => {
        const initWeb3 = async () => {
            try {
                const web3 = await getWeb3();
                const accounts = await web3.eth.getAccounts();

                const provider = await detectEthereumProvider()
                if (!provider) {
                    console.log('Please install metamask!');
                    return;
                }

                const contract = truffleContract(CertificateContract);
                contract.setProvider(provider);
                const instance = await contract.deployed();
                setEthState({ ...ethState, accounts: accounts, contract: instance });

            } catch (error) {
                alert(`Failed to load web3, accounts, or contract. Check console for details.`);
                console.log(error);
            }
        }
        initWeb3();

    }, []);

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

    const sendToBlockchain = async (event) => {
        const contract = ethState.contract;
        const account = ethState.accounts[0];
        await contract.saveFileHashUserId("test123", 1, { from: account });
        alert('data sent to blockchain');
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

    if (!ethState.contract) {
        return <div>Loading Web3, accounts, and contract...</div>;
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
            <div>
                <button onClick={sendToBlockchain}>Send To Blockchain</button>
            </div>
        </div>
    );
}
 
export default CertificateUpload;