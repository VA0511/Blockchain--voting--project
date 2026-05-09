import type { Voter } from '../../types';

import './VotersTable.css';

interface VotersTableProps {
  voters: Voter[];
  onRowClick?: (voter: Voter) => void;
}

export function VotersTable({ voters, onRowClick }: VotersTableProps) {
  return (
    <div className="voters-table-wrapper">
      <table className="voters-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Địa chỉ ký nhân</th>
            <th>Tên ký nhân</th>
            <th>Quyền vote</th>
            <th>Đã vote</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {voters.map((voter, index) => (
            <tr key={voter.id} onClick={() => onRowClick?.(voter)}>
              <td className="index">{index + 1}</td>
              <td className="address" title={voter.address}>
                {voter.address.slice(0, 6)}...{voter.address.slice(-4)}
              </td>
              <td className="name">{voter.name}</td>
              <td className="weight">{voter.weight}</td>
              <td className="voted">
                <span className={`badge ${voter.hasVoted ? 'yes' : 'no'}`}>
                  {voter.hasVoted ? 'Đã vote' : 'Chưa vote'}
                </span>
              </td>
              <td className="action">
                <button className="action-btn" title="More options">
                  ⋮
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
