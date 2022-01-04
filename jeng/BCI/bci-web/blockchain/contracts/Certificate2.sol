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

    function isFileHashUserIdExists(string calldata fileHash, uint256 userId)
        external
        view
        returns (bool)
    {
        string memory fileHashStr = fileHash;

        if (fileHashUserId[fileHashStr] == userId) {
            return true;
        }

        return false;
    }

    function saveUserIdHashes(
        string calldata fileHash,
        string calldata summaryHash,
        uint256 userId
    ) external onlyOwner {
        string memory fileHashStr = fileHash;
        string memory summaryHashStr = summaryHash;

        summaryHashUserId[summaryHashStr] = userId;
        fileHashUserId[fileHashStr] = userId;
    }

    function isSummaryHashUserIdExists(
        string calldata summaryHash,
        uint256 userId
    ) external view returns (bool) {
        string memory summaryHashStr = summaryHash;

        if (summaryHashUserId[summaryHashStr] == userId) {
            return true;
        }

        return false;
    }
}
