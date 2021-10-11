import React from "react";
import { useState, useEffect } from "react";
import IPFSInboxContract from "../contracts/IPFSInbox.json"
import truffleContract from "truffle-contract";
import getWeb3 from "../getWeb3";
import ipfs from "../ipfs";
import detectEthereumProvider from '@metamask/detect-provider'

const CertificateUpload = () => {
  const [pageState, setPageState] = useState({
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    ipfsHash: null,
    formIPFS: "",
    formAddress: "",
    receivedIPFS: "",
    buffer: null
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

          const contract = truffleContract(IPFSInboxContract);
          contract.setProvider(provider);
          const instance = await contract.deployed();
          setPageState({ ...pageState, accounts: accounts, contract: instance });

        } catch (error) {
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`
          );
          console.log(error);
        }
    }
    initWeb3();

  }, []);

  const insertRecordToDb = async () => {
    if (!pageState.ipfsHash) return;
    
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 1, fileHash: pageState.ipfsHash })
    };
    await fetch('certificate', requestOptions);
    console.log('successfully inserted record');
  }

  const convertToBuffer = async(reader) => {
    const buffer = await Buffer.from(reader.result);
    setPageState({ ...pageState, buffer });
  };

  const captureFile = (event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => convertToBuffer(reader)    
  };

  const onIPFSSubmit = async (event) => {
    event.preventDefault();
    const accounts = pageState.accounts;
    console.log('Sending from Metamask account: ' + accounts[0]);
    await ipfs.add(pageState.buffer, (err, ipfsHash) => {
      console.log(err, ipfsHash);
      setPageState({ ...pageState, ipfsHash: ipfsHash[0].hash });
    });
    await insertRecordToDb();
  };
  
  if (!pageState.contract) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  return (
    <div>
      <h2>Upload Certificate</h2>
        <form id="ipfs-hash-form" className="scep-form" onSubmit={onIPFSSubmit}>
          <input 
            type="file"
            onChange={captureFile}
          />
          <button
            type="submit"> 
            Upload
          </button>
        </form>
    </div>
  );
}
 
export default CertificateUpload;