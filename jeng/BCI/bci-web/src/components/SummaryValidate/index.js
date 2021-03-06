import React from 'react';
import { useState, useEffect } from "react";
import SummaryView from "../SummaryView";
import SummaryDoses from "../SummaryDoses";
import getWeb3 from "../../getWeb3";
import truffleContract from "truffle-contract";
import detectEthereumProvider from '@metamask/detect-provider'
import CertificateContract from "../../contracts/Certificate.json"
import QrReader from 'react-qr-scanner'

const SummaryValidate = () => {
    
    const previewStyle = {
        height: 240,
        width: 320,
      }
      
    const delay = 100;
    const [ethState, setEthState] = useState({
        web3: null,
        accounts: null,
        contract: null,
    });
    
    const [isValidate, setIsValidate] = useState(false);

    const [details, setDetails] = useState({
        firstName: "",
        lastName: "",
        address: "",
        summary: null,
        userId: null
    });
    
    const {summary} = details;

    useEffect(() => {
        if (window.location.href.indexOf("validate/summary-code") !== -1) {
            setIsValidate(true);
        }

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

    const manualScanCode = async () => {
        const summaryHash = '1060832ae769ce5d899a5b1ecda4f9304d80d49b81f6d4f3e22fdcca5e9c040e';
        const userId = await fetchData(summaryHash);
        await checkSummaryHash(summaryHash, userId);
    }

    const handleScan = async (data) => {
        if (!data) return;

        let summaryHash = null;

        try {
            summaryHash = data['text'];
        } catch {
            alert('Invalid QR Code');
            return;
        }

        const summaryData = await fetchData(summaryHash);

        if (!summaryData)
            return;

        console.log('data', summaryData);
        const isExistInBc = await checkSummaryHash(summaryHash, summaryData.UserId);

        if (isExistInBc) {
            console.log('exists in bc')
            setDetails({ 
                ...details,
                firstName: summaryData.FirstName,
                lastName: summaryData.LastName,
                address: summaryData.Address,
                summary: !!summaryData ? JSON.parse(summaryData.Summary) : null
            });
        }
    }

    
    const handleError = (err) => {
        console.log('qr scan error', err);
    }
    
    const fetchData = async (summaryHash) => {
        const url = `/api/summary/${summaryHash}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    
    const checkSummaryHash = async (summaryHash, userId) => {
        const contract = ethState.contract;
        const account = ethState.accounts[0];
        const isExists = await contract.isSummaryHashUserIdExists(summaryHash, userId, { from: account });
        return isExists;
    }

    if (!ethState.contract) {
        return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
        <div class="d-flex justify-content-center">
            <div>
                {/* <div>
                    <button onClick={() => manualScanCode()}>Check Manually</button>
                </div> */}
                <h5>Scan Summary QR Code</h5>
                <QrReader
                    delay={delay}
                    style={previewStyle}
                    onError={handleError}
                    onScan={handleScan}
                />
            </div>
            {
                !!summary &&
                <div class="d-flex">
                    <div className="card mx-5">
                        <div className="card-body">
                            <SummaryView isValidate={isValidate} details={details}></SummaryView>
                        </div>
                    </div>            
                    <div className="card m-3">
                        <div className="card-body">
                            <SummaryDoses summary={summary}></SummaryDoses>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
 
export default SummaryValidate;