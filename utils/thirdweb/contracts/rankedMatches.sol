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

    // This should point to your actual RankedAccess contract address
    address public constant RANKED_ACCESS_ADDRESS = 0x1234...;

    // Role for the wallet that is authorized to call the recordMatch function
    bytes32 public constant MATCH_RECORDED_ROLE = keccak256("MATCH_RECORDED_ROLE");

    // Cooldown period in seconds
    uint256 public constant COOLDOWN_PERIOD = 2 hours;

    Match[] public matches;

    // Mapping to keep track of the last time each player played a match
    mapping(address => uint256) public lastPlayed;

    // Mapping to keep track of the number of games each player played within the cooldown period
    mapping(address => uint256) public gamesPlayed;

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

        // Update the time of last match and number of games for both players
        lastPlayed[player1] = block.timestamp;
        lastPlayed[player2] = block.timestamp;
        gamesPlayed[player1]++;
        gamesPlayed[player2]++;
    }

    function _checkAndResetGames(address player) private {
        if (block.timestamp >= lastPlayed[player] + COOLDOWN_PERIOD) {
            gamesPlayed[player] = 0;
        } else {
            require(gamesPlayed[player] < 2, "Player must wait for cooldown period or has already played twice in the cooldown period");
        }
    }

    function _hasAccessKey(address player) private view returns (bool) {
        RankedAccess rankedAccess = RankedAccess(RANKED_ACCESS_ADDRESS);
        return rankedAccess.balanceOf(player) > 0;
    }
}
