// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

contract Certificate {
    
    mapping (string => uint256) fileHashUserId;
    mapping (string => uint256) summaryHashUserId;
        
    function saveFileHashUserId(string memory _fileHash, uint256 _userId) 
        public
    {   
       fileHashUserId[_fileHash] = _userId;
    }
    
    function isFileHashUserIdExists(string memory _fileHash, uint256 _userId) 
        public view returns(bool)
    {
        if (fileHashUserId[_fileHash] == _userId) {
            return true;
        }
        
        return false;
    }

    function saveSummaryHashUserId(string memory _summaryHash, uint256 _userId) 
        public
    {   
       summaryHashUserId[_summaryHash] = _userId;
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