import { useState, useEffect } from "react";
import getWeb3 from "../getWeb3";
import truffleContract from "truffle-contract";
import detectEthereumProvider from '@metamask/detect-provider'
import CertificateContract from "../contracts/Certificate.json"
import VaxForm from "./VaxForm";

const CertificateUpload = () => {
    const [pageState, setPageState] = useState({
        file: null,
        fileName: null,
        searchText: null
    });

    
    const [vaxDetails, setVaxDetails] = useState({
        firstDose: "",
        secondDose: ""
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

    const sendToBlockchain = async (fileHash, userId) => {
        const contract = ethState.contract;
        const account = ethState.accounts[0];
        await contract.saveFileHashUserId(fileHash, userId, { from: account });
        alert('data sent to blockchain');
    }

    const onFileChange = event => {
        setPageState({
            ...pageState,
            file: event.target.files[0]
        });
    };

    const sendDataToParent = (doseType, data) => {
        setVaxDetails({ ...vaxDetails, [doseType]: data });
    };

    const submitRecord = async (e) => {
        e.preventDefault();
        e.target.reset();

        const userId = 1;
        const requestModel = {
            userId: userId,
            vaxDetails: vaxDetails
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestModel)
        };

        const response = await fetch('api/create-vaccine-record', requestOptions);
        const data = await response.json();
        const fileHash = data.fileHash;
        await sendToBlockchain(fileHash, userId);
    }

    if (!ethState.contract) {
        return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
        <div className="d-flex justify-content-center">
            <form onSubmit={submitRecord} className="w-50 mt-4 d-flex flex-column">
                <div className="d-flex">
                    <VaxForm title={'First Dose'} doseType={'firstDose'} sendDataToParent={sendDataToParent}></VaxForm>
                    <VaxForm title={'Second Dose'} doseType={'secondDose'} sendDataToParent={sendDataToParent}></VaxForm>
                </div>
                <br/>
                <button type="submit" className="btn btn-primary w-50 align-self-center">Submit</button>
            </form>
        </div>
    );
}
 
export default CertificateUpload;