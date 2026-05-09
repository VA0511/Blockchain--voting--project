import type { Proposal } from '../../types';

import { ProposalCard } from '../../components/ProposalCard/ProposalCard';
import './Proposals.css';

const mockProposals: Proposal[] = [
  {
    id: 1,
    title: 'Thay đổi chính sách nhân sự',
    description: 'Đề xuất thay đổi chiến lược quản lý nhân sự của tổ chức',
    status: 'Active',
    voteCount: 45,
    yesVotes: 30,
    noVotes: 15,
    yesPercentage: 67,
    noPercentage: 33,
    deadline: '2026-05-15',
  },
  {
    id: 2,
    title: 'Hợp tác công ty XYZ',
    description: 'Phê duyệt hợp tác chiến lược với Công ty XYZ',
    status: 'Active',
    voteCount: 40,
    yesVotes: 35,
    noVotes: 5,
    yesPercentage: 88,
    noPercentage: 12,
    deadline: '2026-05-20',
  },
  {
    id: 3,
    title: 'Tăng cấp các tài sản IT',
    description: 'Dự toán tăng cấp và mua sắm các tài sản công nghệ',
    status: 'Pending',
    voteCount: 0,
    yesVotes: 0,
    noVotes: 0,
    yesPercentage: 0,
    noPercentage: 0,
  },
];

export function Proposals() {
  const handleVote = (proposalId: number, vote: 'yes' | 'no') => {
    console.log(`Voted ${vote} on proposal ${proposalId}`);
  };

  const handleDetails = (proposalId: number) => {
    console.log(`View details of proposal ${proposalId}`);
  };

  return (
    <div className="proposals-page">
      <div className="proposals-header">
        <div>
          <h2>Đề Xuất</h2>
          <p>Bình chọn các đề xuất và quyết định</p>
        </div>
        <button className="btn-new-proposal">+ Tạo Đề Xuất</button>
      </div>

      <div className="proposals-filters">
        <div className="filter-group">
          <label>Trạng Thái:</label>
          <select className="filter-select">
            <option value="all">Tất Cả</option>
            <option value="active">Hoạt Động</option>
            <option value="pending">Chờ Xử Lý</option>
            <option value="closed">Đã Đóng</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Sắp Xếp:</label>
          <select className="filter-select">
            <option value="newest">Mới Nhất</option>
            <option value="oldest">Cũ Nhất</option>
            <option value="most-voted">Nhiều Vote Nhất</option>
          </select>
        </div>
      </div>

      <div className="proposals-grid">
        {mockProposals.map(proposal => (
          <ProposalCard
            key={proposal.id}
            proposal={proposal}
            onVote={handleVote}
            onDetails={handleDetails}
          />
        ))}
      </div>
    </div>
  );
}
