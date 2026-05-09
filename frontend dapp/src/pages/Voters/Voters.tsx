import { useState } from 'react';
import { Voter } from '../types';
import { VotersTable } from '../components/VotersTable';
import { Card } from '../components/Card';
import './Voters.css';

const mockVoters: Voter[] = [
  {
    id: '1',
    name: 'Alice',
    address: '0x1234...5678',
    hasVoted: true,
    votedProposal: 'Proposal #1',
    weight: 2,
  },
  {
    id: '2',
    name: 'Bob',
    address: '0x2345...6789',
    hasVoted: true,
    votedProposal: 'Proposal #2',
    weight: 1,
  },
  {
    id: '3',
    name: 'Charlie',
    address: '0x3456...7890',
    hasVoted: false,
    weight: 3,
  },
  {
    id: '4',
    name: 'David',
    address: '0x4567...8901',
    hasVoted: true,
    votedProposal: 'Proposal #1',
    weight: 1,
  },
  {
    id: '5',
    name: 'Eva',
    address: '0x5678...9012',
    hasVoted: false,
    weight: 2,
  },
  {
    id: '6',
    name: 'Frank',
    address: '0x6789...0123',
    hasVoted: true,
    votedProposal: 'Proposal #2',
    weight: 1,
  },
];

export function Voters() {
  const [selectedVoter, setSelectedVoter] = useState<Voter | null>(null);

  const handleRowClick = (voter: Voter) => {
    setSelectedVoter(voter);
  };

  return (
    <div className="voters-page">
      <div className="voters-header">
        <div>
          <h2>Danh Sách Cử Nhân</h2>
          <p>Quản lý các cử nhân và quyền vote của họ</p>
        </div>
        <button className="btn-add">+ Thêm Cử Nhân</button>
      </div>

      <div className="voters-content">
        <Card title="Tất Cả Cử Nhân" className="voters-card">
          <VotersTable voters={mockVoters} onRowClick={handleRowClick} />
        </Card>

        {selectedVoter && (
          <Card title="Chi Tiết Cử Nhân" className="voter-details">
            <div className="voter-detail-item">
              <span className="detail-label">Tên:</span>
              <span className="detail-value">{selectedVoter.name}</span>
            </div>
            <div className="voter-detail-item">
              <span className="detail-label">Địa Chỉ:</span>
              <span className="detail-value">{selectedVoter.address}</span>
            </div>
            <div className="voter-detail-item">
              <span className="detail-label">Quyền Vote:</span>
              <span className="detail-value">{selectedVoter.weight}</span>
            </div>
            <div className="voter-detail-item">
              <span className="detail-label">Đã Vote:</span>
              <span className={`detail-value ${selectedVoter.hasVoted ? 'yes' : 'no'}`}>
                {selectedVoter.hasVoted ? 'Có' : 'Không'}
              </span>
            </div>
            {selectedVoter.votedProposal && (
              <div className="voter-detail-item">
                <span className="detail-label">Đã Vote Cho:</span>
                <span className="detail-value">{selectedVoter.votedProposal}</span>
              </div>
            )}
            <button className="btn-remove">Xóa Cử Nhân</button>
          </Card>
        )}
      </div>
    </div>
  );
}
