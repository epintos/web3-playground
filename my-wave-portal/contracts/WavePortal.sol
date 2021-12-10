// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// Include some hardhat utils, like console.log
import "hardhat/console.sol";

contract WavePortal {
    // Gets initialized with 0
    uint256 totalWaves;
    uint256 private seed;

    /*
     * There are two types of Solidity event parameters: indexed and not indexed,
     * Events are used for return values from the transaction and as a cheap data storage,
     * Blockchain keeps event parameters in transaction logsEvents can be filtered by name and by contract address
     * All information in the blockchain is public and any actions can be found by looking into the transactions close
     * enough but events are a shortcut to ease the development of outside systems in cooperation with smart contracts.
     * At a basic level, events are messages our smart contracts throw out that we can capture on our client in real-time.
     */
    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
      address waver; // The address of the user who waved.
      string message; // The message the user sent.
      uint256 timestamp; // The timestamp when the user waved.
    }

    Wave[] waves;

    // Stores the address with the last time the user waved, to avoid spams.
    mapping(address => uint256) public lastWavedAt;

    constructor() payable {
      console.log("Yo yo, I am a contract and I am smart");

      seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public {
      require(
        lastWavedAt[msg.sender] + 30 seconds < block.timestamp,
        "Must wait 30 seconds before waving again."
      );

      lastWavedAt[msg.sender] = block.timestamp;

      totalWaves += 1;
      console.log("%s has waved!", msg.sender);

      waves.push(Wave(msg.sender, _message, block.timestamp));

      // Generate a new seed for the next user that sends a wave
      seed = (block.difficulty + block.timestamp + seed) % 100;
      console.log("Random # generated: %d", seed);

      /*
        * Give a 50% chance that the user wins the prize.
      */
      if (seed <= 50) {
        console.log("%s won!", msg.sender);

        uint256 prizeAmount = 0.0001 ether;
        require(
          prizeAmount <= address(this).balance,
          "Trying to withdraw more money than the contract has."
        );
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract.");
      }

      emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getAllWaves() public view returns (Wave[] memory) {
      return waves;
    }

    function getTotalWaves() public view returns (uint256) {
      console.log("We have %d total waves!", totalWaves);
      return totalWaves;
    }
}
