// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@thirdweb-dev/contracts/base/ERC721Base.sol";
import "./RankedAccess.sol";

contract RankedMatches is AccessControl {
    struct Match {
        address player1;
        address player2;
        address winner;
        uint256 cardIndex1;
        uint256 cardIndex2;
        bytes32[] questions;
        bool[] answers;
        uint256 timePlayed;
    }

    // Addresses of your RankedAccess contracts
    address public constant RANKED_ACCESS_ADDRESS = 0x1234...;
    address public constant RANKED_ACCESS_LEVELED_UP_ADDRESS = 0x1234...;

    // Role for the wallet that is authorized to call the recordMatch function
    bytes32 public constant MATCH_RECORDED_ROLE = keccak256("MATCH_RECORDED_ROLE");

    // Cooldown period in seconds
    uint256 public constant COOLDOWN_PERIOD = 2 hours;

    Match[] public matches;

    // Mappings to keep track of the last time each player played a match and number of games each player played within the cooldown period
    mapping(address => uint256) public lastPlayed;
    mapping(address => uint256) public gamesPlayed;

    // Mapping to keep track of total games played by each player
    mapping(address => uint256) public totalGamesPlayed;

    constructor() {
        _setupRole(MATCH_RECORDED_ROLE, msg.sender);
    }

    function recordMatch(
        address player1,
        address player2,
        address winner,
        uint256 cardIndex1,
        uint256 cardIndex2,
        bytes32[] memory questions,
        bool[] memory answers
    ) public {
        require(hasRole(MATCH_RECORDED_ROLE, msg.sender), "Caller is not allowed to record matches");
        require(_hasAccessKey(player1) && _hasAccessKey(player2), "One or both of the players do not own an access key");

        // Cooldown and number of games check
        _checkAndResetGames(player1);
        _checkAndResetGames(player2);

        matches.push(Match({
            player1: player1,
            player2: player2,
            winner: winner,
            cardIndex1: cardIndex1,
            cardIndex2: cardIndex2,
            questions: questions,
            answers: answers,
            timePlayed: block.timestamp
        }));

        // Update the time each player last played a game
        lastPlayed[player1] = block.timestamp;
        lastPlayed[player2] = block.timestamp;

        // Increment games count
        gamesPlayed[player1]++;
        gamesPlayed[player2]++;

        // Increment total games count
        totalGamesPlayed[player1]++;
        totalGamesPlayed[player2]++;
        
        // Check if a player has reached 200 games and should be leveled up
        _checkAndLevelUp(player1);
        _checkAndLevelUp(player2);
    }

    function _checkAndResetGames(address player) private {
        if(block.timestamp - lastPlayed[player] > COOLDOWN_PERIOD) {
            gamesPlayed[player] = 0;
        } else {
            uint256 maxGamesPerCooldown = _hasLeveledUpAccessKey(player) ? 4 : 2;
            require(gamesPlayed[player] < maxGamesPerCooldown, "Player has exceeded the maximum number of games within the cooldown period");
        }
    }

    function _checkAndLevelUp(address player) private {
        if(totalGamesPlayed[player] >= 200) {
            // Mint a new "leveled up" NFT for the player
            RankedAccess leveledUpContract = RankedAccess(RANKED_ACCESS_LEVELED_UP_ADDRESS);
            leveledUpContract.mint(player);
        }
    }

    function _hasAccessKey(address player) private view returns (bool) {
        RankedAccess rankedAccessContract = RankedAccess(RANKED_ACCESS_ADDRESS);
        return rankedAccessContract.balanceOf(player) > 0;
    }

    function _hasLeveledUpAccessKey(address player) private view returns (bool) {
        RankedAccess rankedAccessLeveledUpContract = RankedAccess(RANKED_ACCESS_LEVELED_UP_ADDRESS);
        return rankedAccessLeveledUpContract.balanceOf(player) > 0;
    }
}
