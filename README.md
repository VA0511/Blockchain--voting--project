# Decentralized Voting App

A full-stack Web3 voting application built with React, TypeScript, Ethers.js, and Hardhat. This project demonstrates a complete blockchain-based voting system where a "Chairperson" can grant voting rights, and authorized users can vote for candidates or delegate their votes to others.

## Features
- **Chairperson Control:** The deployer of the contract acts as the Chairperson and authorizes voters.
- **Secure Voting:** Cryptographically secure voting on a local Ethereum blockchain.
- **Vote Delegation:** Users can delegate their voting weight to trusted participants.
- **Real-time Results:** Anyone can query the smart contract to view the current winning proposal.

---

## Prerequisites
Before running this project, make sure you have the following installed:
1. **[Node.js](https://nodejs.org/en/)** (v16 or higher recommended)
2. **[MetaMask Extension](https://metamask.io/)** installed in your browser.
3. **[Solidity Extension](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)** installed in your VSCode or your preferred IDE.

---

## 🚀 Quick Start Guide

### 1. Set up the Local Blockchain (Backend)
First, we need to start a local Ethereum network and deploy our smart contract.

1. Open a terminal and navigate to the `Backend` folder:
   ```bash
   cd Backend
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Start the local Hardhat node:
   ```bash
   npx hardhat node
   ```
   *Keep this terminal window open!* This is your local blockchain running. Hardhat will print out a list of 20 test accounts and their Private Keys.

4. **Deploy the Smart Contract:** 
   Open a *second* terminal, navigate to the `Backend` folder, and run your deployment script:
   ```bash
   npx hardhat run scripts/deploy_with_web3.ts --network localhost
   ```
   *Note: Save the deployed contract address printed in the terminal. You will need it for the frontend.*

### 2. Configure MetaMask
To interact with the local blockchain, you need to connect MetaMask to it and import the test accounts.

1. Open MetaMask, click the **Network Dropdown** at the top, and select **Add Network** -> **Add a network manually**.
2. Configure it with the following details:
   - **Network Name:** Ex: Hardhat, Localhost,...
   - **New RPC URL:** `http://127.0.0.1:8545/`
   - **Chain ID:** `31337`
   - **Currency Symbol:** `ETH`
3. **Import Accounts:** 
   - In MetaMask, click on your account icon -> **Import Account**.
   - Paste the **Private Key** of Account #0 from the Hardhat node terminal. This is the **Chairperson**.
   - Repeat this process for Account #1, #2, etc., to act as standard voters.

Note: When run the local hardhat account for the first time, each node will give out different test account, therefore you will be required to manually modify the app.tsx file to add those test accounts on your local hardhat node. Locate the app.tsx file and locate the TEST_USER array in the file, apply the addresses of your test accounts instead. 

### 3. Set up the User Interface (Frontend)
Now, let's start the React web app.

1. Open a *third* terminal window and navigate to the `frontend dapp` folder:
   ```bash
   cd "frontend dapp"
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev 
   # or 'npm start' depending on your setup
   ```
4. Open your browser and navigate to `http://localhost:5173` (or the port provided in the terminal).

---

## 🗳️ How to Use the System

1. **Connect the App:**
   - Paste the deployed contract address (from Step 1) into the "Deployed Contract Address" input field in the web app.
   - Ensure your MetaMask is set to Account #0 (The Chairperson).
   - Click **Connect Wallet**.

2. **Authorize Voters:**
   - Under "Chairperson: Give Right To Vote", select a user from the dropdown.
   - Click **Authorize**. Confirm the transaction in MetaMask.

3. **Vote:**
   - Open MetaMask and switch to one of the authorized accounts (e.g., Account #1).
   - Under the "Vote" section, select a candidate (0 or 1) and click **Vote**.

4. **Delegate a Vote:**
   - If a user doesn't want to vote directly, they can delegate their voting power to another user using the "Delegate Vote" section.

5. **View Results:**
   - Click **Get Winner Name** under the "Results" section to query the blockchain and see who is currently winning.



## 🛑 Troubleshooting

- **MetaMask Error: "Nonce too high" or "Internal JSON-RPC error"**
  If you restart the Hardhat node, your local blockchain resets, but MetaMask remembers the old transaction history. 
  **Fix:** Open MetaMask -> Settings -> Advanced -> **Clear activity tab data** (or "Reset Account"). 

- **Contract Not Initialized Error**
  Make sure you pasted the exact contract address from the deployment script into the frontend setup box and that MetaMask is connected to the `Localhost 8545` network.
