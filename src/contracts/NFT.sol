// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "erc721a/contracts/ERC721A.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title NFT
 * @dev Implements an ERC721A token with USDC minting options
 */
contract NFT is ERC721A, Ownable {
    /// @dev Price of each NFT
    uint256 public price;

    /// @dev Maximum supply of NFTs
    uint256 public maxSupply;

    /// @dev Base URI for token metadata
    string private _baseTokenURI;

    /// @dev USDC token contract
    IERC20 private immutable usdcToken;

    /// @dev Emitted when an NFT is minted
    event NftMinted(address indexed requester, string token, uint256 quantity);

    /// @dev Thrown when minting would exceed max supply
    error ExceedsMaxSupply();

    /// @dev Thrown when ERC20 transfer fails
    error ERC20TransferFailed();

    /**
     * @dev Constructor to initialize the NFT contract
     * @param initialBaseURI The initial base URI for token metadata
     * @param initialPrice The initial price for each NFT
     * @param name The name of the NFT collection
     * @param symbol The symbol of the NFT collection
     */
    constructor(
        string memory initialBaseURI,
        uint256 initialPrice,
        string memory name,
        string memory symbol,
        address _user
    )
        ERC721A(name, symbol)
        Ownable(0xF414A98E991cd9654304E4Daa9f0978FFDB73bb2)
    {
        _mint(_user, 1);
        _baseTokenURI = initialBaseURI;
        price = initialPrice;
        maxSupply = 100;
        usdcToken = IERC20(0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B);
    }

    /**
     * @dev Returns the base URI for token metadata
     * @return string The base URI
     */
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    /**
     * @dev Returns the URI for a given token ID
     * @param tokenId The ID of the token
     * @return string The token URI
     */
    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();
        return _baseTokenURI;
    }

    /**
     * @dev Mints NFTs using USDC
     * @param quantity The number of NFTs to mint
     * @param to The address to mint the NFTs to
     */
    function mintUSDC(uint256 quantity, address to) external {
        if (_totalMinted() + quantity > maxSupply) revert ExceedsMaxSupply();

        uint256 totalCost = price * quantity;
        if (!usdcToken.transferFrom(msg.sender, owner(), totalCost)) {
            revert ERC20TransferFailed();
        }

        _safeMint(to, quantity);
        emit NftMinted(msg.sender, "USDC", quantity);
    }

    function mint(uint256 quantity, address to) external {
        if (_totalMinted() + quantity > maxSupply) revert ExceedsMaxSupply();

        _safeMint(to, quantity);
    }

    /**
     * @dev Sets a new base URI for all token metadata
     * @param newBaseURI The new base URI to set
     */
    function setBaseURI(string memory newBaseURI) external onlyOwner {
        _baseTokenURI = newBaseURI;
    }

    /**
     * @dev Sets a new price for minting NFTs
     * @param newPrice The new price to set
     */
    function setPrice(uint256 newPrice) external onlyOwner {
        price = newPrice;
    }

    /**
     * @dev Withdraws all Ether from the contract to the owner
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Transfer failed");
    }

    /**
     * @dev Withdraws all tokens of a specific ERC20 from the contract to the owner
     * @param token The ERC20 token to withdraw
     */
    function withdrawERC20(IERC20 token) external onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        require(token.transfer(owner(), balance), "Transfer failed");
    }

    /**
     * @dev Returns the starting token ID
     * @return uint256 The starting token ID (1)
     */
    function _startTokenId() internal pure override returns (uint256) {
        return 1;
    }
}
