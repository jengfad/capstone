// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

contract Certificate {
    
    mapping (string => uint256) fileHashUserId;
    mapping (string => uint256) summaryHashUserId;
    
    function getFileHash(string memory _fileHash)
        public view returns(uint256)
    {
        return fileHashUserId[_fileHash];
    }

    function getSummaryHash(string memory _summaryHash)
        public view returns(uint256)
    {
        return summaryHashUserId[_summaryHash];
    }

    function isFileHashUserIdExists(string memory _fileHash, uint256 _userId) 
        public view returns(bool)
    {
        if (fileHashUserId[_fileHash] == _userId) {
            return true;
        }
        
        return false;
    }

    function saveUserIdHashes(string memory _fileHash, string memory _summaryHash, uint256 _userId) 
        public
    {   
       summaryHashUserId[_summaryHash] = _userId;
       fileHashUserId[_fileHash] = _userId;
    }

    function isSummaryHashUserIdExists(string memory _summaryHash, uint256 _userId) 
        public view returns(bool)
    {
        if (summaryHashUserId[_summaryHash] == _userId) {
            return true;
        }
        
        return false;
    }
}