// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

contract Certificate {
    mapping(string => uint256) private fileHashUserId;
    mapping(string => uint256) private summaryHashUserId;
    address private owner;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function isFileHashUserIdExists(string calldata _fileHash, uint256 _userId)
        external
        view
        returns (bool)
    {
        string memory fileHash = _fileHash;

        if (fileHashUserId[fileHash] == _userId) {
            return true;
        }

        return false;
    }

    function saveUserIdHashes(
        string calldata _fileHash,
        string calldata _summaryHash,
        uint256 _userId
    ) external onlyOwner {
        string memory fileHash = _fileHash;
        string memory summaryHash = _summaryHash;

        summaryHashUserId[summaryHash] = _userId;
        fileHashUserId[fileHash] = _userId;
    }

    function isSummaryHashUserIdExists(
        string calldata _summaryHash,
        uint256 _userId
    ) external view returns (bool) {
        string memory summaryHash = _summaryHash;

        if (summaryHashUserId[summaryHash] == _userId) {
            return true;
        }

        return false;
    }
}
