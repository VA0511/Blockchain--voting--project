export interface Voter {
  id: string;
  name: string;
  address: string;
  hasVoted: boolean;
  votedProposal?: string;
  weight: number;
}

export interface Proposal {
  id: number;
  title: string;
  description: string;
  status: 'Active' | 'Pending' | 'Closed';
  voteCount: number;
  yesVotes: number;
  noVotes: number;
  yesPercentage: number;
  noPercentage: number;
  deadline?: string;
}

export interface User {
  address: string;
  name: string;
  role: 'Admin' | 'Delegate' | 'Voter' | 'User';
  isConnected: boolean;
}

export interface VotingStats {
  totalVoters: number;
  totalProposals: number;
  activeProposals: number;
  closedProposals: number;
  totalVotes: number;
  delegateCount: number;
}

export interface Delegate {
  id: string;
  name: string;
  address: string;
  followers: number;
  votingPower: number;
  status: 'Active' | 'Inactive';
}
