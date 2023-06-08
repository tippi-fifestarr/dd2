// SPDX-License-Identifier: MIT
/**
* @author Tippi Fifestarr  Github:Tippi-fifestarr   Twitter:@fifestarr 
* 
* Smart contract access key, allow a user to 1 NFT per wallet. 3 conditions: 
* 1. pay a minimum of $2 to mint, using Chainlinks decentralized oracles. At first, just MATIC, but can add ETH, and others easily.
* 2. own an OG Access Key, this is not currently enforced in the smart contract. However the dApp won't let them buy unless they have it
* 3. haven't minted before. This means only one of these NFT per wallet.
* Using `thirdweb` contractKit and deploy tool. Get real time price conversion using `Chainlink Data Feeds`, 
*/
pragma solidity ^0.8.0;

// thirdweb contract for ERC-721 token standard
import "@thirdweb-dev/contracts/base/ERC721Base.sol";
// thirdweb contract for counters
import "@thirdweb-dev/contracts/openzeppelin-presets/utils/Counters.sol";
// chainlink data feed
import "./priceConverter.sol";

contract RankedDefault is ERC721Base {
   using PriceConverter for uint256;

   using Counters for Counters.Counter;
   Counters.Counter private _tokenIdCounter;
   // Minimum price of NFT $2 in MATIC (reduced 18 to 16 so its actually .02)
   uint256 public constant MINIMUM_USD = .02 * 10 ** 18;

   mapping(address => bool) public hasMinted;



   /**
    * @dev ERC721Base library's constructor takes four Parameters
    * _name of the NFT, _symbol of the NFT,
    *  _royaltyRecipient (address) who will get a royalty on secondary sale, _royaltyBps (royality percentage)
    * we don't need to set Royality for the purpose of our smart contract. setting _royaltyBps to Zero
    * @param _name: name of the whole NFT bundle Collection
    * @param _symbol: symbol of the whole NFT bundle Collection
   */
   constructor(
       string memory _name,
       string memory _symbol,
       address _royaltyRecipient,
       uint128 _royaltyBps
   )
       ERC721Base(
           _name,
           _symbol,
           _royaltyRecipient,
           _royaltyBps
       )
   {}

   /**
    * @dev createToken mint the ERC721 Token / NFT with the check that the user have paid $1 to mint the NFT
    */
  function createToken() public payable
   {
       // require statement to check the user have paid $1 to mint the NFT
       require(msg.value.getConversionRate() >= MINIMUM_USD, "SEND_MORE_MATIC");
       // check that the msg.sender has not minted before
       require(!hasMinted[msg.sender], "ALREADY_MINTED");

         // something weird is happening here, GPT had me change it to the thing in discounted ranked access
       // Increment it so next time it's correct when we call .current()
       _tokenIdCounter.increment();

       // Current counter value will be the minted token's token ID.
       uint256 newTokenId = _tokenIdCounter.current();

       // Mint the token
       _mint(msg.sender, newTokenId);
       // set the value of minted to true for the msg sender
       hasMinted[msg.sender] = true; 
       // Default token Metadata on token minting
        string memory tokenURI = "https://ipfs.io/ipfs/bafkreiaiqsghlpk5zktyau5e6ynqsel2b7fnnx54uyxj4hh7c6q2ofoxx4";
    // string memory tokenURI = "https://ipfs.io/ipfs/QmVAUVEmr6pxqZq2KtLtjs52d2c91q5sKKhDZweQeqaH7Z";

       // setting default token Metadata 
       _setTokenURI(newTokenId, tokenURI);
   }

   /**
    * @dev function to withdraw funds present in contract address to owner address. In this case, the address that deploy this smart contract
    */
   function withdraw() public onlyOwner(){
       (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
       require(callSuccess,"TRANSFER_FUND_FAIL");
   }

   /**
    * @dev view / Getter function to get the balance of the smart contract
    */
   function getContractBalance() public view returns(uint){
       return address(this).balance;
   }

   // A contract receiving Ether must have at least one of the functions

   // receive() is called if msg.data have value
   fallback() external payable {}

   // receive() is called if msg.data is empty
   receive() external payable {}

}
