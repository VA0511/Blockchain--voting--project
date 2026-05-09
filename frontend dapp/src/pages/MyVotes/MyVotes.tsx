import { Card } from '../../components/Card/Card';
import { VoteProgressBar } from '../../components/VoteProgressBar/VoteProgressBar';
import './MyVotes.css';

interface MyVote {
  id: number;
  proposalTitle: string;
  vote: 'yes' | 'no';
  voteDate: string;
  weight: number;
  yesPercentage: number;
  noPercentage: number;
}

const mockMyVotes: MyVote[] = [
  {
    id: 1,
    proposalTitle: 'Thay đổi chính sách nhân sự',
    vote: 'yes',
    voteDate: '2026-05-01',
    weight: 2,
    yesPercentage: 67,
    noPercentage: 33,
  },
  {
    id: 2,
    proposalTitle: 'Hợp tác công ty XYZ',
    vote: 'yes',
    voteDate: '2026-04-28',
    weight: 2,
    yesPercentage: 88,
    noPercentage: 12,
  },
];

export function MyVotes() {
  return (
    <div className="my-votes-page">
      <div className="my-votes-header">
        <h2>Các Phiếu Bầu Của Tôi</h2>
        <p>Xem các phiếu bầu mà bạn đã thực hiện</p>
      </div>

      <div className="votes-list">
        {mockMyVotes.map(vote => (
          <Card key={vote.id} className="vote-item-card">
            <div className="vote-item-header">
              <h3 className="vote-title">{vote.proposalTitle}</h3>
              <span className={`vote-badge ${vote.vote}`}>
                {vote.vote === 'yes' ? '✓ Xác Nhận' : '✗ Từ Chối'}
              </span>
            </div>

            <div className="vote-info">
              <div className="info-item">
                <span className="info-label">Ngày Bầu:</span>
                <span className="info-value">{vote.voteDate}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Quyền Lực Bầu:</span>
                <span className="info-value">{vote.weight}</span>
              </div>
            </div>

            <div className="vote-result">
              <VoteProgressBar
                yesPercentage={vote.yesPercentage}
                noPercentage={vote.noPercentage}
                showLabels={true}
              />
            </div>

            <button className="btn-view-proposal">Xem Đề Xuất Đầy Đủ →</button>
          </Card>
        ))}
      </div>

      {mockMyVotes.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🗳️</div>
          <h3>Chưa Có Phiếu Bầu</h3>
          <p>Bạn chưa thực hiện phiếu bầu nào. Hãy vào phần Đề Xuất để bắt đầu!</p>
        </div>
      )}
    </div>
  );
}
