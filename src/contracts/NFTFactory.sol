// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./NFT.sol"; // Importa el contrato NFT

/**
 * @title NFTFactory
 * @dev This contract creates instances of the NFT contract
 */
contract NFTFactory {
    /// @dev Array to store deployed NFT contracts
    address[] public nftContracts;

    /// @dev Emitted when a new NFT contract is created
    event NFTContractCreated(
        address indexed nftAddress,
        string name,
        string symbol
    );

    /**
     * @dev Creates a new instance of the NFT contract
     * @param initialBaseURI The initial base URI for token metadata
     * @param initialPrice The initial price for each NFT
     * @param name The name of the NFT collection
     * @param symbol The symbol of the NFT collection
     */
    function createNFTContract(
        string calldata initialBaseURI,
        uint256 initialPrice,
        string calldata name,
        string calldata symbol
    ) external {
        NFT newNFT = new NFT(
            initialBaseURI,
            initialPrice,
            name,
            symbol,
            msg.sender
        );

        nftContracts.push(address(newNFT));
        emit NFTContractCreated(address(newNFT), name, symbol);
    }

    /**
     * @dev Returns the number of deployed NFT contracts
     * @return uint256 The number of deployed NFT contracts
     */
    function getDeployedContractsCount() external view returns (uint256) {
        return nftContracts.length;
    }

    /**
     * @dev Returns the address of a deployed NFT contract by index
     * @param index The index of the deployed contract
     * @return address The address of the NFT contract
     */
    function getDeployedContract(
        uint256 index
    ) external view returns (address) {
        require(index < nftContracts.length, "Index out of bounds");
        return nftContracts[index];
    }
}
