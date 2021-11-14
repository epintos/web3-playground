pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public {
        // Create new contract that gets deploy to the blockchain
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);   
    }
    
    function getDeployedCampaigns() public view returns(address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    
    // We don't use an array because it would consume a lot of gas to iterate through it
    mapping(address => bool) public approvers;
    uint public approversCount;
    
    // Modifier goes on top of the contructor
    modifier restricted() {
        require(msg.sender == manager);
        
        _;
    }
    
    // We need to send the creators address if not msg.sender would be the factory's address
    constructor(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }
    
    function contribute() public payable {
        require(msg.value > minimumContribution);
        
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(string description, uint value, address recipient) 
        public restricted {
            
        // Equivalent to Request(description, value, recipient, false) - assigns according to the struct order...
        
        // Request({}) is created in memory so we need to use the memory keyword since the instance is not in the storage
        Request memory newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false,
           approvalCount: 0
           // We don't need to initialize referece types
        });
        
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        require(approvers[msg.sender]);
        
        Request storage request = requests[index];
        
        // Cannot vote again
        require(!request.approvals[msg.sender]);
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public restricted {
        // Storage because we want the same insance
        Request storage request = requests[index];
        
        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);
        
        request.recipient.transfer(request.value);
        request.complete = true;
    }
}
