// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract LandRegistration is ERC721 {
    struct Land {
        uint256 area;
        uint256 cost;
        string addressStr;
        address owner;
        bool isVerified;
        bool isForSale;
        string documentHash;
        string imageHash;
    }

    address public Inspector =
        address(0x076Df2f4567bd872964Baa8354e07370FE634F3F);// Add ur address
    mapping(uint256 => Land) public lands;
    uint256 public landCount = 0;

    event LandCreated(uint256 landId);
    event LandVerified(uint256 landId);
    event LandPutOnSale(uint256 landId);
    event LandBought(uint256 landId, address buyer);

    constructor() ERC721("LandRegistration", "LAND") {}

    modifier landInspector() {
        require(
            Inspector == msg.sender,
            "Only land inspector can verify the land"
        );
        _;
    }

    modifier landOwner(uint256 landId) {
        require(
            lands[landId].owner == msg.sender,
            "Only land owner can put land on sale"
        );
        _;
    }

    function createLand(
        uint256 area,
        uint256 cost,
        string memory addressStr,
        string memory documentHash,
        string memory imageHash
    ) public {
        landCount++;
        lands[landCount] = Land(
            area,
            cost,
            addressStr,
            msg.sender,
            false,
            false,
            documentHash,
            imageHash
        );
        _mint(msg.sender, landCount);
        emit LandCreated(landCount);
    }

    function verifyLand(uint256 landId) public landInspector {
        lands[landId].isVerified = true;
        emit LandVerified(landId);
    }

    function putLandOnSale(uint256 landId) public landOwner(landId) {
        require(
            lands[landId].isVerified == true,
            "Land must be verified before putting it on sale"
        );
        lands[landId].isForSale = true;
        emit LandPutOnSale(landId);
    }

    function buyLand(uint256 landId) public payable {
        require(lands[landId].owner != msg.sender, "You are hte owner");
        require(lands[landId].isForSale == true, "Land is not for sale");
        require(
            msg.value == lands[landId].cost,
            "Sent ether value does not match land cost"
        );
        address payable oldOwner = payable(lands[landId].owner);
        oldOwner.transfer(msg.value);
        _transfer(oldOwner, msg.sender, landId);
        lands[landId].owner = msg.sender;
        lands[landId].isForSale = false;
        emit LandBought(landId, msg.sender);
    }

    function sellLand(
        uint256 landId,
        uint256 cost,
        string memory documentHash
    ) public landOwner(landId) {
        require(
            lands[landId].isVerified == true,
            "Land must be verified before putting it on sale"
        );
        lands[landId].cost = cost;
        lands[landId].documentHash = documentHash;
        lands[landId].isForSale = true;
        emit LandPutOnSale(landId);
    }

    function getLandDetails(
        uint256 landId
    )
        public
        view
        returns (
            uint256 area,
            uint256 cost,
            string memory addressStr,
            string memory documentHash,
            string memory imageHash,
            address owner,
            bool isVerified,
            bool isForSale
        )
    {
        require(_exists(landId), "Land does not exist"); // check if land exists

        Land storage land = lands[landId];

        return (
            land.area,
            land.cost,
            land.addressStr,
            land.documentHash,
            land.imageHash,
            ownerOf(landId),
            land.isVerified,
            land.isForSale
        );
    }
}
