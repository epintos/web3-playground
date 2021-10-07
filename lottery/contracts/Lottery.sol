pragma solidity ^0.4.17;

contract Lottery {
    // public or private is not about security but to make it clear to other if they should access this variable or not
    address public manager;
    address[] public players;
    
    function Lottery() public {
        // msg is a global variable with the transaction information
        // msg is available in any function in the contract
        manager = msg.sender;
    }
    
    // payable type because it receives Ether
    function enter() public payable {
        // Require is used for validation
        // If it fails, the rest of the code is not executed
        // msg.value in Wei that was sent
        // .01 ether will be converted to wei
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }
    
    // Solidity doesn't have a random function, so we create a pseudo random function
    // sha3 == keccak256
    // block is a global variable
    // uint() converts hex into uint
    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }
    
    function pickWinner() public restricted {
        uint index = random() % players.length;
        // players[index] returns an address object
        // transfer() transfer Wei
        // this.balance has the money paid to the contract
        players[index].transfer(this.balance);
        
        // (0) = initial size of zero. That avoids having an array with default 0x0000 address
        players = new address[](0);
    }
    
    // Used to avoid having duplicated code
    // restricted is a custom name
    modifier restricted() {
        require(msg.sender == manager);
        
        // Runs the rest of the function code in here
        // Similar to a block in ruby using yield
        _;
    }
    
    // view because it doesn't change any information
    function getPlayers() public view returns(address[]) {
        return players;
    }
}
