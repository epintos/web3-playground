// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// Include some hardhat utils, like console.log
import "hardhat/console.sol";

contract WavePortal {
	// Gets initialized with 0
    uint256 totalWaves;

	/*
	 * There are two types of Solidity event parameters: indexed and not indexed,
	 * Events are used for return values from the transaction and as a cheap data storage,
	 * Blockchain keeps event parameters in transaction logsEvents can be filtered by name and by contract address
	 * All information in the blockchain is public and any actions can be found by looking into the transactions close 
	 * enough but events are a shortcut to ease the development of outside systems in cooperation with smart contracts. 
	 */
    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver; // The address of the user who waved.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user waved.
    }

    Wave[] waves;

    constructor() payable {
        console.log("Yo yo, I am a contract and I am smart");
    }

    function wave(string memory _message) public {
		totalWaves += 1;
		console.log("%s has waved!", msg.sender);

		waves.push(Wave(msg.sender, _message, block.timestamp));

		emit NewWave(msg.sender, block.timestamp, _message);

		uint256 prizeAmount = 0.0001 ether;
		require(
			prizeAmount <= address(this).balance,
			"Trying to withdraw more money than the contract has."
		);
		(bool success, ) = (msg.sender).call{value: prizeAmount}("");
		require(success, "Failed to withdraw money from contract.");
	}

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}
