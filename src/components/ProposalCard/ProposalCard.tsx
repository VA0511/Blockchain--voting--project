import { Proposal } from '../types';
import { VoteProgressBar } from './VoteProgressBar';
import './ProposalCard.css';

interface ProposalCardProps {
  proposal: Proposal;
  onVote?: (proposalId: number, vote: 'yes' | 'no') => void;
  onDetails?: (proposalId: number) => void;
}

export function ProposalCard({
  proposal,
  onVote,
  onDetails,
}: ProposalCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'active';
      case 'Pending':
        return 'pending';
      case 'Closed':
        return 'closed';
      default:
        return 'pending';
    }
  };

  return (
    <div className="proposal-card">
      <div className="proposal-header">
        <div>
          <h3 className="proposal-title">{proposal.title}</h3>
          <p className="proposal-description">{proposal.description}</p>
        </div>
        <span className={`status-badge ${getStatusColor(proposal.status)}`}>
          {proposal.status}
        </span>
      </div>

      <div className="proposal-voting">
        <VoteProgressBar
          yesPercentage={proposal.yesPercentage}
          noPercentage={proposal.noPercentage}
          total={proposal.voteCount}
          showLabels={true}
        />
      </div>

      <div className="proposal-stats">
        <div className="stat">
          <span className="stat-label">Tổng vote</span>
          <span className="stat-value">{proposal.voteCount}</span>
        </div>
        <div className="stat">
          <span className="stat-label success">Đồng ý</span>
          <span className="stat-value success">{proposal.yesVotes}</span>
        </div>
        <div className="stat">
          <span className="stat-label danger">Không đồng ý</span>
          <span className="stat-value danger">{proposal.noVotes}</span>
        </div>
      </div>

      <div className="proposal-actions">
        {proposal.status === 'Active' && (
          <>
            <button
              className="btn btn-success"
              onClick={() => onVote?.(proposal.id, 'yes')}
            >
              Xác nhận ✓
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onVote?.(proposal.id, 'no')}
            >
              Từ chối ✗
            </button>
          </>
        )}
        <button
          className="btn btn-secondary"
          onClick={() => onDetails?.(proposal.id)}
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  );
}
