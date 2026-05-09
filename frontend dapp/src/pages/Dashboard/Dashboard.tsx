import { VotingStats } from '../types';
import { StatBox } from '../components/StatBox';
import { Card } from '../components/Card';
import './Dashboard.css';

const mockStats: VotingStats = {
  totalVoters: 12,
  totalProposals: 5,
  activeProposals: 3,
  closedProposals: 2,
  totalVotes: 156,
  delegateCount: 3,
};

export function Dashboard() {
  return (
    <div className="dashboard">
      <div className="stats-grid">
        <StatBox
          title="Tổng Cử Nhân"
          value={mockStats.totalVoters}
          icon="👥"
          color="primary"
        />
        <StatBox
          title="Tổng Đề Xuất"
          value={mockStats.totalProposals}
          icon="📋"
          color="success"
        />
        <StatBox
          title="Đề Xuất Hoạt Động"
          value={mockStats.activeProposals}
          icon="🔄"
          color="warning"
        />
        <StatBox
          title="Đã Đóng"
          value={mockStats.closedProposals}
          icon="✅"
          color="danger"
        />
        <StatBox
          title="Tổng Vote"
          value={mockStats.totalVotes}
          icon="🗳️"
          color="primary"
          trend="up"
          trendValue="+12 hôm nay"
        />
        <StatBox
          title="Đại Biểu"
          value={mockStats.delegateCount}
          icon="🤝"
          color="success"
        />
      </div>

      <div className="dashboard-grid">
        <Card title="Hoạt động gần đây" className="activity-card">
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">🗳️</div>
              <div className="activity-content">
                <p className="activity-title">Voted on Proposal #2</p>
                <p className="activity-time">2 hours ago</p>
              </div>
              <span className="activity-status">✓</span>
            </div>
            <div className="activity-item">
              <div className="activity-icon">📝</div>
              <div className="activity-content">
                <p className="activity-title">New Proposal Created</p>
                <p className="activity-time">5 hours ago</p>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">🔗</div>
              <div className="activity-content">
                <p className="activity-title">Wallet Connected</p>
                <p className="activity-time">1 day ago</p>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Thống kê Voting" className="voting-stats-card">
          <div className="voting-stats-content">
            <div className="stat-item">
              <span className="stat-name">Tỷ lệ tham gia</span>
              <span className="stat-amount">78.5%</span>
            </div>
            <div className="stat-item">
              <span className="stat-name">Quyền vote trung bình</span>
              <span className="stat-amount">2.5</span>
            </div>
            <div className="stat-item">
              <span className="stat-name">Proposal đang chờ</span>
              <span className="stat-amount">1</span>
            </div>
            <div className="stat-item">
              <span className="stat-name">Hạn chót sắp tới</span>
              <span className="stat-amount">3 ngày</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
