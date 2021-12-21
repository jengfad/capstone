import { useState, useEffect } from "react";
import getWeb3 from "../../getWeb3";
import truffleContract from "truffle-contract";
import detectEthereumProvider from '@metamask/detect-provider'
import CertificateContract from "../../contracts/Certificate.json"
const CertificateValidate = () => {
    const [pageState, setPageState] = useState({
        file: null,
        fileName: null,
        patientId: null,
        isError: false,
        patient: null
    });

    const [ethState, setEthState] = useState({
        web3: null,
        accounts: null,
        contract: null,
    });
    
    const { isError, patient } = pageState;
    
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

    const handleUploadFile = async (ev) => {
        ev.preventDefault();

        const data = new FormData();
        data.append('file', pageState.file);

        const request = {
            method: 'POST',
            body: data
        };

        const response = await fetch('/api/cert/get-hash', request);
        const json = await response.json();
        await checkFileHash(json.fileHash);
    }

    const fetchPatient = async (patientId) => {
        const url = `/api/patient/${patientId}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    const setIsError = (value) => {
        setPageState({
            ...pageState,
            isError: value
        });
    }

    const setPatient = (patient) => {
        setPageState({
            ...pageState,
            patient: patient
        });
    }

    const checkFileHash = async (fileHash) => {
        setIsError(false);
        setPatient(null);
        const contract = ethState.contract;
        const account = ethState.accounts[0];
        const patientId = await contract.getFileHash(fileHash, { from: account });

        if (patientId == 0) {
            setIsError(true);
            return;
        }

        const patient = await fetchPatient(patientId);
        setPatient(patient);
    }

    const onFileChange = event => {
        setPageState({
            ...pageState,
            file: event.target.files[0]
        });
    };

    return (
        <div class="d-flex flex-column align-items-start">
            <form onSubmit={handleUploadFile}>
                <div class="form-group">
                    <input type="file" onChange={onFileChange} />
                </div>
                <br />
                <div>
                    <button className="btn btn-primary">Validate</button>
                </div>
            </form>
            {
                isError &&
                <div class="card mt-3">
                    <div class="card-body">
                        <p class="text-danger">Invalid File</p>
                        <p>File is not existing in blockchain logs</p>
                    </div>
                </div>
            }
            {
                !isError && !!patient &&
                <div class="card mt-3">
                    <div class="card-body">
                        <p class="text-success">Valid File</p>
                        <p>It's currently associated to <b>{patient.FirstName} {patient.LastName}</b></p>
                    </div>
                </div>
            }
        </div>
    );
}
 
export default CertificateValidate;