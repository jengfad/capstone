import { useState, useEffect } from "react";
import getWeb3 from "../getWeb3";
import truffleContract from "truffle-contract";
import detectEthereumProvider from '@metamask/detect-provider'
import CertificateContract from "../contracts/Certificate.json"
import VaxForm from "./VaxForm";
import contract from "truffle-contract";
import ScanPatientId from "./ScanPatientId";

const CertificateUpload = () => {
    const [vaxDetails, setVaxDetails] = useState({
        patientId: null,
        firstName: '', 
        lastName: '', 
        email: '',
        firstDose: "",
        secondDose: ""
    });

    const {patientId, firstName, lastName, email} = vaxDetails;

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
        // initWeb3();

    }, []);

    const sendToBlockchain = async (fileHash, userId) => {
        const contract = ethState.contract;
        const account = ethState.accounts[0];
        await contract.saveFileHashUserId(fileHash, userId, { from: account });
        alert('data sent to blockchain');
    }

    const checkFileHash = async () => {
        const fileHash = 'someguid123';
        const userId = 1;
        const contract = ethState.contract;
        const account = ethState.accounts[0];
        const isExists = await contract.isFileHashUserIdExists(fileHash, userId, { from: account });
        alert(isExists);
    }

    const sendDataToParent = (doseType, data) => {
        setVaxDetails({ ...vaxDetails, [doseType]: data });
    };

    const handlePatientDetails = (details) => {
        setVaxDetails({ 
            ...vaxDetails, 
            patientId: details.patientId,
            firstName: details.firstName,
            lastName: details.lastName,
            email: details.email
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
        // await sendToBlockchain(fileHash, userId);
    }

    // if (!ethState.contract) {
    //     return <div>Loading Web3, accounts, and contract...</div>;
    // }

    return (
        <div className="d-flex justify-content-around">
            <div>
                <ScanPatientId handlePatientDetails={handlePatientDetails}></ScanPatientId>
            </div>
            <form onSubmit={submitRecord} className="w-50 d-flex flex-column" style={{maxWidth:'500px'}}>
                {patientId == null && <p className="text-danger">Please scan a Patient QR Code first.</p>}
                <VaxForm title={'First Dose'} doseType={'firstDose'} sendDataToParent={sendDataToParent}></VaxForm>
                <VaxForm title={'Second Dose'} doseType={'secondDose'} sendDataToParent={sendDataToParent}></VaxForm>
                <br/>
                <div>
                    <button disabled={patientId == null} type="submit" className="btn btn-primary w-50">Submit</button>
                </div>
            </form>
            {/* <div>
                <button onClick={checkFileHash}>Check Hash</button>
            </div> */}
            
        </div>
    );
}
 
export default CertificateUpload;