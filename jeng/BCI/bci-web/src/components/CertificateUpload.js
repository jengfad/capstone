import { useState, useEffect } from "react";
import getWeb3 from "../getWeb3";
import truffleContract from "truffle-contract";
import detectEthereumProvider from '@metamask/detect-provider'
import CertificateContract from "../contracts/Certificate.json"
import VaxForm from "./VaxForm";
import ScanPatientId from "./ScanPatientId";

const CertificateUpload = () => {
    const [vaxDetails, setVaxDetails] = useState({
        patientId: null,
        firstName: '', 
        lastName: '', 
        email: '',
        address: '',
        birthdate: '',
        doses: {}
    });

    const {patientId} = vaxDetails;

    const [ethState, setEthState] = useState({
        web3: null,
        accounts: null,
        contract: null,
    });

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

    const sendToBlockchain = async (fileHash, summaryHash) => {
        const contract = ethState.contract;
        const account = ethState.accounts[0];
        await contract.saveUserIdHashes(fileHash, summaryHash, patientId, { from: account });
        alert('data sent to blockchain');
    }

    const manualSendToBc = async () => {
        const fileHash = '3a206c85ccf6a92931276f1eb10882069e868413aff3694761a8ee675dd50034'
        const summaryHash = '1060832ae769ce5d899a5b1ecda4f9304d80d49b81f6d4f3e22fdcca5e9c040e'
        await sendToBlockchain(fileHash, summaryHash);
    }

    const checkFileHash = async () => {
        const fileHash = '3a206c85ccf6a92931276f1eb10882069e868413aff3694761a8ee675dd50034';
        const contract = ethState.contract;
        const account = ethState.accounts[0];
        const isExists = await contract.isFileHashUserIdExists(fileHash, patientId, { from: account });
        alert(`fileHash - ${fileHash} - ${isExists}`);
    }

    const sendDataToParent = (doseType, data) => {
        const doses = JSON.parse(JSON.stringify(vaxDetails.doses));
        doses[doseType] = data;
        setVaxDetails({ ...vaxDetails, doses: doses });
    };

    const handlePatientDetails = (details) => {
        setVaxDetails({ 
            ...vaxDetails, 
            patientId: details.patientId,
            firstName: details.firstName,
            lastName: details.lastName,
            email: details.email,
            address: details.address,
            birthdate: details.birthdate
        });
    };

    const submitRecord = async (e) => {
        e.preventDefault();
        e.target.reset();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vaxDetails)
        };

        const response = await fetch('api/create-vaccine-record', requestOptions);
        const data = await response.json();
        const fileHash = data.fileHash;
        const summaryHash = data.summaryHash;
        console.log('data', data);
        await sendToBlockchain(fileHash, summaryHash);
    }

    if (!ethState.contract) {
        return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
        <div className="d-flex justify-content-around">
            <div>
                <ScanPatientId handlePatientDetails={handlePatientDetails}></ScanPatientId>
            </div>
            <form onSubmit={submitRecord} className="w-50 d-flex flex-column" style={{maxWidth:'500px'}}>
                {patientId == null && <p className="text-danger">Please scan a Patient QR Code first.</p>}
                <VaxForm title={'Dose 1'} doseType={'dose1'} sendDataToParent={sendDataToParent}></VaxForm>
                <VaxForm title={'Dose 2'} doseType={'dose2'} sendDataToParent={sendDataToParent}></VaxForm>
                <br/>
                <div>
                    <button disabled={patientId == null} type="submit" className="btn btn-primary w-50">Submit</button>
                </div>
            </form>
        </div>
    );
}
 
export default CertificateUpload;