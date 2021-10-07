// We cannot do a require of the file, because it is not JS. We need to read it instead

// We use path to be cross platform compatible
const path = require('path');
const fs = require('fs');
const solc = require('solc');

// __dirname: current working directory
const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(lotteryPath, 'utf8');

// 1: Number of contracts we want to compile
// We export the ABI and contract bytecode
module.exports = solc.compile(source, 1).contracts[':Lottery'];
