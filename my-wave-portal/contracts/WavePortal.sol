// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// Include some hardhat utils, like console.log
import "hardhat/console.sol";

contract WavePortal {
	// Gets initialized with 0
    uint256 totalWaves;

    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    function wave() public {
        totalWaves += 1;
        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}
