import { Delegate } from '../types';
import { Card } from '../components/Card';
import './Delegates.css';

const mockDelegates: Delegate[] = [
  {
    id: '1',
    name: 'Alice',
    address: '0x1234...5678',
    followers: 8,
    votingPower: 15,
    status: 'Active',
  },
  {
    id: '2',
    name: 'Bob',
    address: '0x2345...6789',
    followers: 5,
    votingPower: 10,
    status: 'Active',
  },
  {
    id: '3',
    name: 'Charlie',
    address: '0x3456...7890',
    followers: 0,
    votingPower: 0,
    status: 'Inactive',
  },
];

export function Delegates() {
  const handleDelegate = (delegateId: string) => {
    console.log(`Delegated vote to ${delegateId}`);
  };

  return (
    <div className="delegates-page">
      <div className="delegates-header">
        <div>
          <h2>Đại Biểu</h2>
          <p>Ủy thác quyền bầu cho những người đại diện đáng tin cây</p>
        </div>
      </div>

      <div className="delegates-grid">
        {mockDelegates.map(delegate => (
          <Card key={delegate.id} className="delegate-card">
            <div className="delegate-header">
              <div className="delegate-avatar">👤</div>
              <div className="delegate-info">
                <h3 className="delegate-name">{delegate.name}</h3>
                <p className="delegate-address">{delegate.address}</p>
              </div>
              <span className={`status-indicator ${delegate.status.toLowerCase()}`}>
                {delegate.status}
              </span>
            </div>

            <div className="delegate-stats">
              <div className="stat">
                <span className="stat-label">Người Theo Dõi</span>
                <span className="stat-value">{delegate.followers}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Quyền Lực Bầu</span>
                <span className="stat-value">{delegate.votingPower}</span>
              </div>
            </div>

            <div className="delegate-actions">
              {delegate.status === 'Active' && (
                <button
                  className="btn-delegate"
                  onClick={() => handleDelegate(delegate.id)}
                >
                  Ủy Thác Quyền Bầu
                </button>
              )}
              {delegate.status === 'Inactive' && (
                <button className="btn-delegate disabled" disabled>
                  Không Hoạt Động
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Card title="Cách Thức Ủy Thác" className="info-card">
        <div className="info-content">
          <p>
            Ủy thác quyền bầu cho một đại biểu có nghĩa là bạn giao phép cho họ sử dụng
            quyền bầu của bạn trong những lúc bạn không thể hoặc không muốn tham gia bầu cử.
          </p>
          <ul className="info-list">
            <li>Chọn một đại biểu mà bạn tin tưởng</li>
            <li>Nhấp vào nút "Ủy Thác Quyền Bầu"</li>
            <li>Xác nhận giao dịch trên blockchain</li>
            <li>Quyền bầu của bạn sẽ được sử dụng theo ý của đại biểu</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
