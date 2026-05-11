import { useState } from 'react';
import { ethers } from 'ethers';

// Simplified ABI containing only the functions we need to interact with
const ballotABI = [
  "function giveRightToVote(address voter) external",
  "function delegate(address to) external",
  "function vote(uint proposal) external",
  "function winningProposal() public view returns (uint winningProposal_)",
  "function winnerName() external view returns (bytes32 winnerName_)",
  "function chairperson() public view returns (address)"
];

export default function App() {
  const [account, setAccount] = useState<string>('');
  const [contractAddress, setContractAddress] = useState<string>('');
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  // State for form inputs
  const [voterAddress, setVoterAddress] = useState<string>('');
  const [proposalIndex, setProposalIndex] = useState<string>('');
  const [delegateTo, setDelegateTo] = useState<string>('');
  const [winnerName, setWinnerName] = useState<string>('');

  // 1. Connect to MetaMask and Initialize Contract
  const connectWallet = async () => {
    if ((window as any).ethereum) {
      try {
        // Using ethers v6 syntax. (If using v5, use ethers.providers.Web3Provider)
        const provider = new ethers.BrowserProvider((window as any).ethereum);
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

  // 2. Chairperson gives right to vote
  const handleGiveRightToVote = async () => {
    if (!contract) return alert("Contract not initialized");
    try {
      const tx = await contract.giveRightToVote(voterAddress);
      await tx.wait(); // Wait for the transaction to be mined
      alert("Right to vote granted successfully!");
    } catch (error: any) {
      console.error(error);
      alert("Error: " + (error.reason || error.message));
    }
  };

  // 3. User casts a vote
  const handleVote = async () => {
    if (!contract) return alert("Contract not initialized");
    try {
      const tx = await contract.vote(proposalIndex);
      await tx.wait();
      alert("Voted successfully!");
    } catch (error: any) {
      console.error(error);
      alert("Error: " + (error.reason || error.message));
    }
  };

  // 4. User delegates their vote
  const handleDelegate = async () => {
    if (!contract) return alert("Contract not initialized");
    try {
      const tx = await contract.delegate(delegateTo);
      await tx.wait();
      alert("Delegated successfully!");
    } catch (error: any) {
      console.error(error);
      alert("Error: " + (error.reason || error.message));
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
    } catch (error: any) {
      console.error(error);
      alert("Error: " + (error.reason || error.message));
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h1>Decentralized Voting App</h1>
      
      <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <h3>Setup</h3>
        <input 
          type="text" 
          placeholder="Deployed Contract Address" 
          value={contractAddress} 
          onChange={(e) => setContractAddress(e.target.value)} 
          style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
        />
        <button onClick={connectWallet} style={{ padding: '10px' }}>
          {account ? `Connected: ${account.substring(0,6)}...${account.substring(38)}` : "Connect Wallet"}
        </button>
      </div>

      {contract && (
        <>
          <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <h3>Chairperson: Give Right To Vote</h3>
            <input type="text" placeholder="Voter Address" value={voterAddress} onChange={(e) => setVoterAddress(e.target.value)} style={{ padding: '5px', marginRight: '10px' }} />
            <button onClick={handleGiveRightToVote}>Authorize</button>
          </div>

          <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <h3>Vote</h3>
            <input type="number" placeholder="Proposal Index (e.g., 0, 1)" value={proposalIndex} onChange={(e) => setProposalIndex(e.target.value)} style={{ padding: '5px', marginRight: '10px' }} />
            <button onClick={handleVote}>Vote</button>
          </div>

          <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <h3>Delegate Vote</h3>
            <input type="text" placeholder="Delegate Address" value={delegateTo} onChange={(e) => setDelegateTo(e.target.value)} style={{ padding: '5px', marginRight: '10px' }} />
            <button onClick={handleDelegate}>Delegate</button>
          </div>

          <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <h3>Results</h3>
            <button onClick={handleGetWinner} style={{ marginBottom: '10px' }}>Get Winner Name</button>
            {winnerName && <p><strong>Leading Proposal:</strong> {winnerName}</p>}
          </div>
        </>
      )}
    </div>
  );
}