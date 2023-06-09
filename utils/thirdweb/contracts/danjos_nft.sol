// SPDX-License-Identifier: MIT

// solhint-disable-next-line
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "operator-filter-registry/src/DefaultOperatorFilterer.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./IFunctionInterface.sol";
import "./Library.sol";

contract COEAdventurers is
  ERC721,
  IERC2981,
  ERC721Burnable,
  DefaultOperatorFilterer,
  ReentrancyGuard
{
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIdCounter;

  event Mint(uint256 _tokenId, address sender, uint256 amount);

  struct Type {
    string uri;
    uint256 currentSupply;
    uint256 price;
    Library.Rarity rarity;
    bool exists;
    bool sb;
    bool paused;
  }
  mapping(uint256 => Type) public types; //itemID => Type struct ie. different cards, adventurers, etc. NOT ENUM BC I WANT TO BE ABLE TO ADD NEW TYPES
  uint256 public typeCount;

  struct Item {
    // types[typeId].uri + level = tokenURI
    uint256 typeId;
    uint256 level;
    uint256 mintedAt;
    uint256 burnedAt;
    address burnedBy;
    address mintedBy;
    // uint256 price;
    bool exists;
    bool sb;
  }
  mapping(uint256 => Item) public items; //tokenId => Item struct
  address public helperAddress;
  uint256 public randomPrice;
  uint256 public maxLevel = 5;

  constructor(
    address _helperAddress
  ) ERC721("Aether Games Adventurers", "AGADV") {
    helperAddress = _helperAddress;
    _royaltyAmount = 500;
    _tokenIdCounter.increment();
    randomPrice = 42000; // TODO: GET REAL PRICE
    // _pause();
    roles[OWNER][msg.sender] = true;
    roles[ADMIN][msg.sender] = true;
  }

  /** MINTING **/

  mapping(address => mapping(uint256 => uint256)) public addressMinted; //address => type => amount

  function adminMint(
    address _to,
    uint256 _type,
    uint256 _level,
    uint256 _amount
  ) public onlyRole(ADMIN) {
    require(types[_type].exists, "Type does not exist.");

    for (uint256 i = 0; i < _amount; i++) {
      _intMint(_type, _to, _level);
    }
  }

  function mint(
    uint _type,
    address _paymentTokenAddress
  ) public whenNotPaused(_type) nonReentrant {
    //TODO: NEED PAUSED FOR EACH TYPE
    require(types[_type].exists, "Type does not exist.");

    FunctionInterface(helperAddress).purchaseWithToken(
      types[_type].price,
      _paymentTokenAddress, // chosen payment token
      msg.sender // buyer
    );

    _intMint(_type, msg.sender, 1);
  }

  function _intMint(uint256 _type, address _to, uint256 _level) internal {
    //create a new item in items. this is the nfts data
    items[_tokenIdCounter.current()] = Item({
      typeId: _type,
      level: _level,
      mintedAt: block.timestamp,
      burnedAt: 0,
      burnedBy: address(0),
      mintedBy: msg.sender,
      // price: types[_type].price,
      exists: true,
      sb: types[_type].sb
    });
    types[_type].currentSupply++;
    addressMinted[_to][_type]++;
    _mint(_to, _tokenIdCounter.current());
    _tokenIdCounter.increment();
    emit Mint(_tokenIdCounter.current(), _to, 1);
  }

  /** BURN */

  function burn(uint256 _tokenId) public override {
    require(
      msg.sender == ownerOf(_tokenId) ||
        isApprovedForAll(ownerOf(_tokenId), msg.sender),
      "Not owner or approved"
    );
    require(
      _isApprovedOrOwner(_msgSender(), _tokenId),
      "ERC721: caller is not token owner nor approved"
    );
    items[_tokenId].burnedAt = block.timestamp;
    items[_tokenId].burnedBy = msg.sender;
    types[items[_tokenId].typeId].currentSupply--;
    _burn(_tokenId);
  }

  /** TYPE SETTERS **/

  function setHelperAddress(address _helperAddress) public onlyRole(OWNER) {
    helperAddress = _helperAddress;
  }

  function setMaxLevel(uint256 _maxLevel) public onlyRole(OWNER) {
    maxLevel = _maxLevel;
  }

  function setTypes(
    uint256[] memory _typeIds,
    uint256[] memory _prices,
    string[] memory _uris,
    Library.Rarity[] memory _rarities,
    bool[] memory _sbs
  ) public onlyRole(OWNER) {
    require(
      _typeIds.length == _prices.length &&
        _typeIds.length == _uris.length &&
        _typeIds.length == _sbs.length,
      "Arrays must be the same length"
    );
    for (uint256 i = 0; i < _typeIds.length; i++) {
      _setType(_typeIds[i], _prices[i], _uris[i], _rarities[i], _sbs[i]);
    }
  }

  function _setType(
    uint256 _typeId,
    uint256 _price,
    string memory _uri,
    Library.Rarity _rarity,
    bool _sb
  ) private {
    if (!types[_typeId].exists) {
      typeCount++;
    }
    types[_typeId].price = _price;
    types[_typeId].uri = _uri;
    types[_typeId].rarity = _rarity;
    types[_typeId].exists = true;
    types[_typeId].sb = _sb;
    types[_typeId].paused = false;
  }

  /** ITEM SETTERS */

  function addLevel(uint256 _tokenId, uint256 _level) public onlyRole(ADMIN) {
    require(items[_tokenId].level + _level <= maxLevel, "Max level reached");
    items[_tokenId].level += _level;
  }

  function setItemSb(uint256 _tokenId, bool _sb) public onlyRole(OWNER) {
    items[_tokenId].sb = _sb;
  }

  function setItem(
    uint256 _tokenId,
    uint256 _typeId,
    uint256 _level,
    bool _sb
  ) public onlyRole(OWNER) {
    items[_tokenId].typeId = _typeId;
    items[_tokenId].level = _level;
    items[_tokenId].sb = _sb;
  }

  function setRandomPrice(uint256 _price) public onlyRole(OWNER) {
    randomPrice = _price;
  }

  /** GETTERS */

  function totalTypes() public view returns (uint256) {
    return typeCount;
  }

  /** PAUSE **/

  function togglePauseType(uint256 _typeId) public onlyRole(OWNER) {
    types[_typeId].paused = !types[_typeId].paused;
  }

  modifier whenNotPaused(uint256 _typeId) {
    require(!types[_typeId].paused, "Paused");
    _;
  }

  /** URI HANDLING **/

  function tokenURI(
    uint256 tokenId
  ) public view override(ERC721) returns (string memory) {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );
    return
      string(
        abi.encodePacked(
          types[items[tokenId].typeId].uri,
          Strings.toString(items[tokenId].level)
          // ".json"
        )
      );
  }

  /** ROYALTIES **/

  uint256 public _royaltyAmount;
  address royaltyReceiver;

  function setRoyaltyAmount(uint256 _amount) external onlyRole(OWNER) {
    _royaltyAmount = _amount;
  }

  function setRoyaltyReceiver(address _receiver) external onlyRole(OWNER) {
    royaltyReceiver = _receiver;
  }

  function royaltyInfo(
    uint256,
    uint256 salePrice
  ) external view override returns (address receiver, uint256 royaltyAmount) {
    return (royaltyReceiver, (salePrice * _royaltyAmount) / 10000);
  }

  function withdraw() public onlyRole(OWNER) {
    require(address(this).balance > 0, "Balance is zero");
    payable(royaltyReceiver).transfer(address(this).balance);
  }

  /** ACCESS CONTROL */

  mapping(bytes32 => mapping(address => bool)) private roles;
  // ADMIN=0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42
  // OWNER=0x6270edb7c868f86fda4adedba75108201087268ea345934db8bad688e1feb91b
  bytes32 private constant ADMIN = keccak256(abi.encodePacked("ADMIN"));
  bytes32 private constant OWNER = keccak256(abi.encodePacked("OWNER"));

  modifier onlyRole(bytes32 role) {
    require(roles[role][msg.sender], "Not authorized to Adv.");
    _;
  }

  function grantRole(bytes32 role, address account) public onlyRole(OWNER) {
    roles[role][account] = true;
  }

  function revokeRole(bytes32 role, address account) public onlyRole(OWNER) {
    roles[role][account] = false;
  }

  function transferOwnershipp(address newOwner) external onlyRole(OWNER) {
    grantRole(OWNER, newOwner);
    grantRole(ADMIN, newOwner);
    revokeRole(OWNER, msg.sender);
    revokeRole(ADMIN, msg.sender);
    royaltyReceiver = newOwner;
  }

  /** OVERRIDES **/

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal override(ERC721) {
    // if the token is soulbound only allow sending to address(0) or from this contract
    //we want to be able to mint, but not transfer if soulbound
    if (items[tokenId].sb) {
      require(
        to == address(0) || from == address(0),
        "Soulbound items cannot be transferred"
      );
    }
    super._beforeTokenTransfer(from, to, tokenId);
  }

  function supportsInterface(
    bytes4 interfaceId
  ) public view override(ERC721, IERC165) returns (bool) {
    return
      interfaceId == type(IERC2981).interfaceId ||
      super.supportsInterface(interfaceId);
  }
}
