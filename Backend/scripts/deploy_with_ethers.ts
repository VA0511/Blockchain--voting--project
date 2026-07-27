import { ethers } from 'ethers';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  try {
    // 1. Connect to a local Ethereum node (e.g., Hardhat Network or Ganache)
    const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');

    // 2. Setup a wallet with a standard test private key (Hardhat account #0)
    const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
    const wallet = new ethers.Wallet(privateKey, provider);

    // 3. Load the compiled ABI and Bytecode
    // Resolving path safely regardless of ES Module or CommonJS mode
    let basePath = process.cwd();
    // If executed from the workspace root rather than the Backend folder, adjust the path
    if (!basePath.toLowerCase().endsWith('backend')) {
      basePath = path.join(basePath, 'Backend');
    }
    
    const abiPath = path.resolve(basePath, 'bin/contracts/Ballot.abi');
    const binPath = path.resolve(basePath, 'bin/contracts/Ballot.bin');
    
    const abi = fs.readFileSync(abiPath, 'utf8');
    const bytecode = fs.readFileSync(binPath, 'utf8');

    // 4. Create Contract Factory
    const factory = new ethers.ContractFactory(abi, bytecode, wallet);

    // 5. Deploy
    const proposalNames = [
      '0x63616e6469646174653100000000000000000000000000000000000000000000',
      '0x63616e6469646174653200000000000000000000000000000000000000000000'
    ]

    console.log("Deploying contract...");
    const contract = await factory.deploy(proposalNames);
    await contract.waitForDeployment(); 

    console.log(`Contract deployed successfully!`);
    console.log(`Address: ${await contract.getAddress()}`);
  } catch (e: any) {
    console.error("Error deploying contract:", e.message || e);
  }
}

main();
