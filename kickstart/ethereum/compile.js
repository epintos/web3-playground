const path = require('path');
const solc = require('solc');

// We need a couple of extra helpers
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts;

// Create the folder if the directory does not exist
fs.ensureDirSync(buildPath);

// Output is an object with the contracts
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, `${contract.replace(':', '')}.json`),
    output[contract] // Content of the contract
  );
}
