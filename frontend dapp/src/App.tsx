import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Define the type for the injected Ethereum provider
interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] | object }) => Promise<unknown>;
  on: (eventName: string, handler: () => void) => void;
  removeListener: (eventName: string, handler: () => void) => void;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

// Simplified ABI containing only the functions we need to interact with
const ballotABI = [
  "function giveRightToVote(address voter) external",
  "function delegate(address to) external",
  "function vote(uint proposal) external",
  "function winningProposal() public view returns (uint winningProposal_)",
  "function winnerName() external view returns (bytes32 winnerName_)",
  "function chairperson() public view returns (address)",
  "function voters(address) external view returns (uint256 weight, bool voted, address delegate, uint256 vote)"
];

// Hardhat Local Test Accounts (Excluding Account #0 which is the Chairperson)
const TEST_USERS = [
  { id: 1, address: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8" },
  { id: 2, address: "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc" },
  { id: 3, address: "0x90f79bf6eb2c4f870365e785982e1f101e93b906" },
  { id: 4, address: "0x15d34aaf54267db7d7c367839aaf71a00a2c6a65" },
  { id: 5, address: "0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc" },
  { id: 6, address: "0x976ea74026e726554db657fa54763abd0c3a0aa9" }
];

export default function App() {
  const [account, setAccount] = useState<string>('');
  const [contractAddress, setContractAddress] = useState<string>('');
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  // State for form inputs
  // Defaulting to the first user in our test list
  const [voterAddress, setVoterAddress] = useState<string>(TEST_USERS[0].address);
  const [proposalIndex, setProposalIndex] = useState<string>('0');
  const [delegateTo, setDelegateTo] = useState<string>(TEST_USERS[0].address);
  const [winnerName, setWinnerName] = useState<string>('');
  const [checkAddress, setCheckAddress] = useState<string>(TEST_USERS[0].address);
  const [voterStatus, setVoterStatus] = useState<string>('');

  // 1. Connect to MetaMask and Initialize Contract
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Using ethers v6 syntax. (If using v5, use ethers.providers.Web3Provider)
        const provider = new ethers.BrowserProvider(window.ethereum as unknown as ConstructorParameters<typeof ethers.BrowserProvider>[0]);
        const signer = await provider.getSigner();
        setAccount(signer.address);

        if (contractAddress) {
          const ballotContract = new ethers.Contract(contractAddress, ballotABI, signer);
          setContract(ballotContract);
        } else {
          alert("Please enter the contract address before connecting.");
        }
      } catch (error) {
        console.error("Connection error:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  // Automatically reconnect when the account is switched in MetaMask
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = () => {
        if (contractAddress) {
          connectWallet();
        } else {
          setAccount('');
        }
      };
      
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      return () => window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
    }
  }, [contractAddress]);

  // 2. Chairperson gives right to vote
  const handleGiveRightToVote = async () => {
    if (!contract) return alert("Contract not initialized");
    try {
      const tx = await contract.giveRightToVote(voterAddress);
      await tx.wait(); // Wait for the transaction to be mined
      alert("Right to vote granted successfully!");
    } catch (err: unknown) {
      const error = err as { reason?: string; message?: string };
      console.error(err);
      alert("Error: " + (error.reason || error.message || "Unknown error occurred"));
    }
  };

  // 3. User casts a vote
  const handleVote = async () => {
    if (!contract) return alert("Contract not initialized");
    try {
      const tx = await contract.vote(proposalIndex);
      await tx.wait();
      alert("Voted successfully!");
    } catch (err: unknown) {
      const error = err as { reason?: string; message?: string };
      console.error(err);
      alert("Error: " + (error.reason || error.message || "Unknown error occurred"));
    }
  };

  // 4. User delegates their vote
  const handleDelegate = async () => {
    if (!contract) return alert("Contract not initialized");
    try {
      const tx = await contract.delegate(delegateTo);
      await tx.wait();
      alert("Delegated successfully!");
    } catch (err: unknown) {
      const error = err as { reason?: string; message?: string };
      console.error(err);
      alert("Error: " + (error.reason || error.message || "Unknown error occurred"));
    }
  };

  // 5. Anyone can check the winner
  const handleGetWinner = async () => {
    if (!contract) return alert("Contract not initialized");
    try {
      const winnerBytes32 = await contract.winnerName();
      // Convert bytes32 to string. (If using v5, use ethers.utils.parseBytes32String)
      const decodedName = ethers.decodeBytes32String(winnerBytes32);
      setWinnerName(decodedName);
    } catch (err: unknown) {
      const error = err as { reason?: string; message?: string };
      console.error(err);
      alert("Error: " + (error.reason || error.message || "Unknown error occurred"));
    }
  };

  // 6. Check if a specific address is authorized to vote
  const handleCheckVoter = async () => {
    if (!contract) return alert("Contract not initialized");
    try {
      const voter = await contract.voters(checkAddress);
      const weight = voter.weight.toString();
      const voted = voter.voted;

      if (weight === '0') {
        setVoterStatus("Has NOT been authorized to vote (Weight is 0).");
      } else if (voted) {
        setVoterStatus("Authorized, but has ALREADY voted.");
      } else {
        setVoterStatus(`Authorized and READY to vote (Weight: ${weight}).`);
      }
    } catch (err: unknown) {
      const error = err as { reason?: string; message?: string };
      console.error(err);
      alert("Error: " + (error.reason || error.message || "Unknown error occurred"));
    }
  };

  return (
    <div style={{ padding: '10px 20px', fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center', margin: '10px 0' }}>Decentralized Voting App</h1>
      
      <div style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc' }}>
        <h3 style={{ margin: '0 0 10px 0' }}>Setup</h3>
        <input 
          type="text" 
          placeholder="Deployed Contract Address" 
          value={contractAddress} 
          onChange={(e) => setContractAddress(e.target.value)} 
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <button onClick={connectWallet} style={{ padding: '8px 15px' }}>
          {account ? `Connected: ${account.substring(0,6)}...${account.substring(38)}` : "Connect Wallet"}
        </button>
      </div>

      {contract && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
          <div style={{ padding: '10px', border: '1px solid #ccc' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Chairperson: Give Right To Vote</h3>
            <select value={voterAddress} onChange={(e) => setVoterAddress(e.target.value)} style={{ padding: '8px', marginRight: '10px', width: '100%', maxWidth: '250px', marginBottom: '10px' }}>
              {TEST_USERS.map((user) => (
                <option key={user.id} value={user.address}>User #{user.id} ({user.address.substring(0, 6)}...)</option>
              ))}
            </select>
            <button onClick={handleGiveRightToVote} style={{ padding: '8px 15px' }}>Authorize</button>
          </div>

          <div style={{ padding: '10px', border: '1px solid #ccc' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Vote</h3>
            <select value={proposalIndex} onChange={(e) => setProposalIndex(e.target.value)} style={{ padding: '8px', marginRight: '10px', width: '100%', maxWidth: '250px', marginBottom: '10px' }}>
              <option value="0">0: candidate1</option>
              <option value="1">1: candidate2</option>
            </select>
            <button onClick={handleVote} style={{ padding: '8px 15px' }}>Vote</button>
          </div>

          <div style={{ padding: '10px', border: '1px solid #ccc' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Delegate Vote</h3>
            <select value={delegateTo} onChange={(e) => setDelegateTo(e.target.value)} style={{ padding: '8px', marginRight: '10px', width: '100%', maxWidth: '250px', marginBottom: '10px' }}>
              {TEST_USERS.map((user) => (
                <option key={user.id} value={user.address}>User #{user.id} ({user.address.substring(0, 6)}...)</option>
              ))}
            </select>
            <button onClick={handleDelegate} style={{ padding: '8px 15px' }}>Delegate</button>
          </div>

          <div style={{ padding: '10px', border: '1px solid #ccc' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Results</h3>
            <button onClick={handleGetWinner} style={{ padding: '8px 15px', marginBottom: '10px' }}>Get Winner Name</button>
            {winnerName && <p><strong>Leading Proposal:</strong> {winnerName}</p>}
          </div>

          <div style={{ padding: '10px', border: '1px solid #ccc' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Check Voter Status</h3>
            <select value={checkAddress} onChange={(e) => setCheckAddress(e.target.value)} style={{ padding: '8px', marginRight: '10px', width: '100%', maxWidth: '250px', marginBottom: '10px' }}>
              {TEST_USERS.map((user) => (
                <option key={user.id} value={user.address}>User #{user.id} ({user.address.substring(0, 6)}...)</option>
              ))}
            </select>
            <button onClick={handleCheckVoter} style={{ padding: '8px 15px' }}>Check Status</button>
            {voterStatus && <p style={{ marginTop: '10px' }}><strong>Status:</strong> {voterStatus}</p>}
          </div>
        </div>
      )}
    </div>
  );
}